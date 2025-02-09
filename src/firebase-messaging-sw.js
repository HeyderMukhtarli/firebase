importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDDo6xwdbQKSraqKsmHfLo97UXusNfFnCA",
  authDomain: "push-notification-7b0fd.firebaseapp.com",
  projectId: "push-notification-7b0fd",
  storageBucket: "push-notification-7b0fd.firebasestorage.app",
  messagingSenderId: "1008103185208",
  appId: "1:1008103185208:web:ce07b3964c5e53af56ffcd",
  measurementId: "G-KNFCLWKMZF"
});

const messaging = firebase.messaging();
const app = initializeApp(environment.firebaseConfig);
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  });
});
