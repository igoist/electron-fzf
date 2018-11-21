import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { AppContainer } from 'react-hot-loader';
import { ipcRenderer } from 'electron';
// import { ipcRenderer, remote } from 'electron';
// console.log(remote.getGlobal('sharedObject'));
// console.log(remote.getGlobal('sharedObject').someProperty);

// import * as fs from 'fs';
// console.log(fs);
// console.log(fs.readFile);
// console.log(fs.readdir);

const handleMenuBtnClick = () => {
  document.body.classList.toggle('nav-opened');
  console.log('click');
};

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}

ipcRenderer.on('test-event', (event, arg) => {
  // const notification = {
  //   title: 'Notification with image',
  //   body: 'Short message plus a custom image',
  //   // icon: path.join(__dirname, './public/img/programming.png')
  // };
  // const myNotification = new window.Notification(notification.title, notification);
  
  // myNotification.onclick = () => {
  //   console.log('Oh! Notification clicked!~');
  // };

  // event.sender.send('reply-test', 'pingppong');
  console.log('receive test-event', arg);
});

ipcRenderer.send('reply-test', { a: 1, b: 2, c: 'aa' });


// const notification = {
//   title: 'Notification with image',
//   body: 'Short message plus a custom image',
//   // icon: path.join(__dirname, './public/img/programming.png')
// };
// const myNotification = new window.Notification(notification.title, notification);