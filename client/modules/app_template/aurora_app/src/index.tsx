// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import userProfileReducer from './reducer/user_reducers';
import settingsReducer from './reducer/settings_reducers';


const allReducers = combineReducers({
  profile: userProfileReducer,
  settings: settingsReducer,
  
})

const store = createStore(allReducers);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/aurora">
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));

serviceWorker.unregister();