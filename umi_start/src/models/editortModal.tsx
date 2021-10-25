const pointData = localStorage.getItem('userData')||'[]';

function overSave(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  }
  

export default{
    namespace:'editorModal',
    state:{
        pointData:JSON.parse(pointData),
        curPoint:null,
    },
    reducers: {
        addPointData(state, { payload }) {
          let pointData = [...state.pointData, payload];
          overSave('userData', pointData);
          return {
            ...state,
            pointData,
            curPoint: payload,
          };
        }, 
        modPointData(state,{payload}){
          const {id}=payload;
          const pointData = state.pointData.map(item=>{
            if(item.id===id){
              return payload
            }
            return {...item}
          })
          overSave('userData',pointData);
          return {
            ...state,
            pointData,
            curPoint:payload,
          };
        },
        delPointData(state,{payload}){
          const {id} = payload;
          const pointData = state.pointData.filter(item =>item.id!==id)
          overSave('userData',pointData);
          return {
            ...state,
            pointData,
            curpoint:null
          }

        },
        clearAll(state) {
          overSave('userData', []);
          return {
            ...state,
            pointData: [],
            curPoint: null,
          };
        },
      },
    effects:{},
    subscriptions: {
    
      },
}