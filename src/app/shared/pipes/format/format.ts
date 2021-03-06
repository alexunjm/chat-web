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

/**
 * @author Alexander Jaramillo <contacto@alexanderjaramillo.com>
 */
@Pipe({
  name: 'format_p',
})
export class FormatP implements PipeTransform {
  /**
   * Takes a value and split it by space.
   */
  transform(str: String, ...args) {

    // return str.split('\n').map(t => `"${t}"`).join('\n');
    return str;
  }
}

/**
 * @author Alexander Jaramillo <contacto@alexanderjaramillo.com>
 */
@Pipe({
  name: 'map_join',
})
export class MapJoin implements PipeTransform {
  /**
   * Takes a value and split it by space.
   */
  transform(arr: Array<any>, {prop, sep}) {

    // let [prop, sep] = args;
    if (!prop) { prop = 'name'; }
    if (!sep) { sep = '|'; }
    return arr.map(e => e[prop]).join(sep);
  }
}
