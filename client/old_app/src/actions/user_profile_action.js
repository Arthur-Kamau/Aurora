export const USER_PROFILE_ACTION = 'user_profile_action';

export default function userProfileAction(profile) {
    if (profile != null) {
        for (var key of Object.keys(profile)) {
            console.error("--> userProfileAction " + key + " -> " + JSON.stringify(profile[key]))
        }
    } else { console.error("userProfileAction profile is null ") }
    return {
        type: USER_PROFILE_ACTION,
        payload: {
            user: profile
        }
    }
}