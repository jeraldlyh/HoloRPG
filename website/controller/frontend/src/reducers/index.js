import { combineReducers } from "redux";
import auth from "./auth"

// Container to combine all reducers into one
const rootReducer = combineReducers({
    auth,
})

export default rootReducer