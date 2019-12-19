import axios from 'axios'
import { message } from 'antd'

const axiosAjax = (url, data = {}, type = 'GET') => {
  return new Promise(resolve => {
    let promise

    if (type === 'GET') {
      promise = axios.get(url, { params: data })
    } else {
      promise = axios.post(url, data)
    }

    promise.then(res => {
      resolve(res.data)
    }).catch(err => {
      message.error('request error: ' + err.message)
    })
  })
}

export default axiosAjax