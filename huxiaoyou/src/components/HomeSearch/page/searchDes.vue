<!-- 搜索_ -->
<template>
  <div class="search_des">
      <div class="PlayerRanking_header">
          <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
          <span>搜索</span>
      </div>
        <div class="search">
            <div class="search_left">
                    <div class="search_btn" @click="searchBtn">
                        <span>{{searchBtnContent}}</span>
                        <!-- <img :src="staticImgH+'HomeSearch.png'" alt=""> -->
                    </div>
                    <input class="search_input" v-model="inputValue" @input="searchValue"  type="text" placeholder="请输入您要搜索的选手名字">
                    <ul class="search_btns" v-if="searchBtnsShow">
                        <li @click="searchBtnsChange(item.name,index)" :class="searchbtnColor==index?'search_btnsColor':''" v-for="(item,index) in searchBtns" :key="index">
                            {{item.name}}
                        </li>
                    </ul>
            </div>
            <span class="search_cancel" @click="inputSearch">搜索</span>
        </div>
        <div class="noSearchShop" v-if="noSearchShopShow">
            <!-- <img src="" alt=""> -->
            <span>抱歉，没有相关商品</span>
        </div>
        <div class="searchHistory" v-if="searchHistoryShow">
            <div class="searchHistory_title">
                <span>最近搜索</span>
                <img @click="lastSearch" :src="staticImgH+'HomeSearchLa.png'" alt="">
            </div>
            <div class="searchHistory_list">
                <span @click="searchHistory(item)" v-for="(item,index) in HistoryList" :key="index">{{item}}</span>
            </div>
        </div>
        <ul class="HomeAngel_listTwo" v-if="playerShow">
              <li   v-for="(item,index) in searchData" :key="index">
                  <!-- {{item.RankingImgData[index]}} -->
                 <div class="searchImg"><img v-if="item.avatar" :src="item.avatar[0].src" alt=""></div> 
                 <span class="angelNameTwo">{{item.username}}</span>
                 <span class="angelPriceTwo">{{item.votes}}+</span>
              </li>
        </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import qs from 'qs'
export default {
    name:'HomeSearch',
  data () {
    return {
        searchBtns:[
            {
                name:'名字',
            },
             {
                name:'秒杀',
            },
            {
                name:'排队',
            },
             {
                name:'预约',
            },
        ],
        searchBtnContent:'名字',
        searchbtnColor:0,
        searchBtnsShow:false,
        noSearchShopShow:false,
        searchHistoryShow:true,
        inputValue:'',
        searchData:'',
        playerShow:false,
        HistoryList:[],
    };
  },

//   components: {},

 computed:{
        ...mapState(['staticImgH','HomeSearchPage','tokenH'])
    },

  mounted(){
      if(JSON.parse(localStorage.getItem('HistoryList'))){
            this.HistoryList=JSON.parse(localStorage.getItem('HistoryList'))
      }
      
  },

methods: {
    // 点击历史搜索
    searchHistory(item){
        this.inputValue=item
        this.inputSearch()
    },
    // 返回
    toReturn(){
        this.$router.push(this.HomeSearchPage)
    },
    //   清除缓存
      lastSearch(){
          localStorage.clear();
          this.HistoryList=[]
      },
      searchValue(){
        if(this.inputValue==''){
            this.searchHistoryShow=true
            this.playerShow=false
            this.noSearchShopShow=false
        }
      },
      searchBtn(){
          this.searchBtnsShow=false
      },
      searchBtnsChange(itemName,index){
          this.searchbtnColor=index
          this.searchBtnContent=itemName
      },
    //   历史搜索
      history(){
           this.inputValue = this.inputValue.trim() // 清除空格
            
            if (this.HistoryList.length > 0) { // 有数据的话 判断
                if (this.HistoryList.indexOf(this.inputValue) !== -1) { // 有相同的，先删除 再添加 
                this.HistoryList.splice(this.HistoryList.indexOf(this.inputValue), 1)
                this.HistoryList.unshift(this.inputValue)
                } else { // 没有相同的 添加
                this.HistoryList.unshift(this.inputValue)
                }
            } else { // 没有数据 添加
                this.HistoryList.unshift(this.inputValue)
            }
            if (this.HistoryList.length > 6) { // 保留六个值
                this.HistoryList.pop()
            }
            localStorage.setItem('HistoryList', JSON.stringify(this.HistoryList))
      },
    //   input事件 
      inputSearch(){
          if(this.inputValue==''){
                return
            }
          var obj=qs.stringify({
              type:1,
              value:this.inputValue
          })
          this.$http.post('api/player/search',obj,{
            headers: {
                'authorization': this.tokenH
            }
        }).then((res)=>{
            if(res.data.code){
                if(res.data.data.length!==0){
                     this.playerShow=true
                     this.searchHistoryShow=false
                    this.searchData=res.data.data
                    
                }else{
                    this.playerShow=false
                    this.noSearchShopShow=true
                    this.searchHistoryShow=false
                }
                this.history()
            }
          })
      }
  }
}

</script>
<style scoped lang="stylus">
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
.search{
    width:100%;
    display :flex;
    align-items :center;
    padding:0.27rem;
    .search_left{
        flex:8;
        height:0.96rem;
        background :rgba(0, 0, 0, 0.06);
        border-radius:0.27rem;
        display :flex;
        align-items :center;
        position :relative;
        >.search_btn{
            display :flex;
            align-items :center;
            >span{
                font-size:0.32rem;
                letter-spacing :0.04rem;
                margin-right:0.338rem;
                margin-left:0.32rem;
                color:#555555;
            }
            >img{
                width:0.27rem;
                height:0.16rem;
                margin-right:0.196rem;
            }
        }
        >.search_btns{
            width:1.876rem;
            background :#fff;
            border:0.03rem solid #e3e3e3;
            position :absolute;
            bottom:-4.55rem;
            left:0;
            >li{
                width:100%;
                height:1.111rem;
                text-align :center;
                line-height :1.111rem; 
                font-size:0.32rem;
                color:#555555;
                border-bottom:0.03rem solid #e3e3e3;
                &:last-child{
                    border-bottom:0;
                }
            }
            >.search_btnsColor{
                color:#ff5c5c;
            }
        }
        >input{
            flex:1;
            height:100%;
            border:0;
            outline :none;
            font-size:0.32rem;
            color:#555555;
            background :rgba(0, 0, 0, 0.0);
            border-radius:0 0.27rem 0.27rem 0;
            font-size:0.32rem;
            color:#C4CFE8;
        }
        
    }
    >.search_cancel{
        font-size:0.48rem;
        color:#7B7676;
        letter-spacing :0.04rem;
        text-align :center;
        margin-left:0.27rem;
    }
}
.noSearchShop{
    display :flex;
    align-items :center;
    justify-content :center;
    margin-top:0.3rem;
    >img{
        width:1.271rem;
        height:1.244rem;
        background :pink;
    }
    >span{
        font-size:0.32rem;
        color:#353535;
        letter-spacing :0.04rem;
        margin-left:0.516rem;

    }
}
// 搜索历史
.searchHistory{
    padding:0.27rem;
}
.searchHistory_title{
    display :flex;
    align-items :center;
    justify-content :space-between;
    >span{
        font-size:0.373rem;
        color:#000000;
    }
    >img{
        width:0.373rem;
        height:0.48rem;
        margin-right:0.27rem;
    }
}
.searchHistory_list{
    margin-top:0.32rem;
    >span{
        display :inline-block;
        padding:0.19rem 0.373rem;
        background :#FFC1CB;
        color:#FFFFFF;
        font-size:0.293rem;
        border-radius:1.333rem;
        margin-right:0.27rem;
        margin-bottom:0.27rem;
    }
    

}
// 搜索后的商品列表
.searchShop{
    width:100%;
    display :flex;
    justify-content :space-between;
    flex-wrap:wrap;
    margin-top:0.2rem;
    >li{
        width:4.67rem;
        display :flex;
        flex-direction :column;
        align-items :center;
        background:#fff;
        >img{
            width:100%;
            height:4.69rem;
            background :skyblue;
        }
        >.searchShop_name{
            width:90%;
            font-size:0.32rem;
            color:#454543;
            margin:0.27rem 0;
            overflow :hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            text-align:center;
        }
        >.searchShop_price{
            font-size:0.32rem;
            color:#e84411;
            margin-bottom:0.2rem;
        }
    }
}
.HomeAngel_listTwo{
    display :flex;
    justify-content:space-between;
    flex-wrap:wrap;
    padding:0 0.4rem;
    margin-top:0.27rem;
    >li{
        width:4.4rem;
        height:5.573rem;
        display:flex;
        flex-direction :column;
        >.searchImg{
            width:4.4rem;
            height:4rem;
            background :skyblue;
            >img{
                width:4.4rem;
                height:4rem;
                
            }
        }
        
       >.angelNameTwo{
           font-size:0.347rem;
           color:rgba(0, 0, 0, 0.8);
           font-weight:550;
           margin-top:0.27rem;
           margin-bottom:0.053rem;
           padding:0 0.27rem;
           line-height :0.5rem;
           display:-webkit-box;
           -webkit-box-orient:vertical;
           word-break:break-all;
           overflow:hidden;
           -webkit-line-clamp:1;
           
       }
       >.angelPriceTwo{
           color:rgba(0, 0, 0, 0.8);
           font-size:0.32rem;
           line-height :0.45rem;
           padding: 0 .27rem;

       }
    }
}
</style>