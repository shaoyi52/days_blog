let knightPosition=null;
let observer=null
function emitChange(){
    observer(knightPosition)
}
export function observe(o,initKnightPosition){
    if(observer){
        throw new Error('Multiple observers not implemented.')
    }
    observer=o;
    knightPosition=initKnightPosition;
}

export function canMoveKnight(toX,toY){
    const [x,y]=knightPosition;
    const dx=toX-x;
    const dy=toY-y;
    return ((Math.abs(dx)===2&&Math.abs(dy)===1)||
    (Math.abs(dx)===1&&Math.abs(dy)===2))
}

export function moveKnight(toX,toY){
    knightPosition = [toX, toY]
    emitChange()
}