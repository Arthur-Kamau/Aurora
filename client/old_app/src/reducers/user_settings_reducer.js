import { USER_SETTINGS_ACTION } from '../actions/user_settings_action'

export default function userSettingsReducer(state = [], { type, payload }) {
    console.error("  userSettingsReducer type =" + type + " payload " + payload);
    if (payload != null)
        for (var key of Object.keys(payload)) {
            console.error("--> userSettingsReducer " + key + " -> " + JSON.stringify(payload[key]))
        }
    switch (type) {
        case USER_SETTINGS_ACTION:
            return payload.settings;
        default:
            return state;
    }
}