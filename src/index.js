import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as serviceWorker from './serviceWorker';

import { rootReducer } from './redux/reducers/rootReducer';

import App from './App';



const store = createStore(rootReducer, composeWithDevTools(
	applyMiddleware(thunk)
));

const app = (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(
	app,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();