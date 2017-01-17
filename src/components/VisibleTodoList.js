import React from 'react';
const { Component } = React;
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TodoList from './TodoList';
// Before: import { toggleTodo, receiveTodos } from '../actions';
import * as actions from '../actions' // After
import { getVisibleTodos } from '../reducers';
import { fetchTodos } from '../api';


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
    const { filter, receiveTodos } = this.props;
    fetchTodos(filter).then(todos =>
      receiveTodos(filter, todos)
    );
  }

  render() {
    const { toggleTodo, ...rest } = this.props;
    return (
      <TodoList
        {...rest}
        onTodoClick={toggleTodo}
      />
    )
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
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