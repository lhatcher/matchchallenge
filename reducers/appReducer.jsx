import { combineReducers } from 'redux';

import analysis from './analysisReducer';

const appReducer = combineReducers({
  analysis: analysis,
});

export default appReducer;