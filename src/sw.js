self.importScripts('./assets/js/dexie.min.js');
self.importScripts('./assets/js/moment.min.js');

const DATABASE_VERSION = 1;

self.addEventListener('install', function (event) {
  console.log("Service Worker installed");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function (event) {
  console.log("Service Worker activated");
  event.waitUntil(self.skipWaiting());


});

//
// Define the database
//
let db = new Dexie("notification_database");
db.version(DATABASE_VERSION).stores({
  notifications: '++id'
});

function storeNotification(notification, triggerTimeUts) {

  return new Promise((resolve, reject) => {

    console.log('storing ...');

    db.notifications.put({triggerTimeUts: triggerTimeUts, data: notification, status: 'pending'})
      .then(key => {
        console.log('database key: ', key);
        resolve(key);
      }).catch(function (error) {
      console.log('database error: ', error);
      reject(error);
    });


  })

}

function updateNotificationStatus(notificationKey, status) {

  return new Promise((resolve, reject) => {

    console.log('storing ...');

    db.notifications.update(notificationKey, {status: status})
      .then(() => {
        console.log('updated notification status of entry with key: ', notificationKey);
        resolve();
      }).catch(function (error) {
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
 */
function addFullNotification(notification) {

  let theTitle = notification['title'];
  let theBody = notification['body'];
  let theTriggerTime = notification['time'];
  // TODO: make sure theTriggerDate is correct date
  let theTriggerTimeUTS = moment(theTriggerTime).unix();

  console.log('theTriggerTimeUTS', theTriggerTimeUTS);

  storeNotification(notification, theTriggerTimeUTS).then(key => {


    console.log('going to set timeout');

    let theNowUTS = moment().unix();
    let theDelayTrigger = (theTriggerTimeUTS - theNowUTS) * 1000; // * 1000 because we want it in milliseconds
    // TODO: make sure theDelayTrigger > 0
    console.log('theDelayTrigger in (milliseconds)', theDelayTrigger);


    setTimeout(() => {
      self.registration.showNotification(theTitle, {
        body: theBody,
        icon: './favicon.ico',
        data: {
          databaseKey: key
        },
        requireInteraction: true
      }).then(() => {

        updateNotificationStatus(key, 'done').then(() => {
          // TODO: handle update in database
          console.log('We got a notification with database-key == ' + key);
        }).catch(error => {
          console.log(error);
        })
      }).catch(error => {
        updateNotificationStatus(key, 'error').then(() => {
          console.log(error)
        }).catch(error => {
          console.log(error);
        })
      })
    }, theDelayTrigger);

  }).catch(error => {
    // Now what?
  });
}

function testTimedNotification(notification) {

  let theTitle = notification['title'];
  let theBody = notification['body'];
  let theTriggerTime = notification['time'];
  // TODO: make sure theTriggerDate is correct date
  let theTriggerTimeUTS = moment(theTriggerTime).unix();

  console.log('theTriggerTimeUTS', theTriggerTimeUTS);

  console.log('going to set timeout');

  let theNowUTS = moment().unix();
  let theDelayTrigger = (theTriggerTimeUTS - theNowUTS) * 1000; // * 1000 because we want it in milliseconds
  console.log('theDelayTrigger in (milliseconds)', theDelayTrigger);


  setTimeout(() => {
    self.registration.showNotification(theTitle, {
      body: theBody,
      icon: './favicon.ico',
      data: {
        test: true
      },
      requireInteraction: true
    }).then(() => {
      console.log('test notification was triggered');
    }).catch(error => {
      console.log('error in test notification', error);
    })
  }, theDelayTrigger);


}


self.addEventListener('message', function (event) {

  let theDataType = event.data['type'];

  switch (theDataType) {
    case 'notification':
      console.log("SW Received Notification");
      addFullNotification(event.data['message']);
      event.ports[0].postMessage("Notification was set");
      break;

    case 'testNotification':
      console.log("SW Received test notification");
      testTimedNotification(event.data['message']);
      event.ports[0].postMessage("test notification was set");
      break;

    default:
      console.log('throw ???')
  }


});

console.log("Service Worker initialized");

