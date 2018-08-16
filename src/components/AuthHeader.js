import React from 'react';
import {SideNav, SideNavItem, Button, Collapsible, CollapsibleItem, Collection, CollectionItem} from 'react-materialize'
import io from 'socket.io-client';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'

import {changeActivePage} from '../actions'

const token = localStorage.getItem('token') || 12345

const AuthHeader = (props) => {
  return (
    <header className='auth-header'>
      <div className='main-header-nav'>
        <SideNav
          trigger={<div className='hamburger-menu grey-text text-darken-2'><i className="fas fa-bars"></i></div>}
          options={{closeOnClick: true}}
        >
          <SideNavItem subheader={true}>Welcome to Coffeeshop</SideNavItem>
          <SideNavItem waves={true} onClick={event=>props.changeActivePage(0)}>Home</SideNavItem>
          <SideNavItem waves={true} onClick={event=>props.changeActivePage(3)}>Cart</SideNavItem>
          <SideNavItem waves={true} href='#!third'>Order History</SideNavItem>
          <SideNavItem waves={true} href='#!third'>Favorite Shops</SideNavItem>
          <SideNavItem waves={true} href='#!third'>Favorite Drinks</SideNavItem>
          <SideNavItem divider={true}/>
          <SideNavItem href='#!icon' waves={true}>Sign In</SideNavItem>
          <SideNavItem href='#!second' waves={true} >New Account</SideNavItem>
        </SideNav>
        <div className='shopping-cart'></div>
      </div>
    </header>
)}

const mapDispatchToProps = dispatch => bindActionCreators({changeActivePage}, dispatch)
const mapStateToProps = ({activePage}) => ({activePage})
export default connect(mapStateToProps, mapDispatchToProps)(AuthHeader)
