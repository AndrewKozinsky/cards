import axios from 'axios'

const $api = axios.create({
	baseURL: 'https://node-test-server-production.up.railway.app/api/',
})

export default $api
