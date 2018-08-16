import { combineReducers } from 'redux'

import {
  GET_ALL_PRODUCTS,
  CHANGE_ACTIVE_PAGE,
  CHANGE_ACTIVE_SHOP,
  CHANGE_ACTIVE_ITEM,
  SET_ACTIVE_ITEM_OPTIONS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  SET_PICKUP_TIME,
  GET_ALL_SHOPS,
} from './actions'

const INITIAL_PAGE = {}
const INITIAL_SHOP = {}
const INITIAL_ALL_ITEMS = []
const INITIAL_ITEM = {}
const INITIAL_CART = {}

const activePage = (state = INITIAL_PAGE, action) => {
  switch(action.type){
    case CHANGE_ACTIVE_PAGE: return action.payload
    default: return state
  }
}

const activeShop = (state = INITIAL_SHOP, action) => {
  switch(action.type){
    case CHANGE_ACTIVE_SHOP: return action.payload
    default: return state
  }
}

const activeItem = (state = INITIAL_ITEM, action) => {
  switch(action.type){
    case CHANGE_ACTIVE_ITEM: return action.payload
    case SET_ACTIVE_ITEM_OPTIONS: return {...state, ...action.payload}
    default: return state
  }
}

const cart = (state = INITIAL_CART, action) => {
  switch(action.type){
    case ADD_TO_CART: return {...state, orderItems: [...state.orderItems, action.payload]}
    case REMOVE_FROM_CART: return {...state, orderItems: state.orderItems.filter((item,idx)=>idx!==action.payload)}
    case SET_PICKUP_TIME: return {...state, pickupTime: action.payload}
    case CLEAR_CART: return {...INITIAL_CART}
    default: return state
  }
}

const allItems = (state = INITIAL_ALL_ITEMS, action) => {
  switch(action.type){
    case GET_ALL_PRODUCTS: return action.payload
    default: return state
  }
}

const allShops = (state = [], action) => {
  switch(action.type){
    case GET_ALL_SHOPS: return action.payload
    default: return state
  }
}


export default combineReducers({ activePage, activeShop, activeItem, cart, allItems, allShops })
