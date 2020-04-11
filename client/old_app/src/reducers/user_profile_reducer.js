import { USER_PROFILE_ACTION } from '../actions/user_profile_action'

export default function userProfileReducer(state = [], { type, payload }) {
    console.error("  userProfileReducer type =" + type + " payload " + payload);
    if (payload != null){
        for (var key of Object.keys(payload)) {
            console.error("--> userProfileReducer " + key + " -> " + JSON.stringify(payload[key]))
        }
    }else{
        console.error("userProfileReducer payload is null")
    }
    switch (type) {
        case USER_PROFILE_ACTION:
            return payload.user;
        default:
            return state;
    }
}