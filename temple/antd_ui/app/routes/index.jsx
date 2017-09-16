import React, { Component } from 'react';
import { Router,Route,browserHistory,IndexRoute} from 'react-router';

import Layout from '../views/Layout';
import Dashboard from '../views/Dashboard';
import Buttons from '../views/Buttons';
import Tables from '../views/Tables';

import Login from '../views/Login';
import Register from '../views/Register';
import Form from '../views/Form';
import Search from '../views/Search';


export default class ARoute extends Component{
  render(){
    return(
      <Router  history={browserHistory} > 

        <Route path="/Dashboard"component={Layout}>     
            <IndexRoute   component={Dashboard} />
            <Route path="/buttons" component={Buttons} />
           
            <Route path="/forms" component={Form} />
            <Route path="/tables" component={Tables} />
            <Route path="/search" component={Search} />
        </Route> 
        <Route path="/register" component={Register} />
        <Route path="*" component={Login} /> 
      </Router>
      )
  }  
}
 