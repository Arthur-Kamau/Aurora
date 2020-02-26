import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';

import userReducer from './reducers/user_reducer';
import productReducer  from './reducers/products_reducer';

import generateJsonJsonStringReducer  from './reducers/generate_json_raw_string_reducer';
import generateJsonSchemaReducer  from './reducers/generate_json_schema_reducer';

import generateSchemaJsonStringReducer  from './reducers/generate_schema_raw_json_string_reducer';
import generateSchemaSchemaReducer  from './reducers/generate_schema_shema_data_reducer';



const allReducers = combineReducers({
  products : productReducer,
  user : userReducer,
  userProfile : userReducer,
  userAccount : userReducer,

  convertJsonJsonString : generateJsonJsonStringReducer,
  convertToJsonRawShcema : generateJsonSchemaReducer,

  convertToSchemaShcema : generateSchemaSchemaReducer,
  convertToSchemaJsonString :generateSchemaJsonStringReducer
})

const store = createStore(
   allReducers,
   {
       products : [{"name":"galaxy"}],
       user : 'kamau',
       convertJsonJsonString : '// paste your schema on the left side panel \n// The generated json string will apear here ',
       convertToJsonRawShcema :'',
     
       convertToSchemaShcema : '// paste your json on the left side panel \n// The generated shema model will apear here ',
       convertToSchemaJsonString :'',

       userAccount : {
            accountType : 'free',
            accountBalance : 'None',
            accountExpendture : 'None',
       },
       userProfile : {
           name : 'name',
           email : 'email',
           location : 'location',
           userAvatar : 'https://picsum.photos/536/354',
           getNotifiedOfMinorUpdate: true,
           sendTelemetry: true,
           theme: 'light'
       }
   },
   window.devToolsExtension && window.devToolsExtension()
)



ReactDOM.render(
    
<Provider store={store}>
    {console.log("index "+ store.getState())}
<BrowserRouter basename="/aurora">
        <App />
    </BrowserRouter>
</Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();