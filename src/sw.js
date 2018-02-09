self.importScripts('./assets/js/dexie.min.js');

self.addEventListener('install', function (event) {
  console.log("Service Worker installed");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function (event) {
  console.log("Service Worker activated");
  event.waitUntil(self.skipWaiting());


});

//
// Define your database
//
let db = new Dexie("friend_database");
db.version(1).stores({
  notifications: '++id'
});


function storeNotification(notification, delay) {

  return new Promise((resolve, reject) => {

//
// Put some data into it
//

    console.log('storing ...');

//    resolve(0);


    db.notifications.put({delay: delay, data: notification})
    .then(key => {
      console.log('database key: ', key);
      resolve(key);
    }).catch(function(error) {
      console.log('database error: ', error);
      reject(error);
    });


  })

}

/**
 * This functions handles a delayed notification in 3 steps
 * 1. Prepare notification with setTimeout en and remember setTimeout id
 * 2. Store an entry for the notification in indexedDB so we can keep track of it
 * 3. When notification is triggered we want to update the database-entry
 * @param notification
 * @param delay
 */
function handleDelayedNotification(notification, delay) {

  let theTitle = notification['title'];
  let theBody = notification['body'];

  this.storeNotification(notification, delay).then(key => {


    console.log('going to set timeout');

    let theTimeoutId = setTimeout(() => {
      self.registration.showNotification(theTitle, {
        body: theBody,
        icon: './favicon.ico',
        data: {
          databaseKey: key
        }
      }).then(() => {

        // TODO: handle update in database
        console.log('We got a notification with database-key == ' + key);

      })
    }, delay);

  }).catch(error => {
    // Now what?
  });
}


self.addEventListener('message', function (event) {

  let theDataType = event.data['type'];

  switch (theDataType) {
    case 'notification':
      let theMessage = event.data['message'];
      console.log("SW Received Notification: " + theMessage);
      let theTimeout = theMessage['timeout'];
      handleDelayedNotification(theMessage, theTimeout);
      event.ports[0].postMessage("Notification was set");
      break;

    case 'requestActiveTimeOuts':
      console.log('TODO requestActiveTimeOuts');
      break;

    default:
      console.log('throw ???')
  }


});

console.log("Service Worker initialized");

