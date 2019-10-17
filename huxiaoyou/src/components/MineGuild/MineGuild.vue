<!-- 加入工会 -->
<template>
  <div class="AddUnion_father"  @click="hideDiv">
      <div class="submit_c" v-if="submitAfter">
            <div class="PlayerRanking_header">
                <img @click.stop="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
                <span>我的公会</span>
                 <span v-if="disabledXiu" @click="editYes">编辑</span>
                 <span v-else @click="saveYes">保存</span>
            </div>
            <div class="AddUnion_Info">
                    <ul class="AddUnion_InfoList">
                        <li>
                            <div class="Info_name"><span>真实姓名</span>*</div>
                            <input type="text" :disabled='disabledXiu' v-model="nickname" placeholder="请填写您真实的名称">
                        </li>
                        <li>
                            <div class="Info_name"><span>手机号码</span>*</div>
                            <input type="text" :disabled='disabledXiu' maxlength="11" oninput = "value=value.replace(/[^\d]/g,'')" v-model="phone" placeholder="请填写您的正确的手机号">
                        </li>
                        <li>
                            <div class="Info_name"><span>微信号</span>*</div>
                            <input type="text" :disabled='disabledXiu' oninput ="value=value.replace(/[^\w_]/g,'')" v-model="wechatId" placeholder="请填写您的微信号，例：hsdjjkdo">
                        </li>
                        <li>
                            <div class="Info_name"><span>身份证号码</span>*</div>
                            <input type="text" :disabled='disabledXiu' maxlength="18" oninput="value=value.replace(/[\W]/g,'')" @change="cardNumber" v-model="isNumber" placeholder="请填写您身份证的证件号">
                        </li>
                        <li>
                            <div class="Info_name"><span>性别</span>*</div>
                            <ul class="sex">
                                <li @click.stop="sexSelectC(item.id)" v-for="(item,index) in sexData" :key="index"> <img :src="item.id==sexImgIndex?staticImgH+'noselYes.png':staticImgH+'nosel.png'" alt=""> <span>{{item.name}}</span> </li>
                            </ul>
                        </li>
                        <li>
                            <div class="Info_name"><span>年龄</span>*</div>
                            <input type="text" :disabled='disabledXiu' oninput = "value=value.replace(/[^\d]/g,'')" v-model="age" placeholder="请填写您的真实年龄">
                        </li>
                        <!-- 直播 -->
                        <li>
                            <div class="Info_whether">
                                <div class="Info_whethername"><span>是否有常用直播软件</span>*</div>
                                <div :class="[{'setAddressBtnOne':WisDefault==0},{'setAddressBtnTwo':WisDefault==1}]" @click.stop="whetherBtnDefa"><span></span></div>
                            </div>
                            <ul class="Info_platform"  v-if="platformShow">
                                <li @click.stop="platfromSelC(index,item.name)" v-for="(item,index) in LivePlatformData" :key="index"> <img :src="index==platformImgIndex?staticImgH+'noselYes.png':staticImgH+'nosel.png'" alt=""> <span>{{item.name}}</span> </li>
                            </ul>
                            <div  class="Info_other" v-if="platformShow">
                                <div class="Info_otherRight" @click.stop="platformotherC">
                                    <img :src="platformotherImgIndex?staticImgH+'noselYes.png':staticImgH+'nosel.png'" alt=""> 
                                    <span>其他</span>
                                </div>
                                <input :disabled='disabledXiu' v-if="showplatformotherinput" @change="zhiboChange" v-model="inputSoftware" type="text" placeholder="请填写您所用直播软件名称">
                            </div>
                            <input :disabled='disabledXiu' v-if="platformShow" type="text" v-model="softId" placeholder="请填写您所用直播软件的id号">
                        </li>
                        <!-- 短视频 -->
                        <li>
                            <div class="Info_whether">
                                <div  class="Info_whethername"><span>是否有常用短视频 </span>*</div>
                                <div :class="[{'setAddressBtnOne':DisDefault==0},{'setAddressBtnTwo':DisDefault==1}]" @click.stop="DuanBtnDefa"><span></span></div>
                            </div>
                            <ul class="Info_platform" v-if="duanShow">
                                <li @click.stop="shortVideoSelC(index,item.name)" v-for="(item,index) in ShortVideoData" :key="index"> <img :src="index==shortVodeoImgIndex?staticImgH+'noselYes.png':staticImgH+'nosel.png'" alt=""> <span>{{item.name}}</span> </li>
                            </ul>
                            <div class="Info_other" v-if="duanShow"><div class="Info_otherRight" @click.stop="shortVodeootherC"><img :src="shortVodeootherImgIndex?staticImgH+'noselYes.png':staticImgH+'nosel.png'" alt=""> <span>其他</span></div>
                            <input :disabled='disabledXiu' v-model="inputduanValue" @change="videoChange" v-if="showshortVodeootherinput" type="text" placeholder="请填写您所用直播软件名称"></div>
                            <input :disabled='disabledXiu' type="text" v-if="duanShow" v-model="videoId" placeholder="请填写您所用短视频软件的id号">
                        </li>
                        <li>
                            <div class="Info_whether">
                                <div  class="Info_whethername"><span>是否有网店 </span>*</div>
                                <div :class="[{'setAddressBtnOne':WangisDefault==0},{'setAddressBtnTwo':WangisDefault==1}]" @click.stop="WangBtnDefa"><span></span></div>
                            </div>
                            <div class="onlineShop_wrap" v-if="isWang">
                                <div class="onlineShop" @click.stop="wangNameC"><span>{{shopName}}</span> <img :src="staticImgH+'nojian.png'" alt=""></div> <input :disabled='disabledXiu' v-model="isShop" type="text" placeholder="请填写您的网店名">
                                <ul  v-if="onlineShopListxShow" >
                                    <li @click.stop="shopNameC(item.name)" v-for="(item,index) in onlineShopData"  :key="index">
                                        {{item.name}}
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
            </div>
            <!-- <div class="ImmAdd" @click.stop="ImmAddC">立即加入</div> -->
        </div>
        <div class="submitAfterDiv" v-else>

                
                <img :src="submitAfterImg" alt="">
                <div class="sao">扫描二维码添加客服微信</div>
                <div class="successDes">加入工会成功!</div>
                <div class="submit_return" @click.stop="submitReturn">返回</div>
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
  data () {
    return {
        submitAfter:true,
        WisDefault:0,
        DisDefault:0,
        WangisDefault:0,
        sexSelImg:'nosel.png',
        submitAfterImg:'',//加入成功后的页面二维码
        disabledXiu:true,//动态修改可编辑状态，默认不能编辑
        sexData:[
            {
                name:'女',
                id:2,
            },
            {
                name:'男',
                id:1
            }
        ],
        sexImgIndex:0,
        LivePlatformData:[
            {
                name:'花椒'
            },
            {
                name:'YY'
            },
            {
                name:'映客'
            },
            {
                name:'一直播'
            },
            {
                name:'斗鱼'
            },
            {
                name:'快手'
            },
            {
                name:'抖音'
            },
            {
                name:'全民直播'
            },
        ],
        platformImgIndex:-1,
        platformotherImgIndex:false,
        showplatformotherinput:false,
        platformShow:false,
        ShortVideoData:[
            {
                name:'抖音'
            },
            {
                name:'快手'
            },
        ],
        shortVodeoImgIndex:-1,
        shortVodeootherImgIndex:false,
        showshortVodeootherinput:false,
        duanShow:false,
        
        onlineShopData:[
            {
                name:'淘宝'
            },{
                name:'京东'
            },{
                name:'快手'
            }
        ],
        isWang:false,
        onlineShopListxShow:false,


        nickname:'',
        phone:'',
        wechatId:'',
        isNumber:'',
        sex:'',
        age:'',
        software:'',
        inputSoftware:'',
        softId:'',
        isVideo:'',
        inputduanValue:'',
        videoId:'',
        shopName:'淘宝',
        isShop:'',


        // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
        
    };
  },
//   components: {},
   computed:{
        ...mapState(['staticImgH','tokenH'])
    },


  mounted(){
      var obj=qs.stringify({
          type:1
      })
      this.$http.post('api/user/me_gong',obj,{
            headers: {
                'authorization': this.tokenH
            }
         }).then((res)=>{
             var data=res.data.data.result
             this.nickname=data.nickname
             this.phone=data.phone
             this.wechatId=data.wechat_id
             this.isNumber=data.is_number
             this.sex=data.sex
             this.age=data.age
             if(data.software){
                 this.WisDefault=1
                 this.platformShow=true
                this.softId=data.soft_id
                if(this.LivePlatformData.indexOf(data.software)!==-1){
                    this.platformImgIndex=this.LivePlatformData.indexOf(data.software)
                }else {
                    this.platformotherImgIndex=true;
                    this.showplatformotherinput=true
                    this.inputSoftware=data.software
                }
             }
             if(data.is_video){
                 this.DisDefault=1
                 this.duanShow=true
                this.videoId=data.video_id
                if(this.ShortVideoData.indexOf(data.is_video)!==-1){
                    this.shortVodeoImgIndex=this.ShortVideoData.indexOf(data.is_video)
                }else {
                    this.shortVodeootherImgIndex=true;
                    this.showshortVodeootherinput=true
                    this.inputduanValue=data.is_video
                }
             }
             if(data.shop_name){
                 this.WangisDefault=1
                 this.isWang=true
                 this.shopName=data.shop_name
                 this.isShop=data.is_shop
             }
         })
  },

  methods: {
    //   编辑
    editYes(){
        this.disabledXiu=false
    },
    //  加入成功后的返回
    submitReturn(){
        this.$router.push('/')
    },
    //  点击页面任意处隐藏 网店平台列表 
      hideDiv(){
          
          this.onlineShopListxShow=false
      },
      // 身份证验证
    cardNumber(){
         var idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
         iFlag = idCardReg.test(this.idNumber);
         if(!iFlag){
             var self=this
              clearInterval(self.timer2);
                  this.promptContent='您输入的身份证格式有误！'
                  this.showPrompt=true
                  self.timer2=setTimeout(function(){
                        self.showPrompt=false
                        clearInterval(self.timer2);
                  },2000)
              return false;
         }
    },
    //   点击网店平台列表
    shopNameC(name){
        if(this.disabledXiu==false){
             this.shopName=name
             this.onlineShopListxShow=false
        }
       
    },
      wangNameC(){
          if(this.disabledXiu==false){
              this.onlineShopListxShow=true
          }
          
      },
    //   立即加入
      ImmAddC(){
          var obj=qs.stringify({
              nickname:this.nickname,
              phone:this.phone,
              wechat_id:this.wechatId,
              is_number:this.isNumber,
              sex:this.sex,
              age:this.age,
              software:this.software,
              soft_id:this.softId,
              is_video:this.isVideo,
              video_id:this.videoId,
              is_shop:this.isShop,
              shop_name:this.shopName
          })
          this.$http.post('api/player/union_players',obj,{
                headers: {
                    'authorization':this.tokenH
                }
            }).then((res)=>{
                    if(res.data.code==200){
                        this.submitAfter=false
                        this.submitAfterImg=res.data.data.img
                    }else{
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
      zhiboChange(){
          this.software=this.inputSoftware
      },
    //   选择性别
      sexSelectC(id){
          if(this.sexSelectC==false){
                this.sexImgIndex=id
                this.sex=id
          }
          
      },
      whetherBtnDefa(){
          if(this.disabledXiu==false){
              this.softId=''
                this.platformImgIndex=-1
                this.showplatformotherinput=false
                this.platformotherImgIndex=false
                this.software=''
                    this.inputSoftware=''
                    this.WisDefault==0?this.WisDefault=1:this.WisDefault=0
                    if(this.WisDefault==0){
                        this.platformShow=false
                    }else if(this.WisDefault==1){
                            this.platformShow=true
                    }
                }
          
      },
      DuanBtnDefa(){
          if(this.disabledXiu==false){
              this.shortVodeoImgIndex=-1
                this.shortVodeootherImgIndex=false
                this.duanShow=false
                this.inputduanValue=''
                this.isVideo=''
                this.videoId=''
                this.DisDefault==0?this.DisDefault=1:this.DisDefault=0
                if(this.DisDefault==0){
                    this.duanShow=false
                }else if(this.DisDefault==1){
                    this.duanShow=true
                }
          }
          
      },
      WangBtnDefa(){
           if(this.disabledXiu==false){
               this.shopName='淘宝'
                this.isShop='',
                this.WangisDefault==0?this.WangisDefault=1:this.WangisDefault=0
                if(this.WangisDefault==0){
                    this.isWang=false
                }else if(this.WangisDefault==1){
                    this.isWang=true
                }
           }
          
      },
    //   选择直播平台列表
      platfromSelC(index,name){
          if(this.disabledXiu==false){
              this.platformImgIndex=index
                this.software=name
                this.platformotherImgIndex=false
                this.showplatformotherinput=false
            }
          
      },
      shortVideoSelC(index,name){
          if(this.disabledXiu==false){
              this.shortVodeoImgIndex=index
                this.isVideo=name
                this.shortVodeootherImgIndex=false
                this.showshortVodeootherinput=false
          }
          
      },
      platformotherC(){
          if(this.disabledXiu==false){
              this.platformImgIndex=-1;
                this.software='';
                this.inputSoftware=''
                this.platformotherImgIndex=!this.platformotherImgIndex
                if(this.platformotherImgIndex==true){
                    this.showplatformotherinput=true
                }else{
                    this.showplatformotherinput=false
                }
          }
          
      },
      shortVodeootherC(){
          if(this.disabledXiu==false){
              this.shortVodeoImgIndex=-1
                this.isVideo=''
                this.inputduanValue=''
                this.shortVodeootherImgIndex=!this.shortVodeootherImgIndex
                if(this.shortVodeootherImgIndex==true){
                    this.showshortVodeootherinput=true
                }else{
                    this.showshortVodeootherinput=false
                }
          }
          
      },
      videoChange(){
          this.isVideo=this.inputduanValue
      },
      toReturn(){
        this.$router.push('/Mine')
      },
      setAddressBtn(){

      },
  }
}

</script>
<style scoped lang="stylus">
.AddUnion_father{
    letter-spacing :0.04rem;
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
.AddUnion_Info{
    margin:0.4rem;
    padding:0.32rem 0.32rem;
    border-radius:0.133rem;
    box-shadow :0 0.05rem 0.3rem rgba(254, 222, 227, 1);
}

.setAddressBtnOne{
        width:1.253rem;
        height:0.48rem;
        background:rgba(0, 0, 0, 0.1);
        display :flex;
        align-items :center;
        border-radius:3.5rem;
        margin-right:0.27rem;
        >span{
            width:0.373rem;
            height:0.373rem;
            background :rgba(255, 255, 255, 1);
            margin-left:0.13rem;
            border-radius:50%;
             transform :translateX(0);
            transition :all 0.5s;
            color:rgba(0, 0, 0, 0.38);
            font-size:0.27rem;
            line-height :0.373rem;
            text-align:center;
        }
    }
     .setAddressBtnTwo{
       width:1.253rem;
        height:0.48rem;
        background:rgba(255, 193, 203, 1);
        display :flex;
        align-items :center;
        border-radius:3.5rem;
        margin-right:0.27rem;
        >span{
            width:0.43rem;
            height:0.43rem;
            background :#fff;
            margin-left:0.13rem;
            border-radius:50%;
            transform :translateX(0.59rem);
            transition :all 0.5s;
        }
}
.AddUnion_InfoList{
    >li{
        margin-top:0.32rem;
        display :flex;
        flex-direction :column;
        >.Info_name{
            font-size:0.37rem;
            color:#FF0000;
            margin-bottom:0.27rem;
            >span{
                color:#000000;
            }
        }
        >input{
            width:100%;
            height:0.67rem;
            border:0.02rem solid #707070;
            outline:none;
            border-radius:0.08rem;
            letter-spacing :0.04rem;
            padding-left:0.16rem;
            &::-webkit-input-placeholder { 
                font-size:0.32rem;
			    color: rgba(0, 0, 0, 0.38);
            }
            &::-moz-placeholder { 
                 font-size:0.32rem; 
                color: rgba(0, 0, 0, 0.38);
            }
            &:-ms-input-placeholder {
                 font-size:0.32rem;
                color:rgba(0, 0, 0, 0.38);
            }
            &:-moz-placeholder {
                 font-size:0.32rem;
                color: rgba(0, 0, 0, 0.38);
            }
        }
        >.sex{
            display :flex;
            margin-left:0.27rem;
            >li{
                display :flex;
                align-items :center;
                margin-right:1.2rem;
                >img{
                    width:0.24rem;
                    height:0.24rem;
                    margin-right:0.3rem;
                    background :pink;
                    border-radius:50%;
                }
                >span{
                    font-size:0.32rem;
                    color:rgba(0, 0, 0, 0.38)
                    
                }
                >selSex{
                    color:#000;
                }
            }
        }
        >.Info_whether{
            display :flex;
            justify-content :space-between;
            .Info_whethername{
                font-size:0.37rem;
                color:#FF0000;
                margin-bottom:0.27rem;
                >span{
                    color:#000000;
                }
            }
        }
        >.Info_platform{

            display :flex;
            flex-wrap:wrap;
            margin-top:0.27rem;
            margin-left:0.27rem;
           >li{
                display :flex;
                align-items :center;
                margin-right:0.7rem;
                >img{
                    width:0.24rem;
                    height:0.24rem;
                    margin-right:0.18rem;
                    background :pink;
                    border-radius:50%;
                }
                >span{
                    font-size:0.32rem;
                    color:rgba(0, 0, 0, 0.38)
                    
                }
                >selSex{
                    color:#000;
                }
            }
        }
        >.Info_other{
            display:flex;
             margin-top:0.2rem;
            margin-left:0.27rem;
            margin-bottom:0.27rem;
            >.Info_otherRight{
                display :flex;
                align-items :center;
                margin-right:0.3rem;
                >img{
                    width:0.24rem;
                    height:0.24rem;
                    margin-right:0.18rem;
                    background :pink;
                    border-radius:50%;
                }
                >span{
                    font-size:0.32rem;
                    color:rgba(0, 0, 0, 0.38)
                    
                }
                >selSex{
                    color:#000;
                }
            }
            >input{
                border:0;
                border-bottom:0.03rem dotted  rgba(0, 0, 0, 0.2);
                outline :none;
                 &::-webkit-input-placeholder { 
                    font-size:0.32rem;
                    color: rgba(0, 0, 0, 0.38);
                }
                &::-moz-placeholder { 
                    font-size:0.32rem; 
                    color: rgba(0, 0, 0, 0.38);
                }
                &:-ms-input-placeholder {
                    font-size:0.32rem;
                    color:rgba(0, 0, 0, 0.38);
                }
                &:-moz-placeholder {
                    font-size:0.32rem;
                    color: rgba(0, 0, 0, 0.38);
                }
            }
        }
        >.onlineShop_wrap{
            border:0.03rem solid rgba(112, 112, 112, 1);
            border-radius:0.08rem;
            height:0.67rem;
            margin-top:0.21rem;
            display :flex;
            align-items :center;
            position :relative;
            .onlineShop{
                display :flex;
                align-items :center;
                 position :relative;
                 margin-right:0.27rem;
                >span{
                    color:rgba(0, 0, 0, 1);
                    font-size:0.32rem;
                    margin-left:0.16rem;
                    margin-right:0.187rem;
                    
                }
                >img{
                    width:0.27rem;
                    height:0.16rem;
                    margin-right:0.24rem;

                }
                &:before{
                        content:'';
                        width:0.03rem;
                        height:0.48rem;
                        background :rgba(0, 0, 0, 0.38);
                        position :absolute;
                        right:0;
                        top:50%;
                        margin-top:-0.24rem;
                    }
                
            }
            >input{
                border:0;
                outline :none;
                letter-spacing :0.03rem;
                 &::-webkit-input-placeholder { 
                    font-size:0.32rem;
                    color: rgba(0, 0, 0, 0.38);
                }
                &::-moz-placeholder { 
                    font-size:0.32rem; 
                    color: rgba(0, 0, 0, 0.38);
                }
                &:-ms-input-placeholder {
                    font-size:0.32rem;
                    color:rgba(0, 0, 0, 0.38);
                }
                &:-moz-placeholder {
                    font-size:0.32rem;
                    color: rgba(0, 0, 0, 0.38);
                }
            }
            >ul{
                width:1.47rem;
                border:0.03rem solid rgba(112, 112, 112, 1);
                position :absolute;
                bottom:0;
                left:0;
                background :#fff;
                >li{
                    width:100%;
                    height:0.667rem;
                    border-bottom:0.03rem solid rgba(112, 112, 112, 1);
                    text-align:center;
                    line-height:0.667rem;
                    font-size:0.32rem;
                    color:rgba(0, 0, 0, 0.8);
                    &:last-child{
                        border-bottom:0;
                    }
                }
            }
            
        }
    }
}
.ImmAdd{
    width:9.2rem;
    height:1.07rem;
    background :rgba(255, 193, 203, 1);
    font-size:0.347rem;
    color:rgba(255, 255, 255, 1);
    line-height :1.07rem;
    text-align :center;
    margin:0.4rem auto;
}
.submitAfterDiv{
    display:flex;
    flex-direction :column;
    align-items :center;
    >img{
        width:3.5rem;
        height:3.5rem;
        margin-top:0.8rem;
        background :pink;
    }
    >.sao{
        font-size:0.37rem;
        margin-top:0.27rem;
        
    }
    >.successDes{
        font-size:0.53rem;
        margin-top:0.8rem;
        color:rgba(255, 0, 0, 1);
    }
    >.submit_return{
        width:70%;
        height:1rem;
        text-align:center;
        line-height:1rem;
        color:#fff;
        font-size:0.37rem;
        background:rgba(255, 193, 203, 1);
        margin-top:0.8rem;
    }

}

// 提示盒子
.promptFather{
    width:100%;
    position :absolute;
    bottom:50%;
    left:0;
    z-index:10;
    display :flex;
    justify-content :center;
    align-items :center;
    >.prompt{
        padding:0.15rem 0.3rem;;
        background :rgba(0,0,0,0.7);
        color:#fff;
        border-radius:0.5rem;
        font-size:0.32rem;
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
</style><!-- 加入工会 -->
