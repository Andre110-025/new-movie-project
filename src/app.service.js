import axios from 'axios'

const apiFunction = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  params: {
    api_key: import.meta.env.VITE_API_KEY,
  },
})

export default apiFunction
