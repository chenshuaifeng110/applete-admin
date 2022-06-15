import React from 'react';
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import {getStorage} from '@/utils/storage'
const AuthRouter = ({ component: Component, ...rest }) => {
	const isLogged = !!getStorage('userInfo');
	// return <Route {...rest} render={props => (isLogged ? <Component {...props} /> : <Redirect to={'/login'} />)} />;
	return <Route {...rest}>
		{props => isLogged ? <Component {...props}/> : <Redirect to={'/login'} />}
	</Route>
};

export default withRouter(AuthRouter);
