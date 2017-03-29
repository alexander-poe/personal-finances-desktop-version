export const get_check_success = 'get_check_success';

export const getCheckSuccess = data => ({
	type: get_check_success,
	data
})

export const getCheck = () => {
	return dispatch =>  {
		return fetch('http://localhost:8080/checks')
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

export const getCheckTermSuccess = data => ({
	type: 'get_check_term_success',
	data
})

export const getCheckTerm = () => {
	return dispatch =>  {
		return fetch('http://localhost:8080/checkterm')
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
  	return fetch('http://localhost:8080/checks',
		{
			method: "DELETE",
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
  	return fetch('http://localhost:8080/checks',
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
  	return fetch('http://localhost:8080/termtransactions',
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
