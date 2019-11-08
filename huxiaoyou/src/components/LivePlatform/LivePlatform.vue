<!--  -->
<template>
  <div class="LivePlatform">
      <div class="PlayerRanking_header">
          <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
          <span>直播平台</span>
          <span @click="tobind">绑定</span>
      </div>
      <ul class="LiveDes">
          <li> <span>直播平台</span>  <input placeholder="请填写您常用的直播平台" v-model="LiveName" type="text"></li>
          <li> <span>直播id</span>  <input placeholder="请填写您所对应的直播平台的id号" v-model="liveId"  type="text"></li>
      </ul>
      <div class="delBind" @click="delbind">修改id号码</div>
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
    name:"LivePlatform",
  data () {
    return {
        LiveName:'', //直播平台
        liveId:'',  //直播id
        // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
        timer2:'',
    };
  },

//   components: {},

  computed:{
        ...mapState(['staticImgH','tokenH'])
    },

  mounted(){
      this.LiveName=this.$route.query.platform
      this.liveId=this.$route.query.platformId
  },
  methods: {
        // 返回
            toReturn(){
                this.$router.push('/Mine')
            },
        // 绑定
            tobind(){
                if (!this.LiveName || !this.liveId) {
                    this.alertText('请输入完整信息')
                    return
              }
                var obj=qs.stringify({
                    live_platform:this.LiveName,
                    live_id:this.liveId,
                    type:1,
                    })
                this.$http.post('/api/player/bind_live',obj).then((res)=>{
                    if(res.data.code==200){
                        this.alertText('绑定成功')
                    }else{
                        this.alertText(res.data.msg)
                    }
                })
            },
        // 弹框提示
            alertText(text){
                    var self=this
                    clearInterval(self.timer2);
                        this.promptContent=text
                        this.showPrompt=true
                        self.timer2=setTimeout(function(){
                            self.showPrompt=false
                            clearInterval(self.timer2);
                        },2000)
                    return false;
            },
        //   删除绑定
            delbind(){
                this.$http.delete('api/player/bind_del',{
                    headers: {
                        'authorization': this.tokenH,
                    },
                    params: {
                        type: 1
                    }
                }).then((res)=>{
                        if(res.data.code==200){
                        this.alertText('删除绑定成功')
                        }else {
                            this.alertText(res.data.msg)
                        }
                })
            }
  }
}

</script>
<style scoped lang="stylus">
.LivePlatform{
    width:100%;
    height:100%;
    background :#fff;
}
    .PlayerRanking_header{
        width:100%
        height:1.23rem;
        display :flex;
        align-items :center;
        justify-content :space-between;
        position :relative;
        padding:0 0.4rem;
        >img{
            width:0.32rem;
            height:0.56rem;
        }
        >span{
            font-size:0.48rem;
            color:rgba(0, 0, 0, 1);
        }
    }
    .LiveDes{
        width:9.2rem;
        margin:0 0.4rem;
        margin-top:0.27rem;
        border-radius:0.133rem;
        box-shadow :0 0rem 0.2rem rgba(253, 229, 231, 1);
        padding:0.32rem;
        >li{
            font-size:0.373rem;
            color:rgba(0, 0, 0, 1);
            display :flex;
            flex-direction :column;
            margin-bottom:0.32rem;
            >span{
                line-height :0.53rem;
                margin-bottom:0.16rem;
            }   
            &:last-child{
                border-bottom:0;
            }
            >input{
                height:0.64rem;
                border:0.03rem solid rgba(0, 0, 0, 0.2);
                outline :none;
                background :#fff;
                border-radius:0.16rem;
                font-size:0.32rem;
                padding-left:0.2rem;
               
            }
             >input::-webkit-input-placeholder { /* Chrome/Opera/Safari */ 
			        color: rgba(0, 0, 0, 0.38);
                    font-size:0.32rem;
            }
            >input::-moz-placeholder { /* Firefox 19+ */  
                    color: rgba(0, 0, 0, 0.38);
                    font-size:0.32rem;
            }
            >input:-ms-input-placeholder { /* IE 10+ */ 
                    color: rgba(0, 0, 0, 0.38);
                    font-size:0.32rem;
            }
            >input:-moz-placeholder { /* Firefox 18- */ 
                     color: rgba(0, 0, 0, 0.38);
                    font-size:0.32rem;
            }
        }
    }
    .delBind{
        width:9.2rem;
        height:1rem;
        font-size:0.347rem;
        color:rgba(0, 0, 0, 1);
        margin:0 auto;
        margin-top:0.32rem;
        line-height :1rem;
        border-radius:0.133rem;
        box-shadow :0 0rem 0.2rem rgba(253, 229, 231, 0.8);
        padding-left:0.32rem;
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