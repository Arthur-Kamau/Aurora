 
import dispatcher from "../Dispatcher";
import  {AIRES_STUDIO_ACTIONS} from "./actions";
import { UserSettings } from "../models/settings";

export function changeAppGeneratorOption(option : string) {
    dispatcher.dispatch({
        type: AIRES_STUDIO_ACTIONS.APP_GENERATOR_OPERATION_ACTION,
        value: option
    })
} 

export function changeAppGeneratorOptionConvertToSchemaSettings(option : object) {
    dispatcher.dispatch({
        type: AIRES_STUDIO_ACTIONS.APP_GENERATOR_OPERATION_CONVERT_TO_SCHEMA_SETTINGS,
        value: option
    })
}