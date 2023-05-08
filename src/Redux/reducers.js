// reducers.js

import { combineReducers } from 'redux';
import calculatorReducer from './calculatorReducer';

const rootReducer = combineReducers({
    calculatorId: calculatorReducer
});

export default rootReducer;