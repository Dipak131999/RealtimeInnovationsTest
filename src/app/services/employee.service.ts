import { Injectable } from '@angular/core';
import * as localforage from 'localforage';
import { BehaviorSubject } from 'rxjs';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeDbStorage: any = localforage;
  headerTitle:BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private notification: NzNotificationService
  ) {
    localforage.config({
      driver: [
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE,
      ],
      storeName: 'employee-db',
      name: 'employee-db',
    });
   }

   setDataInIndexedDB(value:any) {
    return this.employeeDbStorage
      .setItem('employee-db', JSON.stringify(value))
      .then((res:any) => { return true; })
      .catch(() => { });
  }

  async getDataFromIndexedDB() {
    return new Promise((resolve, reject) => {
      this.employeeDbStorage
        .getItem('employee-db')
        .then((result: any) => {
          resolve(JSON.parse(result));
        })
        .catch((err:any) => {
          reject(err);
        });
    });
  }

  removeDataFromIndexedDB() {
    return new Promise((resolve, reject) => {
      this.employeeDbStorage
        .removeItem('employee-db')
        .then((result: any) => {
          const remove = 'Key Removed';
          return resolve(remove);
        })
        .catch((err:any) => {
          return reject(err);
        });
    });
  }

  toastNotification(message: string) {
    this.notification.blank(
      '',
      message,
      { nzPlacement: 'bottom'  }
    );
  }
}
