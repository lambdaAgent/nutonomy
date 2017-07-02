require('es6-promise').polyfill();
require('isomorphic-fetch');
const backEndUrl = 'http://localhost:3000/data'

export const fetchData = () => {
	let status;
	return new Promise((resolve, reject) => {
		fetch(backEndUrl)
		.then(res => {
			status = res.status;
			return res.json()
		})
		.then(res => {
			res.status = status;
			resolve(res)
		})
		.catch(err => {
			err.status = status;
			reject(err)
		})
	})

}

