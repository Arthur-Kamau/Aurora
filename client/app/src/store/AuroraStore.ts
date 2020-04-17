import dispatcher from "../Dispatcher";
import { EventEmitter } from "events";
import { AIRES_STUDIO_ACTIONS } from "../actions/actions";
import { UserSettings } from "../models/settings";
import { UserProfile } from "../models/profile";
import { UserAccount } from "../models/account";
import { AppConnections } from "../models/connections";
import { AppGeneratorOptions } from "../models/generator_options";
import { StoreAction } from "../models/store_action";
import { AppPage } from "../models/app_page";

class AuroraAppStore extends EventEmitter {
    page: AppPage;
    authtoken: string | null;
    dumpServer: { isStarted: boolean; ip: string; port: number; };
    appGeneratorOperations: AppGeneratorOptions;
    dumpServerLogs: Array<string>;
    connectionTool: AppConnections;
    userAccount: UserAccount;
    userSettings : UserSettings;
    userProfile: UserProfile;
    pageTab: string;


    constructor() {
        super();
        this.page = {
            name: "",
            id: ""
        };
        this.authtoken = window.localStorage.getItem('aurora_key');
        this.dumpServer = {
            isStarted: false,
            ip: "",
            port: 0
        };
        this.appGeneratorOperations = {
            appGeneratorOperationsActions: 'convert_schema_to_json',
            convertToSchemaSettings: {
                targetLanguage: "C#",
                classOrNameSpaceName: "App"
            }

        };
        this.dumpServerLogs = [];
        this.pageTab = "";
        this.connectionTool = {
                connectionMethod: '',
                connectionProtocol: '',
                connectionAddress: '',
                connectionPort: '',
                connectionTime: '',
                connectionMethodTopics: [],
                connectionMethodTopicsMessages: [],
                connectionMethodLogs: [],
        };
        this.userAccount = {
            accountType: 'free',
            accountBalance: 'None',
            accountExpendture: 'None',
        };
        
            this.userSettings = this.getSettings()! == null ? {
                theme: this.getThemeUnAuth()!,
                userId: "",
                notify: "true",
                stats: "true"
            } : this.getSettings()!;
        this.userProfile = this.getProfile() == null ? {
            userId : '',
            name: 'name',
            email: 'email',
            country: 'location',
            phoneNumber : 0,
            userAvatar: 'https://picsum.photos/536/354',
    
        } : this.getProfile()
    }

    getThemeUnAuth = () => {
        let themes: string = window.localStorage.getItem('theme_unauth')!; 
        if (themes == null) {
          return  "dark";
        } else {
            return themes;
        }
    }

    getSettings = (): UserSettings | null => {
        let setVar: UserSettings | null = null;
        try {

            setVar = JSON.parse(window.localStorage.getItem('sett')!)
        } catch (objError) {
            if (objError instanceof SyntaxError) {
                console.error(objError.name);
            } else {
                console.error(objError.message);
            }
        }
        return setVar;
    }
    getProfile = () => {
        let profileVar = null
        try {

            profileVar = JSON.parse(window.localStorage.getItem('prof')!)
        } catch (objError) {
            if (objError instanceof SyntaxError) {
                console.error(objError.name);
            } else {
                console.error(objError.message);
            }
        }
        return profileVar;
    }

    handleActions(action: StoreAction |  any) {
        // console.error("handle actions "+ JSON.stringify(action));
        switch (action.type) {
            case AIRES_STUDIO_ACTIONS.CHANGE_PAGE: {
                this.page = action.value as AppPage;
                this.emit("changePage");
                break;
            }
            case AIRES_STUDIO_ACTIONS.CHANGE_PAGE_TAB: {
                this.pageTab = action.value as string;
                this.emit("changePageTab");
                break;
            }

            case AIRES_STUDIO_ACTIONS.CHANGE_APP_THEME: {
                this.userSettings = action.value as UserSettings;

                console.log("app change theme in store paylod " + JSON.stringify(action.value))
                window.localStorage.setItem("theme_unauth", this.userSettings.theme);
                this.emit("changeTheme");
                break;
            }

            default: {
            }
        }
    }

    getUserToken() {
        return this.authtoken;
    }
    getUserProfile() {
        return this.userProfile;
    }
    getUserSettings() {
        return this.userSettings;
    }
    getUserAccount() {
        return this.userAccount;
    }
    getDumpserverDetails() {
        return this.dumpServer;
    }
    getDumpserverLogs() {
        return this.dumpServerLogs;
    }
    getConnectionTool() {
        return this.connectionTool;
    }
    getAppGeneratorOperations(){
        return this.appGeneratorOperations;
    }
}

const auroraAppStore = new AuroraAppStore();
dispatcher.register(auroraAppStore.handleActions.bind(auroraAppStore));
export default auroraAppStore;