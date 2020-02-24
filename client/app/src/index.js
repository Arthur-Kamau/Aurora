import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';

import userReducer from './reducers/user_reducer';
import productReducer  from './reducers/products_reducer';



const allReducers = combineReducers({
  products : productReducer,
  user : userReducer
})

const store = createStore(
   allReducers,
   {
       products : [{"name":"galaxy"}],
       user : 'kamau',
       convertJsonStringToSchema : '',
       convertToJsonRawShcema :'',
     
       convertToSchemaShcema : '',
       convertToSchemaString :'',

       userProfile : {
           name : '',
           email : '',
           userAvater : '',
           getNotifiedOfMinorUpdate: true
       }
   },
   window.devToolsExtension && window.devToolsExtension()
)


ReactDOM.render(
<Provider store={store}>
<BrowserRouter basename="/aurora">
        <App />
    </BrowserRouter>
</Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
