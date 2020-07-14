import axios from 'axios'
import router from '../router'

const domain = 'http://localhost:3000'
const Unauthorized = 401
const onUnauthorized = () => {
    router.push('/login')
}

const request = {
    get(path) {
      return axios.get(`${domain + path}`)
        .catch(({response}) => {
          const {status} = response
          if (status === Unauthorized) return onUnauthorized()
          throw Error(response)
        })
    },
    post(path, data) {
      return axios.post(`${domain + path}`, data)
    },
    delete(path) {
      return axios.delete(`${domain + path}`)
    },
    put(path, data) {
      return axios.put(`${domain + path}`, data)
    }
  }

  export const setAuthInHeader = token => {
      axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
  }

// const request = (method, url, data) => {
//     return axios({
//         method,
//         url : DOMAIN + url,
//         data
//     }).then(result => result.data)
//     .catch(result => {
//         const {status} = result.response
//         if(status === Unauthroized) return onUnauthroized()
//         throw Error(result)
//     })
// }

export const board = {
    fetch(id) {
      if (id) {
        return request.get(`/boards/${id}`).then(({ data }) => data)
      }
      return request.get('/boards').then(({data}) => data)
    },
    create (title) {
      return request.post('/boards', { title }).then(({ data }) => data)
    },
    update(id, data) {
      return request.put(`/boards/${id}`, data).then(({ data }) => data)
    },
    destroy(id) {
      return request.delete(`/boards/${id}`)
    }
  }

export const auth = {
    login(email, password) {
      return request.post('/login', {email, password})
        .then(({data}) => data)
    }
  }