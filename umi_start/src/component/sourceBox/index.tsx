import React,{FC} from 'react';
import {useDrag} from 'react-dnd';

const SourceBox:FC<SourceBox.Props> = (props)=>{
    const {
        componentName,
        type,
        children,
        id,
        width
    } =props

    const [{ opacity},drag] = useDrag({
        item:{
            id,
            type,
            componentName
        }
    })
    
}