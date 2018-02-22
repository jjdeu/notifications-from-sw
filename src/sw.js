self.addEventListener('install', function (event) {
  console.log("Service Worker installed");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function (event) {
  console.log("Service Worker activated");
  event.waitUntil(self.skipWaiting());

});

self.addEventListener('message', function (event) {

  let theDataType = event.data['type'];

  switch (theDataType) {

    case 'notification':

      let theDelay = event.data['delay'];

      setTimeout(() => {
        self.registration.showNotification('Test title goes here', {
          body: 'Nothing to see here',
          icon: './favicon.ico',
          requireInteraction: true
        })
      }, theDelay);

  }


});

console.log("Service Worker initialized");

