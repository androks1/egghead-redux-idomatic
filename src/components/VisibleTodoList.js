import { connect } from 'react-redux';
import TodoList from './TodoList';
import { toggleTodo } from '../actions';

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'completed':
      // Use the `Array.filter()` method
      return todos.filter(
        t => t.completed
      );
    case 'active':
      return todos.filter(
        t => !t.completed
      );
    default:
      return todos;
  }
}

const mapStateToProps = (state) => ({
  todos: getVisibleTodos (
    state.todos,
    state.visibilityFilter
  )
})

const mapDispatchToProps = (dispatch) => ({
  onTodoClick: (id) => {
    dispatch(toggleTodo(id));
  }
});

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;