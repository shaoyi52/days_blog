import React, { useState, useEffect } from 'react';
import Board from '../component/chess/Board.js';
import { observe } from '../component/chess/Game.js'
import './index.less';
export default function IndexPage() {
  const [knightPosition, setknightPosition] = useState([4,7]);
  useEffect(()=>{
    observe(setknightPosition,knightPosition)
  },[1])
  
  return (
    <>
      <h1 className="title">Page index2</h1>
      <Board knightPosition={knightPosition}/>   
    </>
  );
}
