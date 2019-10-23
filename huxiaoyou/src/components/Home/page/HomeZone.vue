<!-- home_专区 -->
<template>
  <div class="homeZoneWrap">
      <ul class="zone_list">
          <li @click="toSignUp">
              <div><img :src="staticImgH+'ZAsaishibaoming.png'" alt=""></div>
              <span>报名通道</span>
          </li>
          <li @click="toPlayerRanking">
              <div><img  :src="staticImgH+'ZBxuanshouanpai.png'" alt=""></div>
              
              <span>选手排名</span>
          </li>
          
          <li @click="toPlayerStyle">
              <div><img :src="staticImgH+'ZCxuanshoufencai.png'" alt=""></div>
              <span>选手风采</span>
          </li>
          <li @click="toAiBei">
              <div><img :src="staticImgH+'Zcansaifuli.png'" alt=""></div>
              
              <span>参赛福利</span>
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
    name:'HomeZone',
  data () {
    return {
        // 提示盒子
      promptContent:'', //提示盒子的内容
      showPrompt:false,//提示盒子的吸收和显示
      timer2:'',//初始化定时器
    };
  },

//   components: {},

    computed:{
        ...mapState(['staticImgH'])
    },

//   mounted: {},

  methods: {
    //   报名通道
      toSignUp(){
          this.$http.post('/api/player/is_sign').then((res)=>{
                if(res.data.code==200){
                    if(res.data.data.result==-1){
                        this.$router.push('/SignUp')
                    }else{
                        this.playerIds(res.data.data.result)//保存选手id
                        this.addressIdIsSels('false') //投票盒子不显示 
                        this.PlayerDetailPages('/')  //选手详情返回页面
                        this.playDetailVoteDivs('false') //选手详情的投票盒子的消失
                        this.$router.push('/PlayerDetails')
                    }
                }else if(res.data.data.result==1){
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
    //   选手排行
      toPlayerRanking(){
           this.$router.push('/PlayerRanking')
      },
    //   选手风采
      toPlayerStyle(){
          this.$router.push('/PlayerStyle')
      },
    //   参赛福利
      toAiBei(){
          window.location.href="http://app.aibebi.cn/aibei/dist/"
      },
      ...mapMutations(['playerIds','addressIdIsSels','PlayerDetailPages','playDetailVoteDivs']),
  }
}
</script>
<style scoped lang='stylus'>
.zone_list{
    display :flex;
    justify-content :space-between;
    flex-wrap:wrap;
    padding:0 0.53rem;
    >li{
        display :flex;
        flex-direction :column;
        justify-content :space-between;
        align-items :center;
        margin-top:0.4rem;
        >span{
            font-size:0.347rem;
            color:rgba(0, 0, 0, 1);
            margin-top:0.16rem;
        }
        >div{
            >img{
                width:1.25rem;
                height:1.25rem;

            }
        }
        
    }
}
</style>