// unregister previously registered service worker

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      if (
        registration.active &&
        registration.active.scriptURL ==
          "https://chatroom-67e21.web.app/service-worker.js"
      ) {
        registration.unregister();
      }
    }
  });
}
