import * as React from 'react';
import * as ReactDOM from 'react-dom';


const handleMenuBtnClick = () => {
  document.body.classList.toggle('nav-opened');
};

ReactDOM.render(
  <div>
    <h1>Hello</h1>
  </div>,
  document.getElementById('app')
);
