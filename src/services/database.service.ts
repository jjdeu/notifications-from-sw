import Dexie from 'dexie';
import { Injectable } from '@angular/core';

@Injectable()
export class DatabaseService extends Dexie {

  protected myTable: Dexie.Table<object, number>;

  constructor() {
    super('notification_database');
    this._initDatabase();
    this.myTable = this.table('notifications');
  }

  private _initDatabase() {
    this.version(1).stores({
      notifications: '++id'
    });
  }

  public getAll(): Promise<Array<object>> {
      return this.myTable.toArray();
  }

}

