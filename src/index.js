import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// import * as reducers from 'ducks';
import registerServiceWorker from './registerServiceWorker';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//   combineReducers({...reducers}),
//   composeEnhancers(applyMiddleware(thunk))
// );

const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default; // eslint-disable-line global-require
    ReactDOM.render(<NextApp />, rootEl);
  });
}

registerServiceWorker();
