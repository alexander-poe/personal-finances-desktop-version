import { combineReducers } from 'redux';
import checks from './checks'
import checkTerms from './checkTerms'
import checkJoin from './checkJoin';
import termTransactions from './termTransactions';

export default combineReducers({
  libraries: () => ['d','d','c'],
  checks,
  checkTerms,
  checkJoin,
  termTransactions
})
