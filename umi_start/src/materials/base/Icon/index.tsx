import React,{memo} from 'react';
import * as Icon from '@ant-design/icons';
import logo from '@/assets/icon_01.png'
const XIcon =memo(props=>{
    const {color,size,link,text,fontSize,fontColor,type,spin,isTpl} = props;

    const MyIcon=Icon[type]
    
    const  handleClick=()=>{
        if(!link||window.location.href.indexOf('/editor')>-1)return ;
        window.location.href=link;
    }
    return isTpl? (
        <div><img style={{width:'100%'}} src={logo} alt=""/></div>
    ):(
        <div
            style={{
                display:'flex',
                width:'100%',
                height:'100%',
                justifyContent:'center',
                flexDirection:'column',
                alignItems:'center',
            }}
        >
            <MyIcon twoToneColor={color} style={{fontSize:size}} spin={spin} onClick={handleClick} />
            <div style={{fontSize,color:fontColor,paddingTop:'6px'}}>{text}</div>
        </div>
    )
})

export default XIcon;