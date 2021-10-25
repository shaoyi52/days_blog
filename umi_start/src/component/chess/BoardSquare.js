import {useDrop} from 'react-dnd'
import Square from './Square'
import {ItemTypes} from './Constants'
import {moveKnight,canMoveKnight} from './Game'
function Overlay({color}){
    return <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: 1,
      opacity: 0.5,
      backgroundColor:color
    }}
  />

}
export default function BoardSquare({x,y,children}){
    const black=(x+y)%2===1;
    const [{canDrop,isOver}, drop] = useDrop(
        () => ({
          accept: ItemTypes.KNIGHT,
          canDrop:() =>canMoveKnight(x, y),
          drop: () => moveKnight(x, y),          
          collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
          }),
        }),
        [x, y]
      );
    
    return (<div
    ref={drop}
    style={{
      position: 'relative',
      width: '100%',
      height: '100%',
    }}
  ><Square  black={black}>{children}</Square>
  {isOver && !canDrop && <Overlay color="red" />}
  {!isOver && canDrop && <Overlay color="yellow" />}
  {isOver && canDrop && <Overlay color="green" />}</div>)
}