import fetch from 'isomorphic-fetch'
export const ADD_NEWS = 'ADD_NEWS'
export const RECEIVE_NEWS = 'RECEIVE_NEWS'


function receiveNews(data){
   return {
        type: RECEIVE_NEWS,       
        data: data       
    }
};

export function fetchNewsList(){
  return  (dispatch)=>{
    return fetch ('http://localhost:3000/api/news/get')
    .then(response=>response.json())
    .then(json=>{
      dispatch(receiveNews(json.data))
      //console.log(json)
    })
  }
}

export function delNewsById(id){
  return (dispatch)=>{
    const content =JSON.stringify({'id': id});
    return fetch ('http://localhost:3000/api/news/delete',{
      method: 'POST',
      headers:{
          "Content-Type": "application/json",
      },
      body: content
    })
    .then(response=>response.json())
    .then(json=>{        
       dispatch(fetchNewsList())
    })
  }
}

/*export const addNews = (newsInof)=>{


  return dispatch => {
    
  }
}*/

