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

    if(!('Notification' in this._window) || (this._window.navigator.userAgent.toLowerCase().indexOf('android') > -1)) {
      console.log('only in-app notifications possible');
    } else {
      Notification.requestPermission(permission => {
        if(permission === 'granted') {
          navigator.serviceWorker.ready.then((registration) => {

            setTimeout(() => new Notification('bla bla bla'), 10000);


            /*

                        setTimeout(() => registration.showNotification('Alert!', {
                          body: 'from service worker'
                        }), 10000);

            */


          });
        } else {
          console.log('only in-app notifications possible');
        }
      });
    }
  }

  ngOnInit() {

//    this.initNotification();


  }


  public getNotificationPermission() {

  }

  public setTestNotification() {

    const theData = {
      type: 'notification',
      message: {
        title: 'test title',
        body: 'this is a test message',
        timeout: 10000
      },
    };

    this._swMessageService.sendDataToSw(theData).then(result => {
      console.log('sw answered: ', result);
    });

  }

  public setNotification() {
    const theData = {
      type: 'notification',
      message: {
        title: this.title,
        body: this.body,
        timeout: this.delay
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
