import React from 'react';
import{SketchPicker,ColorResult} from 'react-color';
import {rgba2Obj} from "@util/tool";
class colorPicker extends React.Component{
    state={
        displayColorPicker:false,
        color:rgba2Obj(this.props.value)
    }
    handleClick=()=>{
        this.setState({displayColorPicker:!this.state.displayColorPicker})
    }

    handleClose=()=>{
        this.setState({displayColorPicker:false});
    }

    handleChange = (color)=>{
        this.setState({color:color.rgb});
        this.props.onChange && this.props.onChange(`rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b})`)
    }
    render(){
        return (
            <div>
                <div
                style={{
                    background:'#fff',
                    borderRadius:'1px',
                    boxShadow:'0 0 0 1px rgba(0,0,0,.1)',
                    display:'inline-block',
                    cursor:'pointer',
                }}
                onClick = {this.handleClick}
                >
                    {this.state.displayColorPicker?(
                        <React.Fragment>
                            <div 
                            style={{
                                position:'absolute',
                                zIndex:2000,
                            }}>
                                <SketchPicker color={this.state.color} onChange={this.handleChange}/>
                            </div>
                            <div style={{
                                position:'fixed',
                                top:'0px',
                                right:'0px',
                                bottom:'0px',
                                left:'0px',
                                zIndex:1000,
                            }}
                             onClick={this.handleClose}
                            />
                        </React.Fragment>
                    ):null}
                </div>
            </div>
        )
    }
}

export default colorPicker;