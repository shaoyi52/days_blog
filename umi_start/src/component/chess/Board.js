import BoardSquare from './BoardSquare.js'
import Kinght from './Knight'
import {canMoveKnight,moveKnight} from './Game'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function handleSquareClick(toX,toY){
    if(canMoveKnight(toX,toY)){
        moveKnight(toX,toY)
    }    
}
function renderPiece(x,y,[knightX,knightY]){
    if(knightX==x&&knightY==y){
        return <Kinght/>
    }
    
}
function renderSquare(i,knightPosition){
    const x=i%8
    const y=Math.floor(i/8)
   
    return <div onClick={()=>{handleSquareClick(x,y)}} key={i} style={{width:'12.5%',height:'12.5%'}}><BoardSquare x={x} y={y}>{renderPiece(x,y,knightPosition)}</BoardSquare></div>
}

export default function Board({knightPosition}){
    const squares=[];
    for(let i=0;i<64;i++){
        squares.push(renderSquare(i,knightPosition))
    }
    return (
        <DndProvider backend={HTML5Backend}><div style={{width:'100%',height:'100%',display: 'flex',
        flexWrap: 'wrap'}}>
            {squares}           
        </div></DndProvider>
    )
}