import React from 'react';
const { Component } = React;
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TodoList from './TodoList';
import FetchError from './FetchError';
// Before: import { toggleTodo, receiveTodos } from '../actions';
import * as actions from '../actions' // After
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers';


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
    fetchTodos(filter).then(() => console.log('done!'));
  }

  render() {
    const { isFetching, errorMessage, toggleTodo, todos } = this.props;

    if (errorMessage && !todos.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      );
    }

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
    errorMessage: getErrorMessage(state, filter),
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