<!--  -->
<template>
  <div class="PlayerStyle">
      <div class="PlayerRanking_header">
          <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
          <span>选手风采</span>
      </div>
      <ul class="player_list">
          <li v-for="(item,index) in PlayerStyleData" :key="index">
              <div class="player_top">
                  <div class="player_name">
                      <img v-if="item.avatar" :src="item.avatar" alt="">
                      <span>{{item.username}}+{{item.id}}</span>
                  </div>
                  <span class="player_btn">投票</span>
              </div>
              <div class="player_center">
                  <video controls="controls" :src="item.video_introduction[0].src"></video>
              </div>
              <div class="player_bottom">
                  <span class="player_Number">总票数：{{item.votes}}</span><span>{{item.names}}+{{item.id}}</span>
                </div>
          </li>
      </ul>
      <!-- 提示盒子 -->
         <transition name="fade">
            <div class="promptFather" v-if="showPrompt">
                <div class="prompt" >
                    {{promptContent}}
                </div>
            </div>
        </transition>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import qs from 'qs'
export default {
    name:"PlayerStyle",
  data () {
    return {
        PlayerStyleData:'',
        token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJpc3MiOiJodHRwczpcL1wvbG92eW91LnRvcCIsImF1ZCI6Imh0dHBzOlwvXC9sb3Z5b3UudG9wIiwiaWF0IjoxNTY5NDA4NzE2LCJuYmYiOjE1Njk0MDg3MTYsImV4cCI6MTYwMDk0NDcxNn0.FPH-pgQp-2Vt1kbnZc_Z9JnJYvGYMeLOUHtkC4Tyj_w',
         // 提示盒子
      promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
    };
  },

//   components: {},

  computed:{
        ...mapState(['staticImgH'])
    },

  mounted(){
      var obj=qs.stringify({
          page:1
      })
      this.$http.post('api/player/player_style',obj,{
          headers: {
              'authorization':this.token
          }
    }).then((res)=>{
        if(res.data.code==200){
            this.PlayerStyleData=res.data.data.data
        }else{
            var self=this
            clearInterval(self.timer2);
                    this.promptContent=res.data.msg
                    this.showPrompt=true
                    self.timer2=setTimeout(function(){
                        self.showPrompt=false
                        clearInterval(self.timer2);
                    },2000)
                return false;
        }
        
    })
  },

  methods: {
    //   返回
      toReturn(){
          this.$router.push('/')
      }
  }
}

</script>
<style scoped lang="stylus">
.PlayerStyle{
    width:100%;
    background :#fff;
}
.PlayerRanking_header{
    width:100%
    height:1.23rem;
    display :flex;
    align-items :center;
    justify-content :center;
    position :relative;
    >img{
        width:0.32rem;
        height:0.56rem;
        position :absolute;
        top:50%;
        margin-top:-0.28rem;
        left:0.27rem;
    }
    >span{
        font-size:0.48rem;
        color:rgba(0, 0, 0, 1);
    }
}
.player_list{
    padding:0 0.4rem;
    padding-top:0.27rem;
    >li{
        width:9.01rem;
        margin-bottom:0.3rem;
        border-radius:0.133rem;
        box-shadow :0 0rem 0.3rem rgba(253, 229, 231, 0.6);
        padding:0.3rem;
        >.player_top{
            display :flex;
            align-items :center;
            justify-content :space-between;
            margin-bottom:0.453rem;
            .player_name{
                display :flex;
                align-items :center;
                >img{
                    width:0.853rem;
                    height:0.853rem;
                    background :pink;
                    margin-right:0.187rem;
                }
                >span{
                    font-size:0.373rem;
                    color:rgba(0, 0, 0, 0.8);
                    font-weight:550;
                }
            }
            .player_btn{
                width:1.627rem;
                height:0.64rem;
                border:0.03rem solid rgba(255, 193, 203, 1);
                color:rgba(255, 193, 203, 1);
                font-size:0.32rem;
                border-radius:0.08rem;
                text-align :center;
                line-height :0.58rem;
            }
        }
        >.player_center{
            width:8.533rem;
            height:5.6rem;
            background :pink;
            margin-bottom:0.347rem;
            >video{
                width:100%;
                height:100%;
            }
        }
        >.player_bottom{
            display :flex;
            align-items :center;
            justify-content :space-between;
            font-size:0.32rem;
            color:rgba(0, 0, 0, 1);
            >.player_Number{
                font-size:0.32rem;
                color:rgba(0, 0, 0, 0.8);
            }
        }
    }
}
// 提示盒子
.promptFather{
    width:100%;
    position :fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
    display :flex;
    justify-content :center;
    align-items :center;
    z-index:999;
    >.prompt{
        padding:0.2rem 0.35rem;;
        background :rgba(0,0,0,0.7);
        color:#fff;
        border-radius:0.5rem;
        font-size:0.37rem;
    }
}
.fade-enter-active, .fade-leave-active {
//   transition: opacity .5s;
    transition: all .3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
   transform: translateY(0.32rem);
  opacity: 0;
}
</style>