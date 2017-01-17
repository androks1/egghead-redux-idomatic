import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';

const visibilityFilter = (
    state = 'all',
    action
) => {
    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
        return action.filter;
      default:
        return state;
    }
};

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

export default todoApp;

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);