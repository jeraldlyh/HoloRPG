import { combineReducers } from "redux";
import { authReducer } from "./AuthReducer"
import { profileReducer } from "./ProfileReducer"
import { errorReducer } from "./ErrorReducer"

// Container to combine all reducers into one
const rootReducer = combineReducers({
    authReducer,
    profileReducer,
    errorReducer
})

export default rootReducer