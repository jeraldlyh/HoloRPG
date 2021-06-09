import { combineReducers } from "redux";
import { authReducer } from "./authReducer"
import { profileReducer } from "./profileReducer"
import { errorReducer } from "./errorReducer"

// Container to combine all reducers into one
const rootReducer = combineReducers({
    authReducer,
    profileReducer,
    errorReducer
})

export default rootReducer