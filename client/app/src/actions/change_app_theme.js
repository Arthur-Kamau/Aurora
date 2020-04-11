 
import dispatcher from "../Dispatcher";
import  {AIRES_STUDIO_ACTIONS} from "./actions";

export function changeAppThemeAction(requestDetails) {
    dispatcher.dispatch({
        type: AIRES_STUDIO_ACTIONS.CHANGE_APP_THEME,
        value: requestDetails
    })
}