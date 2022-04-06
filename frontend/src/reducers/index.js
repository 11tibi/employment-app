import { combineReducers } from "@reduxjs/toolkit";
import user from './user';
import theme from './theme';

const rootReducer = combineReducers({
    user,
    theme,
});

export default rootReducer;
