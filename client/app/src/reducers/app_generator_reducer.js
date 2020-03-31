import { JSON_OPERATIONS_ACTIONS,GENARATE_SCHEMA_CONFIGURATIONS } from '../actions/app_generator_actions'

export default function appGeneratorOperationsReducer(state = [], { type, payload }) {
    console.log("  appGeneratorOperationsReducer type =" + type + " payload " + JSON.stringify(payload) + ' state ' + state);
    var state2 = { ...state };
    switch (type) {
        case JSON_OPERATIONS_ACTIONS:
            state2.appGeneratorOperationsActions = payload.jsonObjectAction;
            return state2;
        case GENARATE_SCHEMA_CONFIGURATIONS:
            state2.convertToSchemaSettings.targetLanguage = payload.configs.targetLanguage
            state2.convertToSchemaSettings.classOrNameSpaceName = payload.configs.classOrNameSpaceName
            return state2    
        default:
            return state;
    }
}