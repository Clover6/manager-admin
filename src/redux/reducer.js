import {
  GET_CATEGORY_LIST,
  GET_CATEGORY_SUB_LIST,
  GET_PRODUCT_LIST,
  SET_USERS,
  RESET_USER
} from './action-type'
import initState from './store'

export default function (state = initState, action) {

  switch (action.type) {
    case GET_CATEGORY_LIST:
      return { ...state, categorys: action.data }
    case GET_CATEGORY_SUB_LIST:
      return { ...state, subcategorys: action.data }
    case GET_PRODUCT_LIST:
      const { list, total, pages, pageSize } = action.data
      return { ...state, products: list, total, pages, pageSize }
    case SET_USERS:
      return { ...state, users: action.data }
    case RESET_USER:
      return {}
    default:
      return state
  }
}