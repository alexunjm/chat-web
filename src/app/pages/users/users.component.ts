import { UserService } from './../../shared/services/api/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  dataSource: Array<any>;

  filter: string;
  filteredData: Array<any>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.list().then((data) => {
      // const {users, usersCount} = data;
      this.data = data['users'];
    });
  }

  set data(arr: Array<any>) {
    this.dataSource = arr;
    this.filterInput(this.filter);
  }

  filterInput(str: string) {
    console.log("filterInput -> str", str)
    this.query(str ? {username: str, email: str} : null);
  }

  query(params?: any) {
    if (!params) {
      return this.filteredData = this.dataSource;
    }

    this.filteredData = this.dataSource.filter((item) => {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const field = item[key];

          if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
            return item;
          } else if (field === params[key]) {
            return item;
          }
        }
      }
      return null;
    });
  }
/*
  chatWith(user: any) {

  } */

}
