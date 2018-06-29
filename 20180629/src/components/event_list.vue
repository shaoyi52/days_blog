<template>
  <div class="event-content">
    <div class="event-tab" @click="changeCollapse(0,$event)">未完成
      <span :class="{'close-span':!collapse[0].show}"></span>
    </div>
    <div class="event-box" :style="{height:'auto','display':'block'}">
      <ul>
         <li class="event-list" v-for="value in getToDo" :key="value.id">
           <input type="checkbox"  @click="moveToDone(value.id)">
           <div>{{value.content}}</div>
           <button class="cancel-btn" @click="moveCancel(value.id)">取消</button>
         </li>
      </ul>      
    </div>
    <div class="event-tab" @click="changeCollapse(1,$event)">已完成
      <span :class="{'close-span':!collapse[1].show}"></span>
    </div>
    <div class="event-box" :style="{height:'auto','display':'block'}">
      <ul>
         <li class="event-list" v-for="value in getDone" :key="value.id">
           <input type="checkbox"  @click="moveToDo(value.id)">
           <div>{{value.content}}</div>
           <span class="event-time">{{value.time}}</span>
         </li>
      </ul>      
    </div>
    <div class="event-tab" @click="changeCollapse(2,$event)">已取消
      <span :class="{'close-span':!collapse[2].show}"></span>
    </div>
    <div class="event-box" :style="{height:'auto','display':'block'}">
      <ul>
         <li class="event-list" v-for="value in getCancel" :key="value.id">          
           <div>{{value.content}}</div>
           <button class="cancel-btn" @click="moveToDo(value.id)">取消</button>
         </li>
      </ul>      
    </div>

  </div>
</template>
<script type="text/javascript">
  export default{
    data() {
      return {
         collapse:[
            {
                show: true,
            },
            {
                show: true,
            },
            {
                show: true,
            }
        ],
      }
    },

    computed:{
      getToDo(){
        return this.$store.getters.getToDo
      },
      getDone(){
        return this.$store.getters.getDone
      },
      getCancel(){
        return this.$store.getters.getCancel
      }
    },
    methods: {
      changeCollapse(num,event){
        const show = this.collapse[num].show;
        if(show){
          this.closeCollapse(event)
        }else{
          this.openCollapse(event)
        }
        this.collapse[num].show = !show;
      },
      openCollapse(event){
        let ulElement = event.currentTarget.nextElementSibling,
                    children = ulElement.getElementsByTagName('ul')[0];
                ulElement.style.display = 'block';
                ulElement.style.height = children.offsetHeight + 'px';
                setTimeout(function () {
                    ulElement.style.height = 'auto';
                }, 300)
          
      },
      closeCollapse(event){
        let ulElement = event.currentTarget.nextElementSibling,
            children=ulElement.getElementsByTagName('ul')[0];
             ulElement.style.height = children.offsetHeight + 'px';
                setTimeout(function(){
                    ulElement.style.height = '0px';
                    setTimeout(function () {
                        ulElement.style.display = 'none';
                    }, 300)
                },10)
      },
      moveToDone(id){
        this.$store.dispatch('eventdone',id);
      },
      moveCancel(id){
        this.$store.dispatch('eventcancel',id);
      },
      moveToDo(id){
        this.$store.dispatch('eventtodo',id);
      }
    }

  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .event-content{
    .event-tab{
      position:relative;
      height:44px;
      line-height:44px;
      padding-left:20px;
      border-bottom:1px solid #fff;
      box-sizing:border-box;
      color:#fff;
      cursor:pointer;
      background:#00b0f0;
      span{
        position:absolute;
        right:20px;
        top:15px;
        width:10px;
        height:10px;
        content:'';
        border:{
          top:2px solid #fff;
          right:2px solid #fff;
        }
        transform:rotate(135deg);
        transition: transform .3s;
        &.close-span{
          transform:rotate(45deg)
        }
      }
    }
    .event-box{
      text-align:left;
        ul{
          padding:0;
          margin:0;
           list-style:none;
           overflow:hidden;
        }
       
        border:{
          left:1px solid #eee;
          right:1px solid #eee;
        }
        transition:height .3s;
        .event-list{
          position:relative;
          min-height:44px;
          line-height:25px;
          padding: 10px 100px 10px 50px;
          box-sizing:border-box;
          border-bottom:1px solid #eee;
          color:#373e40;
          input[type=checkbox]{
            position:absolute;
            left:15px;
            top:12px;
            width:20px;
            height:20px;
          }

          .cancel-btn{
            position:absolute;
            right:10px;
            top:7px;
            width:50px;
            height:30px;
            line-height:30px;
            padding:0;
            background:#fff;
            border:1px solid #coccda;
            color:#666;
            font-size:12px;
          }
         .event-time {
                  position: absolute;
                  right: 10px;
                  top: 0;
                  line-height: 44px;
                  font-size: 12px;
                  color: #aaa;
              }
        }
    }
  }
</style>
