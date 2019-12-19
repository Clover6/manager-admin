import axios from './axios'
import jsonp from 'jsonp'
import { message } from 'antd'

const BASE = 'http://localhost:3000'

export const reqLogin = user => axios(BASE + '/login', user, 'POST')


export const reqCategory = parentId => axios(BASE + '/manage/category/list', { parentId })

export const reqUpdateCategory = params => axios(BASE + '/manage/category/update', params, 'POST')

export const reqGetAddCategory = params => axios(BASE + '/manage/category/add', params, 'POST')

export const reqCategoryName = (categoryId) => axios(BASE + '/manage/category/info', { categoryId })


export const reqProduct = (pageNum, pageSize) => axios(BASE + '/manage/product/list', { pageNum, pageSize })

export const reqSearchProduct = ({ pageNum, pageSize, searchName, searchType }) => axios(BASE + '/manage/product/search', { pageNum, pageSize, [searchType]: searchName })

export const reqUpdateStatus = (productId, status) => axios(BASE + '/manage/product/updateStatus', { productId, status }, 'POST')

export const reqAddOrUpdateProduct = (product) => axios(BASE + '/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST')


export const reqRoles = () => axios(BASE + '/manage/role/list')

export const reqAddRole = (roleName) => axios(BASE + '/manage/role/add', { roleName }, 'POST')

export const reqUpdateRole = (role) => axios(BASE + '/manage/role/update', role, 'POST')


export const reqDeleteImg = (name) => axios(BASE + '/manage/img/delete', { name }, 'POST')


export const reqUsers = () => axios(BASE + '/manage/user/list')

export const reqDeleteUser = (userId) => axios(BASE + '/manage/user/delete', { userId }, 'POST')

export const reqAddOrUpdateUser = (user) => axios(BASE + '/manage/user/' + (user._id ? 'update' : 'add'), user, 'POST')



export const reqWeather = (city) => {
  return new Promise(resolve => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === 'success') {
        const { dayPictureUrl, weather } = data.results[0].weather_data[0]
        resolve({ dayPictureUrl, weather })
      } else {
        message.error('weather error!')
      }
    })
  })
}