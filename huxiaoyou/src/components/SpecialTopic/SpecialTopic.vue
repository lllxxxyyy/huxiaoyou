<!--  -->
<template>
  <div class="SpecialTopic">
      <div class="SpecialTopicHeader">
          <img @click="specialReturn"  :src="staticImgH+'zuojiantou.png'" alt="">
          <span>往届大赛风采</span>   
      </div>
<div class="shopHide"></div>
      <ul class="Special_list">
          <li v-for="(item,index) in specialList" :key="index" @click="toSpecialDetails(item.id)">
              <div class="SpecialList_left">
                  <span class="SpecialList_name">{{item.title}}</span>
                  <span class="SpecialList_num"></span>
              </div>
              <div class="SpecialList_right">
                  <img :src="item.thumb" alt="">
              </div>
          </li>
      </ul>

      
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import qs from 'qs'
export default {
  data () {
    return {
        specialList:'',
    };
  },

   computed:{
        ...mapState(['staticImgH','specialInfo','tokenH'])
    },
	
  mounted(){
    var obj=qs.stringify({
        type:this.specialInfo.type,
        project_id:this.specialInfo.projectId
    })
    this.$http.post('api/ad/comment_list',obj,{
                headers: {
                    'authorization': this.tokenH
                }
    }).then((res)=>{
      if(res.data.code==200){
          this.specialList=res.data.data.result
      }
    })
  },

  methods: {
      specialReturn(){
          this.$router.push('/')
      },
    SpecialBarBtn(index){
          this.SpecialBarindex=index
      },
      toSpecialDetails(id){
        var specialDetailInfo={projectId:id,type:3}
          this.specialDetailInfos(specialDetailInfo)
          this.$router.push('/SpecialDetails')
      },
      ...mapMutations(['specialDetailInfos']),
  }
}

</script>
<style scoped lang="stylus">
.SpecialTopic{
  width:100%;
  height:100%;
}
.shopHide{
  width:100%;
  height:1.2rem;
}

.SpecialTopicHeader{
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


.SpecialTopicBody_bar{
    width:100%;
    height:1.147rem;
    border-bottom:0.03rem solid #eeeeee;
    padding:0 0.27rem;
    background :#fff;
    >ul{
        height:1.147rem;
        display :flex;
        align-items :center;
         overflow-x:scroll;
        display: -webkit-box;
        -webkit-box-align: center;
        align-items :center;
        z-index :-1;
        >li{
            height:1.147rem;
            line-height :1.147rem;
            font-size:0.37rem;
            color:#555;
            margin-right:0.764rem;
        }
        >.Special_barColor{
            color:#e5535d;
            position :relative;
            &:before{
                content:'';
                width:100%;
                height:0.04rem;
                background :#f15055;
                position :absolute;
                bottom:0.03rem;
                left:0;
            }
        }
    }
}
// 列表
.Special_list{
    padding-top:0.27rem;
    
    >li{
        height:3.396rem;
        display :flex;
        justify-content :space-between;
        // align-items :center;
        padding:0.4rem 0.267rem;
		box-shadow:0px 3px 12px 0px rgba(254,216,222,0.5);
		border-radius:12px;
        background :#fff;
		margin:0 0.27rem;
        margin-bottom:0.2rem;
       >.SpecialList_left{
           display :flex;
           flex-direction :column;
           justify-content :space-between;
           font-size:0.32rem;
           >.SpecialList_name{
            color:#494949;
			font-size:16px;
           }
           >.SpecialList_num{
               color:#797979;
           }
       } 
       >.SpecialList_right{
           display :flex;
           align-items :center;
           justify-content :center;
           >img{
               background :skyblue;
			   width:2.58rem;
               height:2.58rem;
			   border-radius:10px;
           }
       }
    }
}
</style>