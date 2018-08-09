import React from 'react';
import '../css/App.css';
import {SideNav, SideNavItem, Button, Collapsible, CollapsibleItem, Collection, CollectionItem} from 'react-materialize'
import io from 'socket.io-client';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'

import {changeActivePage} from '../actions'
import Login from './Login'
import AuthHeader from './AuthHeader'
import { request, AuthenticationService, withAuthentication } from '../helpers'


const handleRegister = (event,props) => {
  event.preventDefault()
  console.log('hi');
  console.log(event.target);
  const email= event.target.email.value
  const password= event.target.password.value
  const first_name= event.target.firstName.value
  const last_name= event.target.lastName.value
  request('/users','post', {email, password, first_name, last_name})
  .then(response => {
    console.log(response)
    props.changeActivePage(5)
  })
  .catch(error => {
    // this.setState({showErrorMessage: true})
  })

}

const Register = (props) => {
  const {shopId, pickupTime, orderItems} = props.cart
  return (
      <div className='main'>

        <section className='register-section'>
          <AuthHeader/>
          <form className='register-form' id='registration-form' onSubmit={event=>handleRegister(event,props)}>
            <input type="text" name='firstName' className="validate" placeholder='First Name'/>
            <input type="text" name='lastName' className="validate" placeholder='Last Name'/>
            <input type="email" name='email' className="validate" placeholder='Email Address' />
            <input type="password" name='password' className="validate" placeholder='Password' />
          </form>
          <Button waves='light' className='cart-item-order-button' form='registration-form' type='submit'>Register</Button>
      </section>

      </div>
)}

const mapDispatchToProps = dispatch => bindActionCreators({changeActivePage}, dispatch)
const mapStateToProps = ({activePage, cart}) => ({activePage,cart})
export default connect(mapStateToProps,mapDispatchToProps)(Register)
