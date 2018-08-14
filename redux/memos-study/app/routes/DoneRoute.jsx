import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListDoneMemos from '../components/ListDoneMemos';
import {
  deleteTodo,
} from '../actions';

class DoneRoute extends Component {
  render(){
    const { dispatch, todolist } = this.props;
        console.log('--sdfsdfs--',todolist)

    return (
      <div>
        <ListDoneMemos 
          todolist={todolist}
          onDel={index=>dispatch(deleteTodo(index))}
        />
      </div>
      )
  }
}

const mapStateToProps=(state) => {
  return {todolist:state.todolist}
}

export default connect(mapStateToProps)(DoneRoute)