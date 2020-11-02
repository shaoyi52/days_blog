import React from 'react'
import { 
    Button,
    message,
    Modal,
    Table, Icon
} from 'antd'
import fetchJsonp from 'fetch-jsonp'
import './index.less'
import SearchBar from '../../components/SearchBar'
import NavPath from '../../components/NavPath'
import classNames from 'classnames';
import omit from 'omit.js';


var  musicKindList=[{
                value: 0,
                mean: "日本"
            },{
                value: 1,
                mean: '韩国'
            }]

class Music extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        songsList:[]
      };
    }
  

    //获取歌曲数据
    fetchTableData=(typeId,searchFields) =>{
        fetchJsonp(`http://tingapi.ting.baidu.com/v1/restserver/ting?xml&calback=&from=webapp_music&method=baidu.ting.billboard.billList&type=${typeId}&size=100&offset=0`,{
            method: 'Get'
        })
        .then(res=> res.json())
        .then(json=>{
            let songList=json.song_list;
            let song_list=[];
          for(var  i=0,ilen=songList.length;  i<ilen; i++){
            
                song_list.push({
                    key: i+1,
                    title: songList[i].title,
                    author: songList[i].author,
                    country: songList[i].country,
                    language: songList[i].language,
                    publishtime: songList[i].publishtime
                })
                
            }

            this.setState({
              songsList:song_list  
            })

            console.log(song_list)
        })
    }

    onSearch = (searchFields) => {
        console.log('searchFields',searchFields)
    }
    
    searchFields = () => {
        return [{
            key: 'title',
            title: '歌曲名',
            // render: (text, record) => {
            // }
        },{
            key: 'author',
            title: '歌手',
        },{
            title: '发行国家',
            key: 'country',
            type: 'select',
            defaultValue: '全部',
            items: () => musicKindList.map(ele => ({
                value: ele.value,
                mean: ele.mean
            })), 
        },{
            title: '发行时间段',
            key: ['start', 'end'],
            type: 'rangePicker',    
            width:'300'
        }]
    }

    componentDidMount(){
        this.fetchTableData(1,"types");
    }

    render () {
        const columns = [{
            title: 'title',
            dataIndex: 'title',
            key: 'title',
            render: text => <a>{text}</a>,
        }, {
            title: 'author',
            dataIndex: 'author',
            key: 'author',
        }, {
            title: 'country',
            dataIndex: 'country',
            key: 'country',
        }, {
            title: 'language',
            dataIndex: 'language',
            key: 'language',
        }, {
            title: 'publishtime',
            dataIndex: 'publishtime',
            key: 'publishtime'
        }];

        const navData=[{kye:1,name:'音乐模块'},{kye:2,name:'音乐列表'}]

        return(
            <div style={{background:'#fff'}}>
                <NavPath data={navData} />
                <SearchBar onSubmit={this.onSearch} fields={this.searchFields()}/>
                <Table columns={columns} dataSource={this.state.songsList} />
            </div>

            )
    }
}



export default Music