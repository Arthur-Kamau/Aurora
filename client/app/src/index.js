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

import authtokenReducer from './reducers/auth_token_reducer';

import changeDumpServerStatusReducer from './reducers/dump_server_reducer';
import changeDumpServerLogsReducer from './reducers/dump_server_log_reducer';

import connectionToolReducer from './reducers/connection_tool_reducer';
import appGeneratorOperationsReducer from './reducers/app_generator_reducer';


const allReducers = combineReducers({

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
let appThemeUserUnauth;

var token = window.localStorage.getItem('aurora_key');
if (token == null || token.length == 0) {
    setVar = null;
} else {
    try {

        setVar = JSON.parse(window.localStorage.getItem('sett'))
    } catch (objError) {
        if (objError instanceof SyntaxError) {
            console.error(objError.name);
        } else {
            console.error(objError.message);
        }
    }
}


appThemeUserUnauth = window.localStorage.getItem('theme_unauth');


console.error("theme unauth " + appThemeUserUnauth);
console.error("sett  varr  " + setVar);
if (appThemeUserUnauth == null || appThemeUserUnauth.length == 0) {
    appThemeUserUnauth = "light"
    window.localStorage.setItem("theme_unauth", "light");
}


try {

    profileVar = JSON.parse(window.localStorage.getItem('prof')) == null
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

        user: '',
        authtoken: window.localStorage.getItem('aurora_key'),
        dumpServer: {
            isStarted: false,
            ip: "",
            port: 0
        },
        appGeneratorOperations: {
            appGeneratorOperationsActions: 'convert_to_json',
            convertToSchemaSettings:{
                targetLanguage:"C#",
                classOrNameSpaceName:"App"
            }
           
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
            theme: appThemeUserUnauth,
            notify: "true",
            stats: "true"
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
