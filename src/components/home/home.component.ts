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

  public setTestNotification(seconds: number) {

    const theData = {
      type: 'notification',
      delay: seconds * 1000
    };

    this._swMessageService.sendDataToSw(theData).then(result => {
      console.log('SW answered ', result);
      this._snackBar.open('Message was processed by service-worker', null,{ duration: 1000 });
    });

  }

}
