import { combineReducers } from 'redux';
import loginReducer from "./loginReducer"

const reducers = combineReducers({
    authentication: loginReducer
})

export default reducers;