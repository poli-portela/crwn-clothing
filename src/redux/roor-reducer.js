import { combineReducers } from 'redux';

import userRedeucer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

export default combineReducers({
    user: userRedeucer,
    cart: cartReducer
})