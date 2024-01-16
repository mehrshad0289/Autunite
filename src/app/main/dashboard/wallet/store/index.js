import { combineReducers } from '@reduxjs/toolkit';
import wallets from './walletsSlice';

const reducer = combineReducers({
  wallets,
});

export default reducer;
