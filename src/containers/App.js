/*global localStorage */
import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { configureStore } from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';
import Main from './Main';
import 'bootstrap/dist/css/bootstrap.css';
import 'assets/scss/paper-dashboard.scss?v=1.3.0';
import 'assets/demo/demo.css';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

const store = configureStore();
var hist = createBrowserHistory();

if (localStorage.jwtToken) {
	setAuthorizationToken(localStorage.jwtToken);
	try {
		store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
	} catch (e) {
		store.dispatch(setCurrentUser({}));
	}
}

const App = () => (
	<>
		<Provider store={store}>
			<Router history={hist}>
				<Main />
			</Router>
		</Provider>
	</>
);
export default App;
