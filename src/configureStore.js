import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import todoApp from './reducers';


const configureStore = () => {
  const middlewares = [promise];

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