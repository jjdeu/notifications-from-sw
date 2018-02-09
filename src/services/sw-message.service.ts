import { Injectable } from '@angular/core';

@Injectable()
export class SwMessageRefService {

  /**
   *
   * @returns {Promise<number>}
   * @param data
   */
  public sendDataToSw(data: object): Promise<number> {

    return new Promise<number>((resolve, reject) => {

      // Create a Message Channel
      const theMessageChannel = new MessageChannel();

      // Handler for receiving message reply from service worker
      theMessageChannel.port1.onmessage = (event) => {
        if(event.data.error) {
          reject(event.data.error);
        } else {
          console.log('received message back', event.data);
          resolve(event.data);
        }
      };

      // Send message to service worker along with port for reply
      navigator.serviceWorker.controller.postMessage(data, [theMessageChannel.port2]);

    });
  }


}
