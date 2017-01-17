import React from 'react';
const { Component } = React;
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TodoList from './TodoList';
// Before: import { toggleTodo, receiveTodos } from '../actions';
import * as actions from '../actions' // After
import { getVisibleTodos, getIsFetching } from '../reducers';


class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { isFetching, toggleTodo, todos } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }

    return (
      <TodoList
        todos={todos}
        onTodoClick={toggleTodo}
      />
    )
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    isFetching: getIsFetching(state, filter),
    todos: getVisibleTodos(state, filter),
    filter,
  }
};

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  // Before: { onTodoClick: toggleTodo, receiveTodos }
  actions // After /*mapDispatchToProps*/
)(VisibleTodoList));

export default VisibleTodoList;