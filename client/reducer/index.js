import { combineReducers } from 'redux';
import checks from './checks'
import checkTerms from './checkTerms'

export default combineReducers({
  libraries: () => ['d','d','c'],
  checks,
  checkTerms
})
