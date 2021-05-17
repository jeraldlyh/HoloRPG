import { combineReducers } from "redux";
import auth from "./auth"
import profile from "./profile"

// Container to combine all reducers into one
const rootReducer = combineReducers({
    auth,
    profile
})

export default rootReducer