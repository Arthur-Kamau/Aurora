 
import dispatcher from "../Dispatcher";
import  {AIRES_STUDIO_ACTIONS} from "./actions";
import { UserSettings } from "../models/settings";

export function changeAppThemeAction(appSettings : UserSettings) {
    dispatcher.dispatch({
        type: AIRES_STUDIO_ACTIONS.CHANGE_APP_THEME,
        value: appSettings
    })
}