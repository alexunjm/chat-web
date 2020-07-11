import { Pipe, PipeTransform } from '@angular/core';

/**
 * @author Alexander Jaramillo <contacto@alexanderjaramillo.com>
 */
@Pipe({
  name: 'obj2kv',
})
export class ObjToKeyVal implements PipeTransform {
  /**
   * Takes a value and makes it miles dot separated.
   */
  transform(object: any, ...args) {

    const result = [];
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const element = object[key];
        result[0] = result[0] || [];
        result[0].push(key);
        result[1] = result[1] || [];
        result[1].push(element);
      }
    }
    return result;
  }

}

/**
 * @author Alexander Jaramillo <contacto@alexanderjaramillo.com>
 */
@Pipe({
  name: 'nmb2arr',
})
export class NmbToArr implements PipeTransform {
  /**
   * Takes a value and split it by space.
   */
  transform(nmb: number, ...args) {

    const result = [];
    for (let i = 0; i < nmb; i++) {
      result.push(i + 1);
    }
    console.log(result);
    return result;
  }
}
