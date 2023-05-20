// store.js

import { createStore, combineReducers } from 'redux';
import calculatorReducer from './calculatorReducer';

const rootReducer = combineReducers({
  calculator: calculatorReducer
});

const store = createStore(rootReducer);

export default store;