import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListDoingMemos from '../components/ListDoingMemos';
import {
  deleteTodo,
  changeDoingToDone,
  changeDoingToToDo
} from '../actions';

class DoingRoute extends Component {
  render(){
    const { dispatch, todolist } = this.props;

    return (
      <div>
        <ListDoingMemos
            todolist={todolist}
            onDel={index=>dispatch(deleteTodo(index))}
            onDoingToToDo={index =>dispatch(changeDoingToToDo(index))}
            onDoingToDone={index=>dispatch(changeDoingToDone(index))}
          /> 
      </div>
      )
  }
}

const mapStateToProps=(state) => {
    return {todolist: state.todolist}
}

export default connect(mapStateToProps)(DoingRoute)