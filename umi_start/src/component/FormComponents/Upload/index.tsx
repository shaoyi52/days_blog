import React from 'react';
import { Upload,Modal,message,Tabs,Result } from 'antd';

class PicturesWall extends React.Component{
    state={
        previewVisible:false,
        previewImage:'',
        wallModalVisible:false,
        previewTitle:'',
        imgBed:{
            photo:[],
            bg:[],
            chahua:[],
        },
        curSelectedImg:'',
        fileList:this.props.fileList||[]
    };

    handleCancel=()=>this.setState({previewVisible:false})
    handleModalCancel=()=>this.setState({wallModalVisible:false})
    handlePreview = async(file)=>{
        if(!file.url&&!file.preview){
            file.preview = await getBase64(file.originFileObj!);
        }

        this.setState({
            previewImage:file.url||file.preview,
            previewVisible:true,
            previewTitle:file.name||file.url!.subString(file.url!.lastIndexOf('/')+1)
        })
    }

    handleWallSelect=(url)=>{
        this.setState({
            wallSelectedImg:url
        })
    }

    handleImgSelected = (url)=>{
        this.setState({
            curSelectedImg:url
        })
    }

    handleWallShow = () =>{
        this.setState({
            wallModalVisible:true
        })
    }

    handleModalOk = () =>{
        const fileList=[{
            uid:uuid(8,16),
            name:'h5图片库',
            status:'done',
            url:this.state.curSelectedImg
        }];
        this.props.onChange && this.props.onChange(fileList);
        this.setState({fileList,walModalVisible:false});
    }

    handleChange = ({file,fileList})=>{
        this.setState({fileList});
        if(file.status==='done'){
            const files=fileList.map(item=>{
                const {uid,name,status} = item;
                const url = item.url||item.response.result.url;
                return {uid,name,status,url}
            })
            this.props.onChange && this.props.onChange(files);
        }
    }

    handleBeforeUpload = (file)=>{
        const isJpgOrPng=['image/jpge','image/png','image/jpg'].includes(file.type);
        if(isJpgOrPng){
            message.error('只能上传格式为jpeg/png/gif的图片')
        }
        const isLt2M=file.size/1024/1024<2;
        if(isLt2M){
            message.error('图片必须小于2MB!')
        }
        return isJpgOrPng && isLt2M
    }

    render(){
        const {
            previewVisible,
            previewImage,
            fileList,
            previewTitle,
            wallModalVisible,
            imgBed,
            curSelectedImg
        } = this.state;

        const {
            action=isDev?'http://192.168.1.8:3000/api/v0/files/upload/free' : '你的服务器地址',
            headers,
            withCredentials = true,
            maxLen = 1,
            cropRate=375/158,
            isCrop,
        }=this.props;

        const uploadButton=(<div>
            <PlusOutLined/>
            <div className='ant-upload-text'>上传</div>
        </div>)
        const cates = Object.keys(imgBed);

        return (
            <>
                {
                    isCrop?(
                        <ImgCrop
                            modalTitle='裁剪图片'
                            modalOk='确定'
                            modalCancel='取消'
                            rotate={true}
                            aspect={cropRate}
                            >
                                <Upload
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                    name='file'
                                    listType='pictur-card'
                                    calssName={style.avatarUploader}
                                    action={action}
                                    withCredentials={withCredentials}
                                    headers={{
                                        'x-requested-with':localStorage.getItem('user')||'',
                                        authorization:localStorage.getItem('token')||'',
                                        ...headers,
                                    }}
                                >{fileList.length>=maxLen?null:uploadButton}</Upload>
                            </ImgCrop>
                    ):(<Upload
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        name='file'
                        listType='pictur-card'
                        calssName={style.avatarUploader}
                        action={action}
                        withCredentials={withCredentials}
                        headers={{
                            'x-requested-with':localStorage.getItem('user')||'',
                            authorization:localStorage.getItem('token')||'',
                            ...headers,
                        }}
                    >{fileList.length>=maxLen?null:uploadButton}</Upload>)
                }
                <Modal 
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt='预览图片' style={{width:'100%'}} src={previewImage}/>
                </Modal>
                <Modal
                    visible={wallModalVisible}
                    title="图片库"
                    okText='确定'
                    cancelText='取消'
                    width='860'
                    onCancel={this.handleModalCancel}
                    onOk={this.handleModalOk}
                >
                    <Tabs defaultActiveKey={cates[0]} tabPosition='left' style={{height:520}}>
                        {cates.map((item,i)=>{
                            return (
                                <TabPane tap={wallCateName[item]} key={item}>
                                    <div className={styles.imgBox}>
                                        {imgBed[item]&&
                                        imgBed[item].map((item,i)=>{
                                            return (
                                                <div
                                                  className={classnames(
                                                    styles.imgItem,
                                                    curSelectedImg === item ? styles.seleted : '',
                                                  )}
                                                  key={i}
                                                  onClick={() => this.handleImgSelected(item)}
                                                >
                                                  <img src={item} alt="趣谈前端-h5-dooring" />
                                                  <span className={styles.iconBtn}>
                                                    <CheckCircleFilled />
                                                  </span>
                                                </div>
                                              );
                                        })}
                                    </div>
                                </TabPane>
                            )
                        })}
                    </Tabs>

                </Modal>
            </>
        )

    }

}