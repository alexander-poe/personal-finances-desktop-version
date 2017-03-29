import * as actions from '../actions/actions'

const initState = {
  checks: [],
  loading: false,
}

console.log(actions.get_check_success)

const checks = (state = initState, action) => {
  if (action.type === actions.get_check_success) {
    return {
      ...state,
      checks: action.data.id
    }
  }
  console.log(state)
  return state;
}

export default checks;
