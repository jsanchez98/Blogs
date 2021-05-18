import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import userReducer from "./reducers/userReducer"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage
}

const reducers = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))

export const persistor = persistStore(store)

export default store