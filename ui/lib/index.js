import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './Reducers';
import App from './Containers/App';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
)(createStore);

let store = createStoreWithMiddleware(rootReducer);

let rootElement = document.getElementById('root');

ReactDOM.render(
    (
        <Provider store={store}>
            <App />
        </Provider>
    ),
    rootElement
);
