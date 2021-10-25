import {useState,useEffect,useMemo} from "react";
import { useDrop } from 'react-dnd';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import {connect} from 'umi'
import {uuid} from '@/utils/tool';
import ViewRender from './renderer/viewRender'
import { react } from '@babel/types';
const TargetBox =(props)=>{
    const {canvasId,dispatch,pstate,dragState,setDragState, cstate}=props;  
    const [canvasRect, setCanvasRect] = useState<number[]>([]);
    let pointData= pstate?pstate.pointData : []
    const cpointData = cstate ? cstate.pointData : [];
    const [{isOver},drop]=useDrop({
        accept:'component',
        drop:(item,monitor)=>{
            let parentDiv= document.getElementById(canvasId),
                pointRect = parentDiv!.getBoundingClientRect(),
                top=pointRect.top,
                pointEnd=monitor.getSourceClientOffset(),
                y = pointEnd!.y < top ? 0 : pointEnd!.y - top,
                col = 24, // 网格列数
                cellHeight = 2,
                w = item.type === 'Icon' ? 3 : col;
            // 转换成网格规则的坐标和大小
            let gridY = Math.ceil(y / cellHeight);
            console.log(item,props)
            dispatch({
                type: 'editorModal/addPointData',
                payload: {
                  id:uuid(6, 10),
                  item,
                  point: { i: `x-${pointData.length}`, x: 0, y: gridY, w, h: item.h, isBounded: true },
                  status: 'inToCanvas',
                },
              })
           
        },
        collect:monitor=>({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            item: monitor.getItem(),
        })
    }) 
    const dragStop: ItemCallback = useMemo(() => {
        return (layout, oldItem, newItem, placeholder, e, element) => {
          const curPointData = pointData.filter(item => item.id === newItem.i)[0];
          console.log('dragStop')
          dispatch({
            type: 'editorModal/modPointData',
            payload: { ...curPointData, point: newItem, status: 'inToCanvas' },
          });
        };
      }, [cpointData, dispatch, pointData]);

      const onDragStart: ItemCallback = useMemo(() => {
        return (layout, oldItem, newItem, placeholder, e, element) => {
          const curPointData = pointData.filter(item => item.id === newItem.i)[0];

          dispatch({
            type: 'editorModal/modPointData',
            payload: { ...curPointData, status: 'inToCanvas' },
          });
        };
      }, [dispatch, pointData]);
    
      const onResizeStop: ItemCallback = useMemo(() => {
        return (layout, oldItem, newItem, placeholder, e, element) => {
          const curPointData = pointData.filter(item => item.id === newItem.i)[0];

          dispatch({
            type: 'editorModal/modPointData',
            payload: { ...curPointData, point: newItem, status: 'inToCanvas' },
          });
        };
      }, [dispatch, pointData]);
    
    useEffect(() => {
        let { width, height } = document.getElementById(canvasId)!.getBoundingClientRect();
        setCanvasRect([width, height]);
      }, [canvasId]);
    
    return <Draggable
    position={dragState}
    handle=".js_box"
    onStop={(e: DraggableEvent, data: DraggableData) => {
      setDragState({ x: data.x, y: data.y });
    }}
  ><div id={canvasId} ref={drop} className="canvasBox">
    {pointData.length > 0 ? (
                  <ViewRender
                    pointData={pointData}
                    width={canvasRect[0] || 0}
                    dragStop={dragStop}
                    onDragStart={onDragStart}
                    onResizeStop={onResizeStop}
                  />
                ) : null}
     </div></Draggable>
}

export default connect((state)=>{return {pstate:state.editorModal,cstate: {}}})(TargetBox);