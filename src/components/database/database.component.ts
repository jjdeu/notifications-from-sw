import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {

  public items: object[] = [];

  constructor(private _databaseService: DatabaseService) { }

  ngOnInit() {
    this._getDatabaseItems();
  }

  private _getDatabaseItems() {

    this._databaseService.getAll().then(result => {

      this.items = result;

    });

  }


  public getAllTimeOuts() {


  }

  public refreshDatabase() {

    this._getDatabaseItems();

  }

}
