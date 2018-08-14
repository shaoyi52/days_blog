const tagsView = {
  state:{
    visitedViews:[],
    cachedViews:[]
  },
  mutations:{
    ADD_VISITED_VIEWS:(state,view)=>{
      if(state.visitedViews.some(v=>v.path==view.path)) return
      state.visitedViews.push(Object.assign({},view,{
        title:view.meta.title || 'no-name'
      }))
      if(!view.meta.noCache){
        state.cachedViews.push(view.name)
      }
    },
    DEL_VISITED_VIEWS:(state,view)=>{
      let viewIndex="";
       state.visitedViews.forEach((item,index)=>{
        if(item.path===view.path){
          viewIndex=index;
        }
       })
       state.visitedViews.splice(viewIndex,1);
    }
  },
  actions:{
    addVisitedView({commit},view){
      commit('ADD_VISITED_VIEWS',view)
    },
    delVisitedView({commit,state},view){
      return new Promise((resolve)=>{
        commit('DEL_VISITED_VIEWS',view)
        resolve([...state.visitedViews])
      })
       
    }
  }
}

export default tagsView