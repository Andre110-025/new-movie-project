import axios from 'axios'
import { BASE_URL, API_KEY } from './config'

const apiFunction = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
})

export default apiFunction
