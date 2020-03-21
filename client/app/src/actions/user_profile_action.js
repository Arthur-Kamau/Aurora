export const USER_PROFILE_ACTION = 'user_profile_action';

export default function userProfileAction(connectionToolDetails) {
    return {
        type: USER_PROFILE_ACTION,
        payload: {
            connectionToolDetails: connectionToolDetails
        }
    }
}