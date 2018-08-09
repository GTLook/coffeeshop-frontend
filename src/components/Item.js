import React from 'react';
import '../css/App.css';
import {SideNav, SideNavItem, Button, Collapsible, CollapsibleItem, Collection, CollectionItem} from 'react-materialize'
import io from 'socket.io-client';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import { Swipeable } from 'react-touch';


import {changeActivePage, addToCart,setActiveItemOptions} from '../actions'
import Header from './Header'

const handleAddToCart = (props, item) => {
  props.addToCart(item)
  props.changeActivePage(1)
}

const handleOptionSelect = (props, options) => {
  props.setActiveItemOptions(options)
}

const Item = (props) => {
  const {activeItem} = props
  return (
    <Swipeable onSwipeLeft={()=>props.changeActivePage(1)}>
      <div className='main'>
      <Header/>
      <h2 className='coffeeshop-time'><i className="fas fa-walking"></i> 5 min</h2>
        <section className='coffeeshop-section'>
          <div className='coffeeshop-info'>
              <h1 className='coffeeshop-section-title'>{activeItem.item_name}</h1>
              <h2 className='coffeeshop-section-address'>${parseFloat(activeItem.item_price).toFixed(2)}</h2>
          </div>
          <div className='item-options-item-card-container'>
            <Collapsible accordion defaultActiveKey={null} onSelect={(event) => (console.log(event))} style={{boxShadow: 'none', border: 'none'}} id='asd'>
                <CollapsibleItem header={`Size -  ${activeItem.product_size}`} icon='filter_drama' style={{fontSize: '12px'}} >
                  <Collection>
                    {['8 oz','12 oz', '16 oz'].map(el=>(
                      <CollectionItem active={activeItem.product_size===el} onClick={()=>handleOptionSelect(props,{product_size: el})}>{el}</CollectionItem>
                    ))}
                  </Collection>
                </CollapsibleItem>
              { activeItem.milk_type ?
              <CollapsibleItem header={'Milk - ' + activeItem.product_milk} icon='filter_drama' style={{fontSize: '12px'}}>
                <Collection>
                  {['Skim Milk','2% Milk', 'Whole Milk', 'Almond Milk', 'Soy Milk'].map(el=>(
                    <CollectionItem active={activeItem.product_milk===el} onClick={()=>handleOptionSelect(props,{product_milk: el})}>{el}</CollectionItem>
                  ))}
                </Collection>
              </CollapsibleItem>
              : null
              }
              <CollapsibleItem header={'Espresso - ' + (activeItem.espresso_shots + activeItem.extra_espresso_shots) + ' Shots'} icon='place' style={{fontSize: '12px'}}>
                <Collection>
                  {[0, 1, 2].map(el=>(
                    <CollectionItem active={activeItem.extra_espresso_shots==el} onClick={()=>handleOptionSelect(props,{extra_espresso_shots: el})}>{activeItem.espresso_shots + el} Shots</CollectionItem>
                  ))}
                </Collection>
              </CollapsibleItem>
            </Collapsible>
          </div>
          <Button waves='light' className='item-options-add-button' onClick={event => handleAddToCart(props, activeItem)}>Add to Order</Button>
        </section>
        <footer className='main-footer'>
          <p className='footer-text'>© 2018 Coffeeshop</p>
        </footer>
      </div>
    </Swipeable>

)}

const mapDispatchToProps = dispatch => bindActionCreators({changeActivePage, addToCart, setActiveItemOptions}, dispatch)
const mapStateToProps = ({activeItem}) => ({activeItem})
export default connect(mapStateToProps,mapDispatchToProps)(Item)
