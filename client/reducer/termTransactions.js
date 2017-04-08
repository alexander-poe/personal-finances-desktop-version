import * as actions from '../actions/actions'

const initState = {
  termTransactions: [],
  loading: false,
}

const termTransactions = (state = initState, action) => {
  if (action.type === actions.get_transactions_success) {
    console.log(action.data.id,'action')
    return {
      ...state,
      termTransactions: action.data.id
    }
  }
  return state;
}

export default termTransactions;
