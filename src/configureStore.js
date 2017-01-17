import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk'
import todoApp from './reducers';


const configureStore = () => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
    // Note: you can supply options to `createLogger()`
  }

  const store = createStore(
    todoApp,
    //persistedState,
    applyMiddleware(...middlewares)
  );

  return store;
}

export default configureStore;