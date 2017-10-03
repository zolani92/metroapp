import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';

const store = createStore(
  combineReducers(reducers),
  {},
  applyMiddleware(ReduxThunk)
);

ReactDOM.render(<Provider store={ store }>
            		<App/>
        		</Provider>, document.getElementById('root'));
registerServiceWorker();