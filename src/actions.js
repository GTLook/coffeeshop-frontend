import axios from 'axios'
import { request } from './helpers'

export const CHANGE_ACTIVE_PAGE = 'CHANGE_ACTIVE_PAGE'
export const CHANGE_ACTIVE_SHOP = 'CHANGE_ACTIVE_SHOP'
export const CHANGE_ACTIVE_ITEM = 'CHANGE_ACTIVE_ITEM'
export const SET_ACTIVE_ITEM_OPTIONS = 'SET_ACTIVE_ITEM_OPTION'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const SET_PICKUP_TIME = 'SET_PICKUP_TIME'
export const GET_ALL_SHOPS = 'GET_ALL_SHOPS'
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
export const GET_ALL_OPTIONS = 'GET_ALL_OPTIONS'
export const GET_ALL_USER_ORDERS = 'GET_ALL_USER_ORDERS'

const pages = [
  {id: 0, name: 'home'},
  {id: 1, name: 'coffeeshop'},
  {id: 2, name: 'item'},
  {id: 3, name: 'cart'},
  {id: 4, name: 'register'},
  {id: 5, name: 'login'}
]


const API = `${process.env.REACT_APP_BACKEND}`

export const changeActivePage = pageId => (
  dispatch => {
      dispatch({
        type: CHANGE_ACTIVE_PAGE,
        payload: pages.find(el => el.id === pageId)
      })
  }
)

export const changeActiveShop = shop => (
  dispatch => {
      dispatch({
        type: CHANGE_ACTIVE_SHOP,
        payload: shop
      })
  }
)


export const changeActiveItem = item => (
  dispatch => {
      dispatch({
        type: CHANGE_ACTIVE_ITEM,
        payload: item
      })
  }
)

export const setActiveItemOptions = options => (
  dispatch => {
      dispatch({
        type: SET_ACTIVE_ITEM_OPTIONS,
        payload: options
      })
  }
)


export const addToCart = item => (
  dispatch => {
      dispatch({
        type: ADD_TO_CART,
        payload: item
      })
  }
)


export const removeFromCart = idx => (
  dispatch => {
      dispatch({
        type: REMOVE_FROM_CART,
        payload: idx
      })
  }
)


export const clearCart = () => (
  dispatch => {
      dispatch({
        type: CLEAR_CART
      })
  }
)

export const setPickupTime = time => (
  dispatch => {
      dispatch({
        type: SET_PICKUP_TIME,
        payload: time
      })
  }
)

export const getAllShops = () => (
  dispatch => {
    axios.get(`${API}/api/customer/shops`)
    .then((response) => {
      dispatch({
        type: GET_ALL_SHOPS,
        payload: response.data.data
      })
    })
  }
)

export const getAllProducts = () => (
  dispatch => {
    axios.get(`${API}/api/customer/Products`)
    .then((response) => {
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: response.data.data
      })
    })
  }
)

export const getAllOptions = () => (
  dispatch => {
    axios.get(`${API}/api/customer/options`)
    .then((response) => {
      dispatch({
        type: GET_ALL_OPTIONS,
        payload: response.data.data
      })
    })
  }
)

export const getAllUserOrders = (userId) => (
  dispatch => {
    request(`/api/customer/${userId}/orders`,'get')
    .then(response => {
      dispatch({
        type: GET_ALL_USER_ORDERS,
        payload: response.data.data
      })
    })
  }
)

export const createUserOrder = (userId, body) => (
  dispatch => {
    request(`/api/customer/user/${userId}/orders`,'post', body)
    .then(response => {
      // console.log('order sent!')
    })
  }
)

export const editUserOrder = (userId, orderId, body) => {
  //console.log(`/api/snacks/${userId}/reviews/${orderId}`);
  return (
  dispatch => {
    //console.log(body)
    request(`/api/snacks/${userId}/reviews/${orderId}`,'put', body)
    .then(response => {
      dispatch(getAllUserOrders())
    })
  }
)}
