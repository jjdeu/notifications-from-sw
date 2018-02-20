import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {

  public items: object[] = [];
  public now: number;

  displayedColumns = ['id', 'title', 'triggerTimeUTS', 'trigger', 'status'];
  public dataSource;

  constructor(private _databaseService: DatabaseService) { }

  ngOnInit() {
    this._getDatabaseItems();
  }

  private _getDatabaseItems() {

    // calculate new 'now' every time we get the database items
    this.now = Math.round(new Date().getTime() / 1000);

    this._databaseService.getAll().then(result => {
      this.items = result;
      this.dataSource = new MatTableDataSource(result);
    });
  }

  public refreshDatabase() {
    this._getDatabaseItems();
  }

  public getTriggerInSeconds(uts: number): number {
    return (uts - this.now);
  }

}
