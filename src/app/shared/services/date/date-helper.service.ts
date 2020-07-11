import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateHelperService {

  timeZoneOffset = new Date().getTimezoneOffset() / 60;

  constructor() { }

  /**
   * create Date from 'yyyy-MM-dd' string
   * @param yMdStr str date format 'yyyy-MM-dd'
   * @param srcDate date to edit
   */
  dateFromString(yMdStr: string, srcDate?: Date) {
    const [year, month, day] = yMdStr.split('-').map((str: string) => Number(str));
    const hours = srcDate ? srcDate.getUTCHours() : this.timeZoneOffset;
    const min = srcDate ? srcDate.getUTCMinutes() : 0;
    const date = new Date(Date.UTC(
        year, month - 1, day,
        hours < this.timeZoneOffset ? hours + 24 : hours, min
    ));
    return date;
  }

  /**
   * create Date from 'HH:mm' string
   * @param HMStr str hour format 'HH:mm'
   * @param srcDate date to edit
   */
  dateFromTimeString(HMStr, srcDate: Date) {
    const [hours, min] = HMStr.split(':').map((str: string) => Number(str));
    const year = srcDate.getFullYear();
    const month = srcDate.getMonth();
    const day = srcDate.getDate();
    const date = new Date(Date.UTC(
      year, month, day,
      hours + this.timeZoneOffset, min
    ));
    return date;
  }
}
