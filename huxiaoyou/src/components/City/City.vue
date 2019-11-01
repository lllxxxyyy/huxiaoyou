<!-- 常驻城市 -->
<template>
    <div class="city">
            <div class="city_header">
                <img @click="cityReturn" :src="staticImgH+'zuojiantou.png'" alt="">
                <span>常驻城市</span>
                <span class="sureBtn" @click="sure">确定</span>
            </div>
            <div class="city_input">
                <img :src="staticImgH+'citySearchImg.png'" alt="">
                <input type="text" placeholder="请输入城市名称或字母">
            </div>
            <div class="city_wrapper">
                  <div class="nowCity">
                      <span class="nowCity_title">所在城市</span><span class="nowCity_name">{{cityName}}</span>
                  </div>
                  <div class="wrapper" ref="wrapper">
                      <div class="content">
                          <ul>
                              <li ref="letterKey" v-for="(item,index) in cityData" :key="index">
                                  <span class="con_cityTitle">{{item.name}}</span>
                                  <div class="cityName_list">
                                      <span @click="cityNameC(item.name)" v-for="(item,index) in item.cities" :key="index">
                                          {{item.name}}
                                      </span>
                                  </div>
                              </li>
                          </ul>  
                          <div class="hideHeight">
                      </div>                                                                 
                      </div>
                  </div>
                  <div class="letter_list">
            <ul>
                <li @click="toLetter(index)" v-for="(item,index) in cityData" :key="index">
                    <span>{{item.name}}</span>
                </li>
            </ul>
        </div>
            </div>
    </div>
</template>

<script>
import qs from 'qs'
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import BScroll from 'better-scroll'
export default {
    data () {
        return {
            cityName:'',
            cityData:'',
            scroll:'',
        };
    },
    computed:{
        ...mapState(['staticImgH','apiH','cityNamePerX'])
    },

  mounted(){
      if(this.cityNamePerX){
          this.cityName=this.cityNamePerX
      }
      
      this.scroll=new BScroll(this.$refs.wrapper,{
            click: true
        })
      this.$http.get('/static/mock/city.json').then((res)=>{
          this.cityData=res.data
      })
  },

  methods: {
      toLetter(index){
          this.scroll.scrollToElement(this.$refs.letterKey[index])
      },
      sure(){
          this.cityNamePerXs(this.cityName)
          this.$router.push('/MineInformation')
      },
      // 返回
      cityReturn(){
          
        this.$router.push('/MineInformation')
      },
    //   点击每个城市
      cityNameC(itemName){
          
          this.cityName=itemName
      },
       ...mapMutations(['specialInfos','cityNamePerXs']),
  }
}

</script>
<style scoped lang="stylus">
.city{
    width:100%;
    height:100%;
    display :flex;
    flex-direction :column;
}
.city_top{
    width:100%;
    position :relative;
    top:0;
    left:0;
}
.city_header{
    width:100%;
    height:1.23rem;
    display :flex;
    justify-content :space-between;
    align-items :center;
    position :relative;
    background :#fff;
    padding:0 0.4rem;
    img{
        width:0.32rem;
        height:0.56rem;
        // position :absolute;
        // left:0.27rem;
        // top:50%;
        // margin-top:-0.28rem;
    }
    >.sureBtn{
        // position :absolute;
        // left:0.27rem;
        // top:50%;
        // margin-top:-0.28rem;
    }   
    >span{
        font-size:0.48rem;
        color:rgba(0, 0, 0, 1);
        
    }
}
.city_input{
    width:8.933rem;
    height:0.8rem;
    display :flex;
    align-items :center;
    margin:0 auto;
    margin-top:0.27rem;
    margin-bottom:0.32rem;
    border-radius:1.333rem;
    background :rgba(0, 0, 0, 0.06);
    >img{
        width:0.347rem;
        height:0.373rem;
        margin-left:0.4rem;
        margin-right:0.27rem;
    }
    >input{
        flex:1;
        height:80%;
        font-size:0.32rem;
        color:rgba(0, 0, 0, 0.4);
        border:0;
        outline :none;
        background :transparent;
    }
}
.city_wrapper{
    height:14.373rem;
    margin:0.27rem;
    border-radius:0.133rem;
    box-shadow :0 0.05rem 0.3rem rgba(241, 241, 241, 1);
    position :relative;
    padding:0.27rem 0.32rem;
    overflow :hidden;
    padding-right:0.8rem;
    >.nowCity{
      display :flex;
      flex-direction :column;
      font-size:0.347rem;
      color:rgba(255, 57, 36, 1);
      >.nowCity_title{
        font-size:0.373rem;
        color:rgba(0, 0, 0, 1);
        margin-bottom:0.27rem;
        
      }
      >.nowCity_name{
          margin-left:0.32rem;
      }
    }
}
.cityList_hide{
    width:100%;
    height:2.62rem;
}
.wrapper{
    width:100%;
    height:100Vh;
    position :absolute;
    top:1.53rem;
    overflow :hidden;
    padding-right:0.8rem;
}
.content{
    width:100%;
    font-size:0.32rem;
    min-height :100vh;
    
    >ul{
        >li{
          display :flex;
          flex-direction :column;
          font-size:0.32rem;
              color:rgba(0, 0, 0, 1);
            >.con_cityTitle{
              width:100%;
              
              border-bottom:0.03rem solid rgba(0, 0, 0, 0.1);
              padding-bottom:0.2rem;
              margin-bottom:0.32rem;
            }
            >.cityName_list{
                display :flex;
                flex-direction :column;
                >span{
                  // font-size:
                  margin-bottom:0.32rem;
                }
            }
        }
    }
}
.hideHeight{
  height:5rem;
}
.letter_list{
    position :absolute;
    right:0;
    top:0.32rem;
    background :#fff;
    font-size:0.27rem;
    >ul{
      >li{
        margin-bottom:0.32rem;
      }
    }
}
</style>