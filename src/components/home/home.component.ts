import { Component, OnInit } from '@angular/core';
import { WindowRefService } from '../../services/window-ref.service';
import { SwMessageRefService } from '../../services/sw-message.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public notificationTime: string;
  public title: string;
  public body: string;

  private _window: Window;

  constructor(private _windowRefService: WindowRefService, private _swMessageService: SwMessageRefService, private _snackBar: MatSnackBar) {
    this._window = this._windowRefService.nativeWindow;
  }

  ngOnInit() {

  }


  public getNotificationPermission() {

    if(!('Notification' in this._window) || (this._window.navigator.userAgent.toLowerCase().indexOf('android') > -1)) {
      console.log('only in-app notifications possible');
    } else {
      Notification.requestPermission().then(permission => {
        if(permission === 'granted') {

          this._snackBar.open('Notification permission granted', null,{ duration: 1000 });

        } else {
          this._snackBar.open('only in-app notifications possible', null,{ duration: 1000 });
        }
      }).catch(error => {
        console.log(error);
        this._snackBar.open('Problem getting the notification permission', null,{ duration: 1000 });
      });
    }


  }

  public setTestNotification() {

    let theNowDate = new Date();
    // Increase by 10 seconds
    theNowDate.setSeconds(theNowDate.getSeconds() + 10);

    const theData = {
      type: 'notification',
      message: {
        title: 'test title',
        body: 'this is a test message',
        time: theNowDate
      },
    };

    this._swMessageService.sendDataToSw(theData).then(result => {
      console.log('SW answered ', result);
      this._snackBar.open('Message was processed by service-worker', null,{ duration: 1000 });
    });

  }

  public setNotification() {

    console.log(this.notificationTime);

    const theData = {
      type: 'notification',
      message: {
        title: this.title,
        body: this.body,
        time: this.notificationTime
      },
    };

    this._swMessageService.sendDataToSw(theData).then(result => {

      // empty form
      this.notificationTime = '';
      this.title = '';
      this.body = '';

      console.log('SW answered ', result);
      this._snackBar.open('Message was processed by and stored by service-worker', null,{ duration: 1000 });

    });

  }

}
