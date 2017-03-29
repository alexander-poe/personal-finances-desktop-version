import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import {Provider, connect} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducers from '../reducer'
import App from './components/app'
import * as actions from '../actions/actions'


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
      <App />
    </Provider>, document.getElementById('app')
  )
})


console.log(`Client running in ${process.env.NODE_ENV} mode`);
