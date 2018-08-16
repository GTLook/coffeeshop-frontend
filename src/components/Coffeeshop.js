import React from 'react';
import '../css/App.css';
import {SideNav, SideNavItem, Button, Collapsible, CollapsibleItem, Collection, CollectionItem} from 'react-materialize'
import io from 'socket.io-client';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { Swipeable } from 'react-touch';

import {changeActivePage, changeActiveItem} from '../actions'
import Header from './Header'

const handleItemSelection = (props, item) => {
  props.changeActiveItem(item)
  props.changeActivePage(2)
}

const Coffeeshop = (props) => {
  const {activeShop, allItems} = props
  return (<Swipeable onSwipeLeft={() => props.changeActivePage(3)}>
    <div className='main'>
      <Header/>
      <h2 className='coffeeshop-time'>
        <i className="fas fa-walking"></i>
        5 min</h2>
      <section className='coffeeshop-section'>
        <div className='coffeeshop-info'>
          <h1 className='coffeeshop-section-title'>{allItems[activeShop - 1].shop.shop_name}</h1>
          <h2 className='coffeeshop-section-address'>{allItems[activeShop - 1].shop.shop_location_address}</h2>
        </div>

        {
          props.cart.orderItems.length
            ? <Button waves='light' className='coffeeshop-checkout-button' onClick={() => props.changeActivePage(3)}>Checkout</Button>
            : null
        }

        <div className='coffeeshop-item-card-container'>
          {
            allItems.find(el => el.shopId === activeShop.id).orderItems.map(item => (<div key={item.id} className='coffeeshop-item-card' onClick={() => handleItemSelection(props, item)}>
              <div>
                <img className='coffeeshop-item-card-image' src={'https://media.istockphoto.com/photos/black-coffee-in-disposable-cup-with-clipping-path-picture-id529747627?k=6&m=529747627&s=612x612&w=0&h=lV2tGJlFgX-WQItNWbdZO8XVQHVSoUlbYod-7jKyU1I='}/>
                <h1 className='coffeeshop-item-card-title'>{item.item_name}</h1>
              </div>
              <div className='coffeeshop-item-card-price'>${parseFloat(item.item_price).toFixed(2)}</div>
            </div>))
          }
        </div>
      </section>
      <footer className='main-footer'>
        <p className='footer-text'>© 2018 Coffeeshop</p>
      </footer>
    </div>
  </Swipeable>)
}

const mapDispatchToProps = dispatch => bindActionCreators({changeActivePage, changeActiveItem}, dispatch)
const mapStateToProps = ({allItems,activeShop,cart}) => ({allItems, activeShop,cart})
export default connect(mapStateToProps,mapDispatchToProps)(Coffeeshop)
