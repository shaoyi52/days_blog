import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import  configureStore from './stores';

import ARoute from './routes';

const store = configureStore();

ReactDOM.render(
  <Provider store= {store}>
    <ARoute/>
  </Provider>,
 document.getElementById('root')
);
