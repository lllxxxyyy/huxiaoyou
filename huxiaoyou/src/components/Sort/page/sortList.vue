<!-- 分类列表 -->
<template>
  <div class="sortListWrap">
      <div class="sortList">
          <div class="sortList_left">
              <ul>
                    <li v-for="(item,index) in 15" :key="index" :class="idx==index?'sortListColor':''" @click="sortTitleList(index)">
                      天使杨宣
                    </li>
                  

              </ul>
          </div>
          <div class="sortList_right">
              <ul>
                  <li >
                      <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
                  <li>
                          <img src="" alt="">
                      <span>赛事合作</span>
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        idx:0
    };
  },

//   components: {},

//   computed: {},

//   mounted: {},

  methods: {
      sortTitleList(index){
          this.idx=index
      }
  }
}

</script>
<style scoped lang='stylus'>
.sortList{
    width:100%;
    height:100%;
    display:flex;
    
}

.sortList_left{
    width:2.551rem;
    height:100%;
    background :pink;
    overflow :hidden;
    >ul{
        width:100%;
        height:100%;
        overflow-y:scroll;
        >li{
            width:100%;
            height:1.324rem;
            background :#f9f7fa;
            font-size:0.347rem;
            text-align :center;
            line-height :1.324rem;
        }
        >.sortListColor{
            color:#d55856;
            background :#fdfffe;
            position :relative;
            &:before{
                content :'';
                width:0.062rem;
                height:100%;
                background:#f55148;
                position :absolute;
                top:0;
                left:0;
            }

        }
    }
}
.sortList_right{
    flex:1;
    height:100%;
    background :skyblue;
    overflow :hidden;
    overflow-y:scroll;
    >ul{
        display :flex;
        flex-wrap:wrap;
        justify-content :space-between;
        padding:0.27rem;
        
        li{
            width:33.333%;
            display:flex;
            align-items :center;
            flex-direction :column;
            margin-top:0.27rem;
            >img{
                width:1.173rem;
                height:1.173rem;
                background :pink;
            }
            >span{
                font-size:0.32rem;
                color:#3d3d3d;
                margin-top:0.169rem;
            }
        }
    }
}
</style>