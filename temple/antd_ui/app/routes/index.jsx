import React, { Component } from 'react';
import { Router,Route,browserHistory,IndexRoute} from 'react-router';

import Layout from '../views/Layout';
import Dashboard from '../views/Dashboard';
import Buttons from '../views/Buttons';

import Login from '../views/Login';
import Register from '../views/Register';
import Form from '../views/Form';



export default class ARoute extends Component{
  render(){
    return(
      <Router  history={browserHistory} >        
        <Route path="/"component={Layout}>     
            <IndexRoute   component={Dashboard} />
            <Route path="/buttons" component={Buttons} />
            <Route path="/register" component={Register} />
            <Route path="/Login" component={Login} />
            <Route path="/form" component={Form} />
        </Route>      
      </Router>

      )
  }  
}
 