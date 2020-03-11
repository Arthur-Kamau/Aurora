export const AUTH_TOKEN_ACTION = 'auth_token_action';

export default function authTokenAction(connectionToolDetails) {
    return {
        type: AUTH_TOKEN_ACTION,
        payload: {
            connectionToolDetails: connectionToolDetails
        }
    }
}