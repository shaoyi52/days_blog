import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListTodoMemos from '../components/ListTodoMemos';
import {
  deleteTodo,
  changeTodoToDoing
} from '../actions';

class TodoRoute extends Component {
  render(){
    const { dispatch, todolist } = this.props;
    return (
      <div>
          <ListTodoMemos
            todolist={todolist}
            onDel={index=>dispatch(deleteTodo(index))}
            onTodoToDoing={index=>dispatch(changeTodoToDoing(index))}
          />  
      </div>
      )
  }
}

const mapStateToProps = (state) => {
    return { todolist: state.todolist};
};

export default connect(mapStateToProps)(TodoRoute);