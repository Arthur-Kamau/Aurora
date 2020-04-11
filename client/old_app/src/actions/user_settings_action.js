export const USER_SETTINGS_ACTION = 'user_settings_action';

export default function userSettingsAction(settings) {
    if (settings != null)
    for (var key of Object.keys(settings)) {
        console.error("--> userSettingsAction " + key + " -> " + JSON.stringify(settings[key]))
    }
    return {
        type: USER_SETTINGS_ACTION,
        payload: {
            settings: settings
        }
    }
}