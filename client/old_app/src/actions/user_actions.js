export const UPDATE_USER = 'user_update';

export default function updateUser(newUser) {
    return {
        type: UPDATE_USER,
        payload: {
            user: newUser
        }
    }
}