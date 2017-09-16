
import React from 'react';
import { Table, Icon,message } from 'antd';
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux';
//import {fetchNewsList,delNewsById} from '../../actions'
import {openFormModal,selectRow,delNewsById,readRow,readList} from '../../actions/rowFormModal'

import RowFormModal from './ModalForm'
var data = [];

      

class BasicTable  extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
      columns: [],
      data:[]
      };
    

  }
 

  // 更新行  
  update(){
    let _this=this;
    //console.log(_this.props.rowFormModal)
     const {selectedRowId }= this.props.rowFormModal
    if (!selectedRowId) {
      message.warn('请选择需要更新的行')
      return
    }

    // 读取行内容，读取成功则打开模态框，反之不打开
    this.props.dispatch(readRow())
  }

  handleEdit(id){    
    this.props.dispatch(openFormModal())
  }

  handleDel(id){
    this.props.dispatch(delNewsById(id))
    console.log(id);
  }


  componentWillMount(){
    const {dispatch} = this.props;
    let _this=this;
    dispatch(readList())
    this.setState({
        columns:[{
            title: 'title',
            dataIndex: 'title',
            key: 'title',
            render: text => <a>{text}</a>,
        }, {
            title: 'content',
            dataIndex: 'content',
            key: 'content',
        }, {
            title: 'author',
            dataIndex: 'author',
            key: 'author',
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
            <span>
              <a onClick={()=>this.update(record._id)}>编辑</a>
              <span className="ant-divider" />
              <a onClick={()=>this.handleDel(record._id)}>删除</a>
            </span>
            ),
        }]
    })

  }
  componentWillReceiveProps(nextProps){
    let _this=this;
  
    if(this.props.dataSource!=nextProps.dataSource){
      this.setState({
                data:nextProps.dataSource
             })
      console.log(_this.state);
    }
    
    //dispatch(fetchPostsIfNeeded(fetchNewsList))
  }

  componentDidMount(){
     let _this=this;
  }

 

  render(){
    const {dispatch }= this.props;

     // 单击行时修改 selectedRowKeys，从而选中该行
    const rowSelection = {
      type: 'radio',
      /*onChange: (selectedRow) => {
        console.log("selectedRowKeys",selectedRow);
        //dispatch(selectRow(selectedRowKeys[0]))      
      },*/
      onSelect:(record,selected,selectedRows)=>{
        console.log(selectedRows);
        dispatch(selectRow(selectedRows[0]._id))
      }
    }

    return(
        <div>
          <Table  rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data} />
          <RowFormModal/>
        </div>  
        )
  } 
    
};

const mapStateToProps = (state) => {
    return { 
      rowFormModal:state.rowFormModal,
      dataSource:state.rowFormModal.dataSource
     };
};

export default connect(mapStateToProps)(BasicTable);
 