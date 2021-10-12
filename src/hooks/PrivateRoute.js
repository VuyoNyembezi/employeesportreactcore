import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
import {isLogin} from '../Auth';

const PrivateRoute = ({component: Component,...rest}) =>(
    //show components only when user is logged in

    <Route {...rest} render={props =>(isLogin() ? <Component {...props}/> : <Redirect to="/" />)} />
   
)


export default PrivateRoute 


