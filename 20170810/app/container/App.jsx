import React, { Component } from 'react';
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import { connect } from 'react-redux';
import { addTodo} from '../actions'
import './App.less';

class App extends Component {

  constructor(props) {
    super(props);  
    this.state = {};
  }

 
  render() { 
      const { dispatch, todolist, addTodos } = this.props;    
        console.log('--todoList--',addTodos)
      return(
        <div>  
          <Header 
              todolist={todolist} 
              onAdd={text => addTodos(text)}
              onSearch={text => dispatch(search(text))}
              onKeyUp={this.props.onKeyUp}  
          />
          <Navigation/>
          {this.props.children}
        </div>
        
      )
  }


}

const mapStateToProps = (state) => {  
    return { todolist: state.todolist };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodos: (text) => {
            dispatch(addTodo(text));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
