import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import { configureStore } from "./storeConfig"
import App from "./App"

const { store, persistor } = configureStore()

const appDiv = document.getElementById("app");
ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>, appDiv)