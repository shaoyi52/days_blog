import * as React from 'react';

export default (WrappedComponent) => {
  class NewComponent extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
          username: ''
      };
    }

    componentWillMount(){
       let username = localStorage.getItem('username');
       this.setState({
          username: username
       })
    }

    render() {
      return <WrappedComponent username= {this.state.username}/>
    }

  }

  return NewComponent
}