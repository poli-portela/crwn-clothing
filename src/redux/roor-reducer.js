import { combineReducers } from 'redux';

import userRedeucer from './user/user.reducer';


export default combineReducers({
    user: userRedeucer
})