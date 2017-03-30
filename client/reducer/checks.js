import * as actions from '../actions/actions'

const initState = {
  checks: [],
  loading: false,
}

const checks = (state = initState, action) => {
  if (action.type === actions.get_check_success) {
    console.log(actions.get_check_success)
    return {
      ...state,
      checks: action.data.id
    }
  }
  return state;
}

export default checks;
