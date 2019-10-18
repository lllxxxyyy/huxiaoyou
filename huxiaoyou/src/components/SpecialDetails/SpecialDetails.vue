<!--  -->
<template>
  <div>
    
      <div class="SpecialDetailsHeader">
          <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
          <span>往届大赛风采</span>
      </div>
      <div class="shopHide"></div>
	  <div class="SpecialDetails_thumb"><img :src="specialDetailData.thumb" alt=""></div>
      <div class="SpecialDetails_title">
          {{specialDetailData.title}}
      </div>
      <!-- <div class="SpecialDetails_des">
            <span>2019-10-13</span>
            <span>10万+人浏览</span>
      </div> -->
      <div class="SpecialDetails_Con" v-html="specialDetailData.content"></div>
	  <div class="SpecialDetails_But"><button>立即报名</button></div>
      <!-- <ul class="SpecialDetails_foot">
          <li class="SpecialDetails_collect">
              <img src="" alt="">
              <span>收藏</span>
          </li>
          <li class="SpecialDetails_share">
              <img src="" alt="">
              <span>分享</span>
          </li>
      </ul> -->
      
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import qs from 'qs'
export default {
  data () {
    return {
      specialDetailData:'',
    };
  },
  computed:{
        ...mapState(['staticImgH','specialDetailInfo','tokenH'])
    },

  mounted() {
    var obj=qs.stringify({
        type:this.specialDetailInfo.type,
        project_id:this.specialDetailInfo.projectId
    })
    this.$http.post('api/ad/comment_list',obj,{
                headers: {
                    'authorization': this.tokenH
                }
    }).then((res)=>{
      console.log(res)
      if(res.data.code==200){
          this.specialDetailData=res.data.data.result[0]
          console.log(this.specialDetailData)
      }
    })
  },

  methods: {
    toReturn(){
		this.$router.push('/SpecialTopic')
    }
  }
}

</script>
<style scoped lang="stylus">
.shopHide{
  width:100%;
  height:1.2rem;
}
.SpecialDetailsHeader{
  width:100%;
  height:1.2rem;
  display:flex;
  justify-content:center;
  align-items :center;
  position :fixed;
  background :#fff;
   >img{
        width:0.32rem;
        height:0.56rem;
        position :absolute;
        top:50%;
        margin-top:-0.28rem;
        left:0.27rem;
    }
  >span{
    font-size:0.53rem;
    color:#000000;
  }
}

.SpecialDetails_title{
    width:100%;
    text-align :center;
    font-size:0.5rem;
    font-weight:600;
    margin-top:0.44rem;
    margin-bottom:0.71rem;
    padding:0 0.27rem;
}
.SpecialDetails_Con{
  padding:0 0.4rem;
  font-size:0.4rem;
  >img{ width:100%;}
}
.SpecialDetails_thumb{
  padding:0.2rem 0.4rem;
  >img{ width:100%;}
}
.SpecialDetails_des{
    display :flex;
    align-items :center;
    justify-content :space-between;
    padding:0 0.27rem;
    color:#7a7a7a;
    font-size:0.32rem;
    margin-bottom:0.44rem;
}
.SpecialDetails_foot{
    width:100%;
    height:1.244rem;
    position :fixed;
    bottom:0;
    left:0;
    display:flex;
    >li{
        width:50%;
         height:1.244rem;
         display :flex;
         flex-direction :column;
         align-items :center;
         font-size:0.32rem;
         color:#464543;
         >img{
             margin-bottom:0.16rem;
         }
         
    }
    >.SpecialDetails_collect{
        >img{
            width:0.533rem;
            height:0.516rem;
            background :pink;
        }
    }
    >.SpecialDetails_share{
        >img{
            width:0.516rem;
            height:0.516rem;
            background :pink;
        }
    }
}
.SpecialDetails_But{ padding:0.9rem 0.4rem; text-align:center;}
.SpecialDetails_But button{ border:0; background:#FF9DAC; width:100%; text-align:center; border-radius:100px; height:0.916rem; color:#Fff; font-size:0.40rem;}
</style>