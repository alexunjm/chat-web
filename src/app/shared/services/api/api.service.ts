import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { LStorageService } from './../storage';


export class ApiService {
  url: string;

  constructor(private http: HttpClient, public lStorage: LStorageService) {
    this.setAPIuri('http://localhost:3000');
  }

  // custom method to initialize reqOpts
  public _initializeReqOpts(reqOpts) {
    if (!reqOpts) {
      reqOpts = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Token ${this.lStorage.getToken()}`
        }),
        params: new HttpParams()
      };
    }
    return reqOpts;
  }

  getReqOpts(reqOpts?) {

    reqOpts = this._initializeReqOpts(reqOpts);
    return reqOpts;
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    reqOpts = this.getReqOpts(reqOpts);

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (params.hasOwnProperty(k)) {
          const val = params[k];
          reqOpts.params.set(k, val);
        }
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts).toPromise();
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    reqOpts = this.getReqOpts(reqOpts);
    if (reqOpts.hasOwnProperty('headers')) {
      return this.http.post(this.url + '/' + endpoint, this.wrap(body), reqOpts).toPromise();
    }
    return this.http.post(this.url + '/' + endpoint, this.wrap(body)).toPromise();
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    reqOpts = this.getReqOpts(reqOpts);
    return this.http.put(this.url + '/' + endpoint, this.wrap(body), reqOpts).toPromise();
  }

  delete(endpoint: string, reqOpts?: any) {
    reqOpts = this.getReqOpts(reqOpts);
    return this.http.delete(this.url + '/' + endpoint, reqOpts).toPromise();
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    reqOpts = this.getReqOpts(reqOpts);
    return this.http.put(this.url + '/' + endpoint, this.wrap(body), reqOpts);
  }

  wrap(data) {
    /**
     * For future data wrapping
     */
    return data;
  }

  setAPIuri(path) {
    this.url = path + '/api';
  }
}
