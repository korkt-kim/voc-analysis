import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://www.example.com/api',
})

export { instance as axios }
