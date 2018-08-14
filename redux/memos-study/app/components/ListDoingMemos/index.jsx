import React, { Component } from 'react' ;
import { Collapse, Row, Col, Icon, Button } from 'antd';
//import PropTypes from 'prop-types';
/*
 * @class ListTodoMemos '新建事项'组件    
*/
class ListDoingMemos extends Component{
    constructor(props) {
      super(props);
      this.handleToDone = this.handleToDone.bind(this);
      this.handleToDo=this.handleToDo.bind(this);
      this.handleDel = this.handleDel.bind(this);

    }
    /*
     * @method handleDel 删除事项
     */
    handleDel(e) {
        const delindex = e.target.getAttribute('data-key');
        this.props.onDel(delindex);
    } 
    /*
     * @method handleToDoing 改变状态doing->done
     */
    handleToDone(e) {
      const changeIndex = e.target.getAttribute('data-key');
      this.props.onDoingToDone(changeIndex);
    }

    /*
     * @method handleToDo改变状态doing ->todo
     */
    handleToDo(e) {
      const changeIndex = e.target.getAttribute('data-key');
      console.log("changeIndex",changeIndex);
      this.props.onDoingToTodo(changeIndex);
    }




    render() {
        let number = 0;
        this.props.todolist.map((item) =>{
            if(item.doing) {
              number +=1
            }
            return true;
        });

        const collapseStyle = {
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
        };

        const Panel =Collapse.Panel;
        return (
            <main>
                <Collapse style={collapseStyle}>
                    <Panel header={
                      <Row>
                        <Col span={22}>
                          <h3>正在进行</h3>
                        </Col>
                        <Col>
                          <Button
                            size="small"
                            shape="circle"
                          >{number}</Button>
                        </Col>
                      </Row>
                    }>
                      <ul>
                          {this.props.todolist.map((item,i) =>{
                            if(item.doing) {
                              return(
                                <li
                                    key={i}
                                    style={{
                                      opacity: item.istodo
                                      ? '0.7'
                                      :'',
                                    }}
                                ><Row>
                                    <Col span={3}>
                                        <input
                                          type="checkbox"
                                          checked={item.doing}
                                          onChange={this.handleToDo}
                                          data-key={i}
                                        />
                                    </Col>
                                    <Col span={20}>
                                      <p  
                                      data-key={i}
                                      onClick={this.handleToDone}
                                      >{item.todo}</p>
                                    </Col>
                                    <Col span={1}>
                                      <Icon
                                        type="close-circle"
                                        data-key={i}
                                        style={{
                                          fontSize: '20px'
                                        }}
                                        onClick={this.handleDel}
                                      />
                                    </Col>
                                 </Row>
                                </li>
                                )
                            }
                            return true;

                          })
                        }
                      </ul>
                    </Panel>
                </Collapse>
            </main>
          )
    }
}
/*ListTodoMemos.propTypes = {
  onTodoToDoing: Proptypes.func.isRequired,
  onDel: PropTypes.func.isRequired,
}*/
export default ListDoingMemos;