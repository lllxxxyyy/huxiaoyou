<!-- 公共底部 -->
<template>
  <div class="foot">
      <ul>
          <li v-for="(item,index) in footData" :key="index" @click="footClick(index,item.url)">
              <img :src="index==idx?item.img2:item.img1" alt="">
              <span :class="index==idx?'nameRed':''">{{item.name}}</span>
          </li>
      </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
        footData:[
            {
                id:0,
                name:'首页',
                img1:'/static/mock/img/homeBtn.png',
                img2:'/static/mock/img/homeBtnRed.png',
                url:'/'
            },
            {
                id:1,
                name:'赛事商务',
                img1:'/static/mock/img/Event.png',
                img2:'/static/mock/img/EventRed.png',
                url:'/Sort'
            },
            {
                id:2,
                name:'公会',
                img1:'/static/mock/img/UnionBtn.png',
                img2:'/static/mock/img/UnionBtnRed.png',
                url:'/Shop'
            },
            {
                id:3,
                name:'我的',
                img1:'/static/mock/img/mineBtn.png',
                img2:'/static/mock/img/mineBtnRed.png',
                url:'/Mine'
            },
        ],
        idx:0,
    };
  },

//   components: {},

  computed:{
        ...mapState(['idxNowH'])
    },

  mounted(){
      this.idx=this.idxNowH
  },
  methods: {
      footClick(itemId,itemUrl){
        this.idx=itemId
        this.idxNowHs(itemId)
        this.$router.push(itemUrl)
      },
      ...mapMutations(['idxNowHs']),
  }
}

</script>
<style scoped lang="stylus">
.foot{
    width:100%;
    >ul{
        width:100%;
        height:1.458rem;
        background :#fff;
        display :flex;
        justify-content :space-between;
        align-items :center;
        padding:0 0.907rem;
        >li{
            display :flex;
            flex-direction :column;
            align-items :center;
            >span{
                font-size:0.32rem;
                color:rgba(255, 193, 203, 1);
            }
            >img{
                width:0.604rem;
                height:0.604rem;
                margin-bottom:0.169rem;
            }
            >.nameRed{
                color:rgba(255, 193, 203, 1);
            }
        }
    }
}
</style>