<!--  -->
<template>
  <div class="LivePlatform">
      <div class="PlayerRanking_header">
          <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
          <span>专属客服</span>
      </div>
	  <div class="CustomerService">
		  <span><img v-if="imgInfo.img" :src="imgInfo.img" alt=""><br />{{imgInfo.names}}</span>
		  <div class="Customer_xiazai" @click="down(staticImgH+'Bitmap.png')">
        <img v-if="imgInfo.img" :src="imgInfo.img" alt="">
      </div>
	  </div>
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
        LiveName:'',
        liveId:'',
        // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示

      imgInfo: {}
  
    };
  },

//   components: {},

  computed:{
        ...mapState(['staticImgH','tokenH'])
    },

  mounted() {
      let player_id = this.$route.query.player_id
      this.getQRCode(player_id);
  },

  methods: {
      // 获取二维码
      getQRCode(player_id){
        let obj = qs.stringify({
          player_id: player_id
        })
        this.$http.post('api/user/er_img', obj, {
          headers: {
            'authorization': this.tokenH
          }
        }).then((res) => {
          if (res.data.code===200) {
            this.imgInfo = res.data.data.result
          }
        })
      },
      toReturn(){
          this.$router.push('/Mine')
      },
    down(href) {
      // 生成一个a元素
      let a = document.createElement('a')
      // 将a的download属性设置为我们想要下载的图片名称
      a.download = name || 'pic'
      // 将生成的URL设置为a.href属性
      a.href = href
      // 触发a的单击事件
      a.click();
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
        justify-content :center;
        position :relative;
        padding:0 0.4rem;
        >img{
            width: 0.32rem;
    		height: 0.56rem;
    		position: absolute;
    		top: 50%;
    		margin-top: -0.28rem;
    		left: 0.27rem;
        }
        >span{
            font-size:0.48rem;
            color:rgba(0, 0, 0, 1);
        }
    }
.CustomerService{
        width:9.2rem;
		height:89%;
        margin:0 0.4rem;
        margin-top:0.27rem;
		margin-bottom:0.4rem;
        border-radius:0.133rem;
		padding:0 0.16rem;
		padding-top:0.12rem;
		padding-bottom:0.1rem;
		>span{
    	padding-bottom: 0.1rem;
		width:8.88rem;
		display:block;
		text-align:center;
		margin-top:38%;
    	color: #000;
		font-size:0.5rem;
    	font-weight: 500;
		>img{ width:4.4rem; margin-bottom:0.5rem;}
		}
		>.Customer_xiazai{ margin-top:1.4rem; text-align:center;
		  >img{ width:0.6rem;}
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
