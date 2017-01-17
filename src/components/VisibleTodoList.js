import React from 'react';
const { Component } = React;
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TodoList from './TodoList';
import { toggleTodo } from '../actions';
import { getVisibleTodos } from '../reducers';
import { fetchTodos } from '../api';


class VisibleTodoList extends Component {
  componentDidMount() {
    fetchTodos(this.props.filter).then(todos =>
      console.log(this.props.filter, todos)
    );
  }

  componentDidUpdate(prevProps) {
   if (this.props.filter !== prevProps.filter) {
     fetchTodos(this.props.filter).then(todos =>
       console.log(this.props.filter, todos)
     );
   }
 }

  render() {
    return <TodoList {...this.props} />;
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
  { onTodoClick: toggleTodo } /*mapDispatchToProps*/
)(VisibleTodoList));

export default VisibleTodoList;