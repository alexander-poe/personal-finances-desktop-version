export const get_check_success = 'get_check_success';

export const getCheckSuccess = data => ({
	type: get_check_success,
	data
})

export const getCheck = () => {
	return dispatch =>  {
		return fetch('/checks')
			.then(res => {
				return res.json()
			}).then(res => {
				console.log(res)
				if (!res) return dispatch(getCheckSuccess([]))
				return dispatch(getCheckSuccess(res))
			})
			.catch(e => {
				console.error(e)
			})
    }
}

export const get_check_join_success = 'get_check_join_success';

export const getCheckJoinSuccess = data => ({
	type: get_check_join_success,
	data
})

export const getCheckJoin = () => {
	return dispatch =>  {
		return fetch('/checkJoin')
			.then(res => {
				return res.json()
			}).then(res => {
				console.log(res)
				if (!res) return dispatch(getCheckJoinSuccess([]))
				return dispatch(getCheckJoinSuccess(res))
			})
			.catch(e => {
				console.error(e)
			})
    }
}

export const get_check_term_success = 'get_check_term_success'

export const getCheckTermSuccess = data => ({
	type: get_check_term_success,
	data
})

export const getCheckTerm = () => {
	return dispatch =>  {
		return fetch('/checkterm')
			.then(res => {
				return res.json()
			}).then(res => {
				console.log(res)
				if (!res) return dispatch(getCheckTermSuccess([]))
				return dispatch(getCheckTermSuccess(res))
			})
			.catch(e => {
				console.error(e)
			})
    }
}

export const deleteCheck = (id) => {
  return dispatch => {
  	return fetch('/checks',
		{
			method: "PUT",
			body: JSON.stringify({
				id
			}),
			headers: { "Content-Type" : "application/json" }
		}).then(res => {
			if (res.status >= 300) {
				throw new Error(res.statusText)
			}
			return res
		}).then(res => {
			console.log('delete check success')
		}).catch(e => {
			console.error(e)
		})
    }
}

export const addCheck = (amount, description, picture, reoccuring) => {
  return dispatch => {
  	return fetch('/checks',
		{
			method: "POST",
			body: JSON.stringify({
				amount,
				description,
				picture,
				reoccuring
			}),
			headers: { "Content-Type" : "application/json" }
		}).then(res => {
			if (res.status >= 300) {
				throw new Error(res.statusText)
			}
			return res
		}).then(res => {
			console.log('post check success')
		}).catch(e => {
			console.error(e)
		})
    }
}

export const addTermTransaction = (checktermid, account, transaction, description, photo) => {
  return dispatch => {
  	return fetch('/termtransactions',
		{
			method: "POST",
			body: JSON.stringify({
				checktermid,
				account,
				transaction,
				description,
				photo
			}),
			headers: { "Content-Type" : "application/json" }
		}).then(res => {
			if (res.status >= 300) {
				throw new Error(res.statusText)
			}
			return res
		}).then(res => {
      console.log('39', res)
			console.log('post transaction success')
		}).catch(e => {
			console.error(e)
		})
    }
}

export const get_transactions_success = 'get_transactions_success';

export const getTransactionsSuccess = data => ({
	type: get_transactions_success,
	data
})


export const getTransactions = () => {
	return dispatch =>  {
		return fetch('/termtransactions')
			.then(res => {
				return res.json()
			}).then(res => {
				console.log(res)
				if (!res) return dispatch(getTransactionsSuccess([]))
				return dispatch(getTransactionsSuccess(res))
			})
			.catch(e => {
				console.error(e)
			})
    }
}
