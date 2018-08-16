import React from 'react';
import '../css/App.css';
import {SideNav, SideNavItem, Button, Collapsible, CollapsibleItem, Collection, CollectionItem} from 'react-materialize'
import io from 'socket.io-client';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'

import {changeActivePage,changeActiveShop, changeActiveItem} from '../actions'
import Header from './Header'

const handleShopSelection = (props, shopId) => {
  props.changeActiveShop(shopId)
  props.changeActivePage(1)
}

const handleItemSelection = (props, shopId, item) => {
  props.changeActiveShop(shopId)
  props.changeActiveItem(item)
  props.changeActivePage(2)
}

const Home = (props) => {
  return (<div className='main'>
    <Header/>
    <section className='main-section'>
      <h1 className='main-section-title'>Top Coffeeshops</h1>
      <div className='main-horizontal-scroller'>
        <div className='main-section-list'>
          {
            props.allShops.map(shop => (<div className='main-card' key={shop.id} onClick={event => handleShopSelection(props, shop.id, shop)}>
              <div className='main-card-header' style={{
                  background: `url(${shop.picture})`
                }}></div>
              <div className='main-card-content'>
                <h1 className='main-card-content-title'>{shop.shop_name.split(' ').filter((el, idx) => idx < 3).join(' ')}</h1>
                <h2 className='main-card-content-time'>
                  <i className="fas fa-walking"></i>
                  7 min</h2>
              </div>
            </div>))
          }
        </div>
      </div>
    </section>
    <section className='main-section'>
      <h1 className='main-section-title'>Popular Beverages</h1>
      <div className='main-horizontal-scroller'>
        <div className='main-section-list'>
          {
            props.allItems[0]
              ? props.allItems[0].orderItems.filter(el => el.id < 3).map(item => (<div className='main-card' key={item.product_id} onClick={event => handleItemSelection(props, props.allShops[0], item)}>
                <div className='main-card-header items' style={{
                    background: `url(${item.item_picture})`
                  }}></div>
                <div className='main-card-content'>
                  <h1 className='main-card-content-title'>{item.item_name}</h1>
                  <h2 className='main-card-content-time'>Order at Zeitgeist Coffee</h2>
                </div>
              </div>))
              : null
          }
        </div>
      </div>
    </section>
    <footer className='main-footer'>
      <p className='footer-text'>© 2018 Coffeeshop</p>
    </footer>
  </div>)
}

const mapDispatchToProps = dispatch => bindActionCreators({changeActivePage, changeActiveShop, changeActiveItem}, dispatch)
const mapStateToProps = ({allItems, allShops}) => ({allItems, allShops})
export default connect(mapStateToProps,mapDispatchToProps)(Home)
