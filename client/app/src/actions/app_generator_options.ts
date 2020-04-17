 
import dispatcher from "../Dispatcher";
import  {AIRES_STUDIO_ACTIONS} from "./actions";
import { UserSettings } from "../models/settings";

export function changeAppGeneratorOption(option : string) {
    dispatcher.dispatch({
        type: AIRES_STUDIO_ACTIONS.APP_GENERATOR_OPTION,
        value: option
    })
}