import dispatcher from "../Dispatcher";
import { EventEmitter } from "events";
import { AIRES_STUDIO_ACTIONS } from "../actions/actions";

class AiresAppStore extends EventEmitter {

    constructor() {
        super();
        this.page = {
            name: "",
            id: ""
        };
        this.authtoken =  window.localStorage.getItem('aurora_key');
        this.dumpServer = {
            isStarted: false,
            ip: "",
            port: 0
        };
        this.appGeneratorOperations = {
            appGeneratorOperationsActions: 'convert_schema_to_json',
            convertToSchemaSettings:{
                targetLanguage:"C#",
                classOrNameSpaceName:"App"
            }
           
        };
        this.dumpServerLogs = [],
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
       this. userAccount = {
            accountType: 'free',
            accountBalance: 'None',
            accountExpendture: 'None',
        };
        this.userSettings = this.getUserSettings() == null ? {
            theme: appThemeUserUnauth,
            notify: "true",
            stats: "true"
        } : this.getUserSettings() ;
        this.userProfile =  this.getUserProfile() == null ? {
            name: 'name',
            email: 'email',
            location: 'location',
            userAvatar: 'https://picsum.photos/536/354',

        } : this.getUserProfile()
    }
   
   
   
    getUserSettings = () =>{
        let setVar = null ;
        try {

            setVar = JSON.parse(window.localStorage.getItem('sett'))
        } catch (objError) {
            if (objError instanceof SyntaxError) {
                console.error(objError.name);
            } else {
                console.error(objError.message);
            }
        }
        return setVar;
    }
    getUserProfile = () =>{
        let profileVar = null
        try {

            profileVar = JSON.parse(window.localStorage.getItem('prof')) 
        } catch (objError) {
            if (objError instanceof SyntaxError) {
                console.error(objError.name);
            } else {
                console.error(objError.message);
            }
        }
        return profileVar;
    }

    handleActions(action) {
        // console.error("handle actions "+ JSON.stringify(action));
        switch (action.type) {
            case AIRES_STUDIO_ACTIONS.CHANGE_PAGE: {
                this.page = action.value;
                this.emit("changePage");
                break;
            }
            case AIRES_STUDIO_ACTIONS.CHANGE_PAGE_TAB: {
                this.pageTab = action.value;
                this.emit("changePageTab");
                break;
            }

            case AIRES_STUDIO_ACTIONS.ADD_CREATE_TYPE: {
                this.requestsTree.push(action.value)

                
                this.emit("addRequest");
                break;
            }

            default: {
            }
        }
    }

    getActivePage() {
        return this.page;
    }
    getActivePageTab() {
        return this.pageTab;
    }
    getRequestTree() {
        return this.requestsTree;
    }
}

const airesAppStore = new AiresAppStore();
dispatcher.register(airesAppStore.handleActions.bind(airesAppStore));
export default airesAppStore;