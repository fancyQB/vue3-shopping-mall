import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}
