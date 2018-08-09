import React from 'react';
import '../css/App.css';
import {SideNav, SideNavItem, Button, Collapsible, CollapsibleItem, Collection, CollectionItem} from 'react-materialize'
import io from 'socket.io-client';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'

import AuthHeader from './AuthHeader'
import {changeActivePage} from '../actions'
import { request, AuthenticationService, withAuthentication } from '../helpers'


const handleSignIn = (event, props) => {
  event.preventDefault()
  const { inputEmail, inputPassword } = event.target
  request('/auth/token','post', {
    email: inputEmail.value,
    password: inputPassword.value })
  .then(response => {
    // this.setState({ showErrorMessage: false })
    localStorage.setItem('token', response.data.token)
    request('/auth/token')
    .then(response => {
      AuthenticationService.setAuthState(response.data)
      props.changeActivePage(3)
    })
  })
  .catch(error => {
    // this.setState({showErrorMessage: true})
  })
}



const Login = (props) => {
  const {shopId, pickupTime, orderItems} = props.cart
  return (
      <div className='main'>
        <section className='register-section'>
          <AuthHeader/>
          <form className='register-form' id='login-form' onSubmit={event => handleSignIn(event,props)}>
            <input type="email" name='inputEmail' className="validate" placeholder='Email Address'/>
            <input type="password"  name='inputPassword' className="validate" placeholder='Password'/>
            <h1 className='register-link  teal-text' onClick={()=>props.changeActivePage(4)}>Register</h1>
          </form>
          <Button waves='light' className='cart-item-order-button' type="submit" form="login-form" value="Login">Login</Button>
      </section>

      </div>
)}

const mapDispatchToProps = dispatch => bindActionCreators({changeActivePage}, dispatch)
const mapStateToProps = ({activePage, cart}) => ({activePage,cart})
export default connect(mapStateToProps,mapDispatchToProps)(Login)
