import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Layout from '@/views/layout/Index';
import Login from '@/views/login/Index';
import AuthRouter from './AuthRouter';
const Router = () => {
	return (
		<HashRouter>
			<Switch>
				<Route exact path="/login" component={Login} />
				<AuthRouter path="/" component={Layout} />
			</Switch>
		</HashRouter>
	);
};

export default Router;
