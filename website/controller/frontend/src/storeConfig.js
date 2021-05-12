import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { persistStore, persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk"
import rootReducer from "./reducers"


const initialState = {}

const middleware = [thunk]

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const configureStore = () => {
    const store = createStore(
        persistedReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
    )
    const persistor = persistStore(store)

    return { store, persistor }
}

