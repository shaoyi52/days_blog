
import React from 'react';
import { Table, Icon } from 'antd';
import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux';
import {fetchNewsList,delNewsById} from '../../actions'


var data = [];

      

class BasicTable  extends React.Component {
  state = {
    columns: [],
    data:[]
  };
  handleEdit(id){
    this.props.dispatch(delNewsById(id))
    console.log(id);
  }

  componentWillMount(){
    const {dispatch,newslist} = this.props;
    let _this=this;
    dispatch(fetchNewsList())
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
              <a >编辑</a>
              <span className="ant-divider" />
              <a onClick={()=>this.handleEdit(record._id)}>删除</a>
              
            </span>
            ),
        }]
    })

  }
  componentWillReceiveProps(nextProps){
    let _this=this;
    if(this.props.newslist!=nextProps.newslist){
      this.setState({
                data:nextProps.newslist
             })
    }
    console.log(_this.props.newslist);
    console.log(nextProps.newslist);

    console.log("nextProps")
    //dispatch(fetchPostsIfNeeded(fetchNewsList))
  }

  render(){
    return(
        <Table columns={this.state.columns} dataSource={this.state.data} />
        )
  } 
    
};

const mapStateToProps = (state) => {
    return { newslist: state.newslist };
};

export default connect(mapStateToProps)(BasicTable);
 