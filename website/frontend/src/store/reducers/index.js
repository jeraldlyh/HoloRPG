import { combineReducers } from "redux";
import { authReducer } from "./authReducer"
import { profileReducer } from "./profileReducer"

// Container to combine all reducers into one
const rootReducer = combineReducers({
    authReducer,
    profileReducer
})

export default rootReducer