<!-- 选手暂时 -->
<template>
  <div class="PlayerRankingHome">
    <div class="PlayerRanking_header">
      <span>赛事商务</span>
    </div>
    <div class="CoOperative">
      <span>合作商</span>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="kabao">
      <span>卡包</span>
      <ul>
        <li><img :src="staticImgH+'zhuli.png'" alt="">分享助力投票</li>
        <li><img :src="staticImgH+'zhuli.png'" alt="">99卡包</li>
        <li><img :src="staticImgH+'zhuli.png'" alt="">199卡包</li>
        <li><img :src="staticImgH+'zhuli.png'" alt="">299卡包</li>
        <li><img :src="staticImgH+'zhuli.png'" alt="">399卡包</li>
        <li><img :src="staticImgH+'zhuli.png'" alt="">999卡包</li>
      </ul>
    </div>
    <!-- 提示盒子 -->
    <transition name="fade">
      <div class="promptFather" v-if="showPrompt">
        <div class="prompt">
          {{promptContent}}
        </div>
      </div>
    </transition>
    <Foot class="PublicFoot"/>
    <div class="footer">

    </div>
  </div>
</template>

<script>
  import Foot from './../Foot/Foot'
  import {mapState} from 'vuex'
  import {mapMutations} from 'vuex'

  import qs from 'qs'

  export default {
    name: 'Sort',
    data() {
      return {
        // 提示盒子
        promptContent: '', //提示盒子的内容
        showPrompt: false,//提示盒子的吸收和显示
      };
    },
    components: {
      Foot
    },

    computed: {
      ...mapState(['staticImgH',])
    },

    mounted() {

      var barobj = qs.stringify({})
      this.$http.post('api/division/list', barobj, {
        headers: {
          'authorization': this.token
        }
      }).then((res) => {
      })


    },

    methods: {
      //   获取数据
      getlistData() {
        // 获取合作商，卡包，暂时没有接口
        var obj = qs.stringify({
          page: 1
        })
        this.$http.post('api/player/division_ranking/' + this.barId, obj, {
          headers: {
            'authorization': this.token
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.RankingData = res.data.data.data
          } else {
            this.alertText(res.data.msg)
            return false;
          }

        })

      },// 弹框提示
      alertText(text) {
        var self = this
        clearInterval(self.timer2);
        this.promptContent = text
        this.showPrompt = true
        self.timer2 = setTimeout(function () {
          self.showPrompt = false
          clearInterval(self.timer2);
        }, 2000)
        return false;
      },
      ...mapMutations(['playerIds', 'PlayerDetailPages', 'addressIdIsSels', 'playDetailVoteDivs']),
    }
  }

</script>
<style scoped lang='stylus'>
.PlayerRankingHome{
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
.CoOperative{
		padding:0 0.4rem;
		>span{ padding-bottom:0.1rem; border-bottom:0.053rem solid #ffccd4; color:#000; font-size:0.48rem;}
		>ul{display:-webkit-box; display:-ms-flexbox; display:flex; -webkit-box-pack:justify; -ms-flex-pack:justify; justify-content:space-between; -ms-flex-wrap:wrap; flex-wrap:wrap; margin-top:0.7rem;
		>li{ width:2.6rem; height:1.4rem; background:rgba(0,0,0,0.1); margin-bottom:0.4rem;}
		}
}
.kabao{
        padding:0 0.4rem;
		margin-bottom:0.4rem;
        border-radius:0.133rem;
		padding-top:0.12rem;
		padding-bottom:0.1rem;
		>span{
    padding-bottom: 0.1rem;
    border-bottom: 0.053rem solid #ffccd4;
    color: #000;
	font-size:0.48rem;
		}
		>ul{
		display: -webkit-box;
    	display: -ms-flexbox;
    	display: flex;
    	-webkit-box-pack: justify;
    	-ms-flex-pack: justify;
    	justify-content: space-between;
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
			>img{ width:2.9rem; margin-bottom:0.2rem;}
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

.PublicFoot{
    position :fixed;
    bottom:0;
    left:0;
}
.footer{
   width:100%;
   height:1.458rem;
   background :#fff;
}
.video-js .vjs-icon-placeholder {
  width: 100%;
  height: 100%;
  display: block;
  background-color red;
}
</style>
