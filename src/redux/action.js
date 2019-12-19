import {
  reqCategory,
  reqUpdateCategory,
  reqGetAddCategory,
  reqProduct,
  reqSearchProduct,
  reqUpdateStatus,
  reqLogin
} from '../api'
import {
  GET_CATEGORY_LIST,
  GET_CATEGORY_SUB_LIST,
  GET_PRODUCT_LIST,
  SET_USERS,
  RESET_USER
} from './action-type'


const cantegory_list = data => ({ type: GET_CATEGORY_LIST, data })
const cantegory_sub_list = data => ({ type: GET_CATEGORY_SUB_LIST, data })
const product_list = data => ({ type: GET_PRODUCT_LIST, data })
const logins = data => ({ type: SET_USERS, data })
export const logout = () => ({type: RESET_USER})


export const getLogin = (users) => {
  return async dispatch => {
    const res = await reqLogin(users)
    if (res.status === 0) {
      const data = res.data
      dispatch(logins(data))
    }
  }
}


export const getCategory = parentId => {
  return async dispatch => {
    const res = await reqCategory(parentId)
    if (res.status === 0) {
      let data = res.data
      if (parentId === '0') {
        dispatch(cantegory_list(data))
      } else {
        dispatch(cantegory_sub_list(data))
      }
    }
  }
}

export const getAddCategory = params => {
  const { parentId } = params
  return async dispatch => {
    const res = await reqGetAddCategory(params)
    if (res.status === 0) {
      return parentId
    }
  }
}

export const getUpdateCategory = params => {
  return async dispatch => {
    const res = await reqUpdateCategory(params)
    if (res.status === 0) {
      return res
    }
  }
}


export const getProduct = (pageNum, pageSize) => {
  return async dispatch => {
    const res = await reqProduct(pageNum, pageSize)
    if (res.status === 0) {
      const data = res.data
      dispatch(product_list(data))
    }
  }
}

export const getSearchProduct = ({ pageNum, pageSize, searchName, searchType }) => {
  return async dispatch => {
    const res = await reqSearchProduct(({ pageNum, pageSize, searchName, searchType }))
    if (res.status === 0) {
      const data = res.data
      dispatch(product_list(data))
    }
  }
}

export const getUpdateStatus = (productId, status) => {
  return async dispatch => {
    const res = await reqUpdateStatus(productId, status)
    return res
  }
}