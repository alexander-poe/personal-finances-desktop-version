import * as actions from '../actions/actions'

const initState = {
  checkJoin: [],
  loading: false,
}

const checkJoin = (state = initState, action) => {
  if (action.type === actions.get_check_join_success) {
    let data = action.data.id.reverse();
    return {
      ...state,
      checkJoin: data
    }
  }
  return state;
}

export default checkJoin;
