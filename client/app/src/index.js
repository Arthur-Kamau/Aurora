import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import userReducer from './reducers/user_reducer';
import userProfileReducer from './reducers/user_profile_reducer';
import userSettingsReducer from './reducers/user_settings_reducer';
import productReducer from './reducers/products_reducer';
import authtokenReducer from './reducers/auth_token_reducer';

import changeDumpServerStatusReducer from './reducers/dump_server_reducer';
import changeDumpServerLogsReducer from './reducers/dump_server_log_reducer';

import connectionToolReducer from './reducers/connection_tool_reducer';
import appGeneratorOperationsReducer from './reducers/json_operattions_reducer';



const allReducers = combineReducers({
    products: productReducer,
    user: userReducer,
    userSettings: userSettingsReducer,
    userProfile: userProfileReducer,
    userAccount: userReducer,
    authtoken: authtokenReducer,


    dumpServer: changeDumpServerStatusReducer,
    dumpServerLogs: changeDumpServerLogsReducer,

    connectionTool: connectionToolReducer,
    appGeneratorOperations: appGeneratorOperationsReducer
})

let setVar;
let profileVar; 

try {
    
    setVar =  JSON.parse(window.localStorage.getItem('sett')) 
} catch (objError) {
    if (objError instanceof SyntaxError) {
        console.error(objError.name);
    } else {
        console.error(objError.message);
    }
}


 


try {
    
    profileVar =  JSON.parse(window.localStorage.getItem('prof')) == null 
} catch (objError) {
    if (objError instanceof SyntaxError) {
        console.error(objError.name);
    } else {
        console.error(objError.message);
    }
}

const store = createStore(
    allReducers,
    {
        products: [{ "name": "galaxy" }],
        user: 'kamau',
        authtoken: window.localStorage.getItem('aurora_key'),
        appGeneratorOperations: {
            appGeneratorOperationsActions: 'convert_to_json',
            jsonPayloadReceived: '',
            jsonInput: ''
        },
        dumpServer: {
            isStarted: false,
            ip: "",
            port: 0
        },
        dumpServerLogs: [],
        connectionTool: {
            connectionMethod: '',
            connectionProtocol: '',
            connectionAddress: '',
            connectionPort: '',
            connectionTime: '',
            connectionMethodTopics: [],
            connectionMethodTopicsMessages: [],
            connectionMethodLogs: [],
        },
        userAccount: {
            accountType: 'free',
            accountBalance: 'None',
            accountExpendture: 'None',
        },
        userSettings: setVar == null ? {
            theme: "dark", notify: "true", stats: "true"
        } : setVar,
        userProfile: profileVar == null ? {
            name: 'name',
            email: 'email',
            location: 'location',
            userAvatar: 'https://picsum.photos/536/354',

        } : profileVar
    },
    window.devToolsExtension && window.devToolsExtension()
)



ReactDOM.render(

    <Provider store={store}>
        {console.log("index " + store.getState())}
        <BrowserRouter basename="/aurora">
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
