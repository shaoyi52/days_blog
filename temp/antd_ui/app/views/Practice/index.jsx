import React from 'react'
import { Row, Col,Card,Button, Radio,Icon,Menu,Dropdown} from 'antd'
import { browserHistory } from 'react-router'
import NavPath from '../../components/NavPath'
import './index.less'


class NameForm extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {value: ''};
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({value:event.target.value})
  }
  handleSubmit(event){
    alert("A name was submit: "+this.state.value)
    event.preventDefault()
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Name: 
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="submit"/>
      </form>
      )
  }
}

//textarea 
class EssayForm extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {
      value: 'Please write an essay about your favorite Dom element.'
    };

    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value})
  }

  handleSubmit(event){
    alert('An essay was submited:'+ this.state.value);
    event.preventDefault();
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <textarea value= {this.state.value} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="sumit"/>
      </form>
      )
  }
}

// The select TAG 
class FlavorForm extends React.Component{
  constructor(props) {
    super(props);  
    this.state = {value: 'coconut'};
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }
  handleSubmit(event){
    alert("your favorite flavor is:"+this.state.value);
    event.preventDefault();
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select  value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit"/>
      </form>
      )
  }
}

class Reservation extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isGoing: true,
      numberOfGuests:2
    };
    this.handleInputChange=this.handleInputChange.bind(this);
  }

  handleInputChange(event){
    const target = event.target;
    const value= target.type==='checkbox'?target.checked :target.value;
    const name= target.name;
    console.log(target)
    console.log(name+":"+ value)
    this.setState({[name]: value})
  }
  
  render() {
    return(
      <form>
        <label>
          Is going:
          <input
            name='isGoing'
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}/>
        </label>
        <br/>
        <label>
          Number of guests:
          <input
           name="numberOfGuests"
           type="number"
           value={this.state.numberOfGuests}
           onChange={this.handleInputChange}/>
        </label>
      </form>
      )
  }
}


function WrappedComponent(WrappedComponent){
  return class NewComponent extends React.Component{
      constructor(props) {
        super(props);
      
        this.state = {
          userName:'yuyi'
        };
      }

      render() {
        return <WrappedComponent id={this.props.id} username={this.state.userName}/>
      }
  }
}


function Wrapped(Wrapped){
  return class NewComponent2 extends React.Component{
    constructor(props) {
      super(props);
    
      this.state = {
        id:"123"
      };
    }

    render(){
      return <Wrapped id={this.state.id} />
    }
  }
}

function WrappedTitle(Title){
  return  class HOC extends React.Component{
    render(){
      return( <div>
        
      </div>)
    }
  }
}
 

class Welcome extends React.Component {
  render(){
    return (
      <div> welcome { this.props.username} ,form { this.props.id}</div>
      )
  }  
}



class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const navData=[{kye:1,name:'Demos'},{kye:2,name:'Practice'}]
    let HelloComponent=Wrapped(WrappedComponent(Welcome));
    return (
      <div className="gutter-example button-demo">
        <NavPath data={navData} />
        <Row gutter={16}>
          <Col  className="gutter-row" span={12}>
           {/*<NameForm/>
              <EssayForm/>
            <FlavorForm/>
            <Reservation/>

           */ } 
            <HelloComponent/>
           
          </Col>
        </Row>
      </div>  
    )
  }
}


export default Index