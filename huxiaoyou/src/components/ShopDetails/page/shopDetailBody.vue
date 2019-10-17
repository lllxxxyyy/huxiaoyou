<!--  -->
<template>
  <div class="shopDetailBody">
      <div class="shopDetail_banner" >
        <swiper class="banner_list" :options="swiperOption">
                <!-- slides -->
                <swiper-slide  class="banner_li">
                </swiper-slide>
                <!-- Optional controls -->
                <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
    <div class="shopDetail_Info">
        <div class="shopDetail_desName">99元领取超值卡包为我投票</div>
        <div class="shopDetail_des">
            <div class="shopDetail_desleft">
                <div class="shopDetail_desLeftwrap">
                    <div class="shopDetail_desMoney">
                        ￥<span>10.00</span>
                    </div>
                    <div class="shopDetail_original">￥136.00</div>
                </div>
                <div class="shopDetail_num">销量:8件</div>
            </div>
            
            <div class="shopDetail_desShare">
                <img src="" alt="">
                <span>分享</span>
            </div>
        </div>
    </div>
    <div class="shopDetail_prompt">
            <img src="" alt="">
            <span>购买助力卡为选手助力990颗天使钻</span>
    </div>
    <div class="sel_norm"> 
        选择 <span>规格</span>
    </div>
    <ul class="shopDetail_btn">
        <li> <span class="shopDetail_btnColor">商品详情</span> </li><li><span>评价</span></li>
    </ul>
    <div>商品详情</div>
    <!-- <ul class="">

    </ul> -->
    <div class="foot">
        <ul class="footLeft">
            <li class="footLeftHome"> <img src="" alt=""> <span>首页</span></li>
            <li class="footLeftcollect"> <img src="" alt=""> <span>收藏</span></li>
        </ul>
        <div class="footRight">
            <span class="addShop">加入购物车</span>
            <span class="ImmBuy">立即购买</span>
        </div>
    </div>
    <div class="foot_format">
          <div><img src="" alt=""></div> 
    </div>
  </div> 
</template>

<script>
export default {
  data () {
    return {
         slidersData:[],
          swiperOption: {
              pagination: {
                el: '.swiper-pagination',
                loop:true,
                autoplay: true,
                preventLinksPropagation : false,
              }
        },
    };
  },

//   components: {},

//   computed: {},

//   mounted: {},

//   methods: {}
}

</script>
<style scoped lang="stylus">
.shopDetailBody{
  width:100%;
  height:9.6rem;
  background :pink;
}
.banner_list{
  width:100%;
  height:9.6rem;
  >swiper-slide{
    width:100%;
    height:9.6rem;
  }
}
.swiper-slide{
  img{
      display :block;
      width:100%;
      height:9.6rem;
    }
}
.swiper-container >.swiper-pagination{
  text-align :center;
  padding-right:0.27rem;
}
.swiper-pagination-bullets >>> .swiper-pagination-bullet{
  background :#fff;
  width:0.11rem;
  height:0.11rem;
   opacity:1;
}
.swiper-pagination-bullets >>> .swiper-pagination-bullet-active{
  background :#FF2404;
  width:0.21rem;
  height:0.11rem;
  border-radius:0.2rem;
 
}
.shopDetail_Info{
    background :#fff;
    padding-bottom:0.47rem;
}
.shopDetail_desName{
    font-size:0.37rem;
    font-weight:600;
    padding:0.4rem 0.27rem;
}
.shopDetail_des{
    display :flex;
    justify-content :space-between;
    padding:0 0.27rem;
        >.shopDetail_desleft{
            display :flex;
            
            >.shopDetail_desLeftwrap{
                display :felx;
                flex-direction :column;
                margin-right:0.32rem;
                >.shopDetail_desMoney{
                    font-size:0.231rem;
                    color:#e7100b;
                    margin-bottom:0.444rem;
                    >span{
                        font-size:0.41rem;
                    }
                }
                >.shopDetail_original{
                    font-size:0.25rem;
                    color:#7f7f7f;
                    text-decoration:line-through; 
                }
            }
            >.shopDetail_num{
                font-size:0.32rem;
                color:#6d6d6d;
                display :flex;
                align-items :flex-end;
            }
        }
        >.shopDetail_desShare{
            display :flex;
            flex-direction :column;
            font-size:0.27rem;
            color:#808080;
            >img{
                width:0.51rem;
                height:0.51rem;
                margin-bottom:0.142rem;
                background :pink;
            }
        }
}
.shopDetail_prompt{
    
    width:100%;
    height:1.22rem;
    display :flex;
    align-items :center;
    padding: 0 0.27rem;
    color:#434343;
    font-size:0.32rem;
    background :#fff;
    border-top:0.03rem solid #efefef;
    >img{
        width:0.4rem;
        height :0.4rem;
        margin-right:0.2rem;
        background :skyblue;
        
    }
}
.sel_norm{
    width:100%;
    height:1.28rem;
    display :flex;
    align-items :center;
    padding:0 0.27rem;
    background :#fff;
    font-size:0.36rem;
    color:#494949;
    margin:0.32rem 0;
    >span{
        height:1.28rem;
        line-height :1.28rem;
        font-size:0.32rem;
        color:#888888;
        margin-left:0.54rem;
    }
}
.shopDetail_btn{
    display :flex;
    align-items :center;
    background :#fff;
    border-bottom:0.03rem solid #e3e3e3;
    >li{
        width:50%;
        height:1.31rem;
        display :flex;
        align-items :center;
        justify-content :center;
        >span{
            height:100%;
            line-height :1.31rem;
            text-align :center;
            font-size:0.34rem;
            color:#525252;
        }
        >.shopDetail_btnColor{
            color:#ff4b63;
            border-bottom:0.03rem solid #ff4b63;
        }
    }
    
}
.foot{
    width:100%;
    position :fixed;
    left:0;
    bottom:0;
    display :flex;
    background :#fff;
    .footLeft{
        flex:1;
        display :flex;
        font-size:0.32rem;
        color:#8d8d8d;
        >li{
            width:50%;
            display :flex;
            flex-direction :column;
            align-items :center;
            justify-content :center;
            >img{
                background :pink;
                margin-bottom:0.11rem;
            }
        }
        >.footLeftHome{
            >img{
                width:0.43rem;
                height:0.43rem;
            }
        }
        >.footLeftcollect{
            >img{
                width:0.44rem;
                height:0.4rem;
            }
        }
    }
    .footRight{
        display :flex;
        align-items :center;
        .addShop{
            width:3.6rem;
            height:1.37rem;
            background :#eea103;
            color:#fff;
            font-size:0.36rem;
            text-align :center;
            line-height :1.37rem;

        }
        .ImmBuy{
            width:3.23rem;
            height:1.37rem;
            background :#ff504d;
            color:#fff;
            font-size:0.36rem;
            text-align :center;
            line-height :1.37rem;
        }
    }
}
</style>