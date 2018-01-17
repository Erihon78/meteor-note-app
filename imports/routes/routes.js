import { Meteor } from 'meteor/meteor';

import React from 'react';
import {Router, Route, Switch, withRouter, Redirect} from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';

import { Link } from 'react-router-dom';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import Login from '../ui/Login';
import NotFound from '../ui/NotFound';

const history = createHistory();
const unauthenticatedPages = ['/', '/registration'];
const authenticatedPages = ['/dashboard'];

export const onAuthChange = (isAuthenticated) => {
	const pathname = history.location.pathname,
		isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
		isAuthenticatedPage = authenticatedPages.includes(pathname);	

	if (isAuthenticated && isUnauthenticatedPage) {		
		history.replace('/dashboard');
	} else if (isAuthenticatedPage && !isAuthenticated) {
		history.replace('/');
	}
}

export const routes = (
	<Router history={history}>	
		<Switch>	
			<Route exact path='/' render={() => (
			  Meteor.userId() ? (
			    <Redirect to="/dashboard"/>
			  ) : (
			    <Login />			   			    				
			  )
			)}/>	
			<Route path='/registration' render={() => (
			  Meteor.userId() ? (
			    <Redirect to="/dashboard"/>
			  ) : (
			    <Signup />
			  )
			)}/>		
			<Route path='/dashboard' render={() => (
				!Meteor.userId() ? (
					<Redirect to="/"/>
				) : (
					<Dashboard  />
				)
			)}/>	
			<Route path='/dashboard/:id' render={() => (
				!Meteor.userId() ? (
					<Redirect to="/"/>
				) : (
					<Dashboard  />
				)
			)}/>			
			<Route path='*' component={NotFound}/>		
		</Switch>		
	</Router>	
);