import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
import {isAdminLogin} from '../Auth';


const AdminPrivate = ({component: Component, ...rest}) =>(
    <Route {...rest} render={props =>(isAdminLogin() ? <Component {...props}/> : <Redirect to="/" />)} />
)

export default  AdminPrivate;


