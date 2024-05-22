import { configureStore, combineReducers } from "@reduxjs/toolkit"
import settingsRedux from "./settingsRedux"
import styleRedux from "./styleRedux"

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { thunk } from "redux-thunk"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
}
const rootReducer = combineReducers({
  style:styleRedux,
  settings:settingsRedux,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk)
})

export let persistor = persistStore(store)


