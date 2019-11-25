<!--  -->
<template>
  <div class="LivePlatform">
      <div class="PlayerRanking_header">
          <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
          <span>助力卡包</span>
      </div>
	  <div class="zlkabao">
	   <span>卡包助力投票</span>
      <ul>
          <li v-for="(item, index) in cardList" @click.stop="toshopdetail(item.goods_id)" v-if=" Number(index+1)" :key="index">
            <img :src="item.original_img" :alt="item.goods_name">
                <span>{{item.goods_name}}</span>
          </li>
      </ul>
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
    name:"PowerPack",
  data () {
    return {
        cardList: [],
        LiveName:'',
        liveId:'',
        // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
  
    };
  },

//   components: {},

  computed:{
        ...mapState(['staticImgH','tokenH','playerId','userIdH'])
    },

  mounted() {
      
    // 卡包
    this.$http.post('api/goods/goods_list', {}, {
      headers: {
        'authorization': this.tokenH
      }
    }).then((res) => {
      if (res.data.code===200) {
        this.cardList = res.data.data.result
      }
    })
  },

  methods: {
       //   到商品id

        toshopdetail(goodid){
                this.addressIdIsSels('false') //商品页默认地址不选中
                this.shopDetailReturns('/PowerPack')//商品页返回哪
                this.shopgoodIds(goodid)  //给商品页传gooid
                this.playerIds(this.playerId)
                this.userIdHInterests(this.userIdH)
                this.$router.push('/shopDetail')  
        },
      toReturn(){
          this.$router.push('/Mine')
      },
      ...mapMutations([ 'addressIdIsSels', 'shopDetailReturns','shopgoodIds','playerIds','userIdHInterests'])
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
.zlkabao{
        width:9.2rem;
        margin:0 0.4rem;
        margin-top:0.27rem;
		margin-bottom:0.4rem;
        border-radius:0.133rem;
		padding:0 0.16rem;
		padding-top:0.12rem;
		padding-bottom:0.1rem;
        box-shadow :0 0rem 0.2rem rgba(253, 229, 231, 1);
		>span{
		margin-left: 0.2rem;
    padding-bottom: 0.1rem;
    border-bottom: 0.053rem solid #ffccd4;
    color: #000;
	font-size:0.4rem;
    font-weight: 600;
		}
		>ul{
		display: -webkit-box;
    	display: -ms-flexbox;
    	display: flex;
    	-webkit-box-pack: justify;
    	-ms-flex-pack: justify;
    	-ms-flex-wrap: wrap;
	margin-top:0.5rem;
    	flex-wrap: wrap;
        >li{
            font-size:0.32rem;
            color:rgba(0, 0, 0, 1);
			margin-bottom:0.36rem;
			position: relative;
			width:2.9rem;
			text-align:center;
			font-size:0.37rem;
            display:flex;
            flex-direction :column;
            align-items:center;
            margin-right:0.06rem;
			>img{ width:2.9rem; margin-bottom:0.2rem;}
            >span{
                width:100%;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                word-break:break-all;
                overflow:hidden;
                -webkit-line-clamp:2;
                padding:0 0.2rem;
            }
        }
		}
    }
    .delBind{
         width:9.2rem;
        height:1.253rem;
        font-size:0.32rem;
            color:rgba(0, 0, 0, 1);
            margin:0 auto;
            margin-top:0.32rem;
			padding-left:0.34rem;
            line-height :1.253rem;
            border-radius:0.133rem;
        box-shadow :0 0rem 0.2rem rgba(253, 229, 231, 0.8);
		font-size:0.42rem;
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
