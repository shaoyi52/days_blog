import fetch from 'isomorphic-fetch'
export const SELECT_Row= 'SELECT_Row';


export function selectRow(rows){
  return {
        type: SELECT_Row, 
        rows      
    }
}

