import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import todoApp from './reducers';
import AddTodo from './components/AddTodo';
import VisibleTodoList from './components/VisibleTodoList';
import Footer from './components/Footer';

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

const persistedState = {
  todos: [{
    id: 0,
    text: 'Welcome Back!',
    completed: false
  }]
}

const store = createStore(
  todoApp,
  persistedState
)

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);