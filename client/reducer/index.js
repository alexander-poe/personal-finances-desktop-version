import { combineReducers } from 'redux';
import checks from './checks'

export default combineReducers({
  libraries: () => ['d','d','c'],
  checks
})
