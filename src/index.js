import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Root} from './page';
import {Provider} from 'react-redux';

import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Page />
  </Provider>, 
document.getElementById('root'),
);
