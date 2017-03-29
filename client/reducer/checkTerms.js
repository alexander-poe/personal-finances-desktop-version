import * as actions from '../actions/actions'

const initState = {
  checkTerms: [],
  loading: false,
}

const checkTerms = (state = initState, action) => {
  if (action.type === actions.get_check_term_success) {
    return {
      ...state,
      checkTerms: action.data.id
    }
  }
  return state;
}

export default checkTerms;
