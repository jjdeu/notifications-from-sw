import { Component, OnInit } from '@angular/core';
import { WindowRefService } from '../../services/window-ref.service';
import { SwMessageRefService } from '../../services/sw-message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public delay: number = 10000;
  public title: string;
  public body: string;

  private _window: Window;

  constructor(private _windowRefService: WindowRefService, private _swMessageService: SwMessageRefService) {
    this._window = this._windowRefService.nativeWindow;
  }


  public initNotification(): void {

  }

  ngOnInit() {

//    this.initNotification();


  }


  public getNotificationPermission() {

    if(!('Notification' in this._window) || (this._window.navigator.userAgent.toLowerCase().indexOf('android') > -1)) {
      console.log('only in-app notifications possible');
    } else {
      Notification.requestPermission(permission => {
        if(permission === 'granted') {

          // TODO: show permission has been granted

        } else {
          console.log('only in-app notifications possible');
        }
      });
    }


  }

  public setTestNotification() {

    const theData = {
      type: 'notification',
      message: {
        title: 'test title',
        body: 'this is a test message',
        time: '2018-02-13 12:30'
      },
    };

    this._swMessageService.sendDataToSw(theData).then(result => {
      console.log('sw answered: ', result);
    });

  }

  public setNotification() {

    console.log(this.delay);

    const theData = {
      type: 'notification',
      message: {
        title: this.title,
        body: this.body,
        time: this.delay
      },
    };

    this._swMessageService.sendDataToSw(theData).then(result => {
      console.log('sw answered: ', result);
    });

  }

  public getAllTimeOuts() {
  }

  public refreshDatabase() {
  }


}
