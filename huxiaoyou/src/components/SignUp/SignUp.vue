<!-- 报名通道 -->
<template>
  <div class="SignUp">
      <div >
            <div class="PlayerRanking_header">
                <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
                <span>赛事报名</span>
            </div>
            <div class="BeforeSubmit">
                  <ul class="sign_btn">
                    <li v-for="(item,index) in signUpData" :key='index'>{{item.name}}</li>
                  </ul>
                  <ul class="SignUp_list">
                    <li>
                        <div class="SignUp_infoName"><span>名称（或昵称）</span>*</div>
                        <input type="text" v-model="username" placeholder="请填写您的名称">
                    </li>
                    <li>
                      <div  class="SignUp_infoName"><span>手机号码</span>*</div>
                      <input  maxlength="11" oninput = "value=value.replace(/[^\d]/g,'')" type="text"  v-model="tel" placeholder="请填写您的手机号码">
                    </li>
                    <li>
                      <div  class="SignUp_infoName"><span>微信号</span></div>
                      <input   type="text" oninput ="value=value.replace(/[^\w_]/g,'')"  v-model="wechatId" placeholder="请填写您的微信号">
                    </li>
                    <li>
                            <div class="SignUp_infoName"><span>性别</span>*</div>
                            <ul class="sex">
                                <li @click.stop="sexSelectC(item.id)" v-for="(item,index) in sexData" :key="index"> <img :src="item.id==2?staticImgH+'noselYes.png':staticImgH+'nosel.png'" alt=""> <span>{{item.name}}</span> </li>
                            </ul>
                        </li>
                    <li>
                      <div  class="SignUp_infoName"><span>报名赛区</span>*</div>
                      <select v-model="selectValue">
                          <option value ="">请选择</option>
                          <option :value ="item.id" v-for="(item,index) in divisionData" :key="index">{{item.names}}</option>
                        </select>
                    </li>
                    <li>
                      <div  class="SignUp_infoName"><span>选手照片</span>*</div>
                      <div class="form-group">
                            <ul class="upload-imgs">
                              <li :class="['uploadimgs_first',{'uploadimgs_opacity':uploadimgsOpacity}]">
                                <input type="file" class="upload" id="upload_img" @change="addImg" ref="inputer" multiple accept="image/*"/>
                                <a class="add"><p>照片上传</p></a>
                              </li>
                                <li>
                                <p class="img"><img  :src="img"><a class="close" @click="delImg(key)">×</a></p>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <!-- <li>
                      <span>身份证号*</span>
                      <input maxlength="18" oninput="value=value.replace(/[\W]/g,'')" @change="cardNumber" type="text" v-model="idNumber" placeholder="请填写您的身份证号">
                    </li> -->
                    <!-- <li>
                      <div><span>名称（昵称）</span>*</div>
                      <div class="country">
                      <span>中国</span> 
                      </div> -->
                      <!-- 市 -->
                      <!-- <div class="cityDiv"  @click="citydiv">
                        {{cityValue}}
                        <ul   v-if="citySHow">
                          <li  @click.stop="citySel(item.id,item.name)" v-for="(item,index) in cityData" :key="index">{{item.name}}</li>
                        </ul>
                      </div>
                    </li> -->
                  </ul>
                  <div class="SignUp_btn" @click="SignUpBtn">提交</div>
            </div>
            <div class="remind">
              <span class="remind_name">重要提醒：</span>
              <div class="remind_des">
                每日通过微信和直播等分享“<span>赛事投票助力卡包</span>”并被购买成功，立得所分享卡包金额10倍的投票数，同时赢得所分享卡包金额30%的现金奖励。加入“歌游天使直播公会”，分享卡包成功后现金奖励立升至40%！
              </div>
              <span class="remind_btn" @click="addUnion">立即加入公会</span>
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
      <!-- 恭喜您报名成功  -->
      <div class="sign_success_wrap"  v-if="showSignSuccess">
         <div class="sign_success" >
              <div class="sign_Cha"><img @click.stop="signSuccessSha"  :src="staticImgH+'cha.png'" alt=""></div>
              <div class="sign_succeddImg"><span>恭喜您报名成功</span><img  :src="staticImgH+'sign_success.png'"></div> 
              <span class="sign_succeddtext">您获得了一个多赚10%的机会！</span>
              <div class="sign_succeddBtn" @click.stop="addUnion">去了解</div>
              <img class="erweima_img" :src="erweimaImg" alt="">
              <span class="erweima_des">华北客服微信二维码</span>
              <img class="erweima_down" :src="staticImgH+'erweima_down.png'" alt="">
         </div>
      </div>
       <!-- 提示只能女性参与报名  -->
      <div class="sign_fail_wrap" v-if="showSignFail">
         <div class="sign_fail">
              <div class="sign_fail_Cha"><img @click.stop="signFailSha"  :src="staticImgH+'cha.png'" alt=""></div>
              <div class="sign_failImg"><img  :src="staticImgH+'sign_fail.png'"></div> 
              <span class="sign_failtext">您可以加入公共参加分享赚钱活动</span>
              <div class="sign_failBtn" @click.stop="addUnion">去了解</div>
         </div>
      </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import qs from 'qs'
export default {
  data () {
    return {
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
      signUpData:[
        {
          name:'报名条件'
        },
        {
          name:'赛事规则'
        },
        {
          name:'赛事奖励'
        },
        {
          name:'投票规则'
        },
        {
          name:'赛区介绍'
        },
      ],
      showSignSuccess:false,//报名成功提示默认消失
      showSignFail:false,//报名失败提示默认消失
      divisionData:'',  //赛区数据
      erweimaImg:'',//提交成功后的二维码图片
      uploadimgsOpacity:false,  //  个人形象的显示与消失
      
      
      username:'',//用户名
      tel:"",//手机号
      wechatId:'',//微信号
      sex:2,//性别
      selectValue:'',//赛区id
      invitationCode:'',//邀请码
       //传图片
      formData:new FormData(), 
      img:'',
      
      // 提示盒子
      promptContent:'', //提示盒子的内容
      showPrompt:false,//提示盒子的吸收和显示
      timer2:'',

      idNumber:'',//身份证号
      cityValue:'城市',
      cityData:'',  //城市数据
      citySHow:false,  //城市列表显示
    };
  },
  computed:{
        ...mapState(['staticImgH'])
    },
  mounted() {
    // 赛区列表
        this.divisionListData()
    //判断是否是分享出去的 截取邀请码字段
        this.getCode()
  },
  methods: {
    //判断是否是分享出去的 截取邀请码字段
        getCode(){
              var shopUrl = window.location.href
              //var shopUrl = 'http://app.aibebi.net/#/SignUp?Invitation_code=1482'
              //截取？后的邀请码
              var shopCan, value;  //初始化 
              shopCan = shopUrl.indexOf("#")  //找到#的下标
              shopUrl=shopUrl.substr(shopCan+1)
              shopCan=shopUrl.indexOf('?')
              if(shopCan > 0){
                  shopUrl = shopUrl.substr(shopCan + 1)  //截取？后面的内容
                  var shopArr = shopUrl.split('&') //分割成数组 
                  var shopUrlId = {};// 初始化对象 
                  for(var i = 0; i < shopArr.length; i++) {//循环shopArr数组
                      shopCan = shopArr[i].indexOf("=");  //找到=号的下标
                      if(shopCan > 0){ //判断有没有=
                          value = shopArr[i].substring(shopCan + 1); //找到=后面的值并截取     =>value
                          shopCan = shopArr[i].substring(0, shopCan);//找到=前面的值  =》key
                          shopUrlId[shopCan] = value;  // key value放到shopUrlId对象里
                      }
                  }
                  if(shopUrlId.Invitation_code){
                      this.invitationCode=shopUrlId.Invitation_code
                  }else{
                      this.invitationCode=''
                  }
            }
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
    // 赛区列表
        divisionListData(){
            this.$http.post('/api/division/list').then((res)=>{
                if(res.data.code==200){
                    this.divisionData=res.data.data
                }else{
                    this.alertText(res.data.msg)
                }
            })
        },
    // 点报名成功提示上的X
        signSuccessSha(){
          this.$router.push('/')
        },
     // 点报名失败提示上的X
        signFailSha(){
          this.showSignFail=false
        },
     //   选择性别
        sexSelectC(id){
            if(id==1){
              this.showSignFail=true
            }
        },
    // 跳加入公会页面
        addUnion(){
          this.AddunionPages('/SignUp')
            this.$router.push('/AddUnion')
        },
    // 返回
        toReturn(){
            this.$router.push('/')
        },
    // 上传图片 1
          addImg(event){
              if(event.target.files[0]){
                this.uploadimgsOpacity=true
                var size = Math.floor(event.target.files[0].size / 1024);
              }else{
                return false
              }
              if (size > 1*1024*1024) {
                  alert('请选择1M以内的图片！');
                  return false
              }
              var objurl = this.getObjectURL(event.target.files[0])
              this.img=objurl
          },
    // 上传图片 2
          getObjectURL(file) {  
              var url = null ;   
              // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已  
              if (window.createObjectURL!=undefined) { // basic  
                  url = window.createObjectURL(file) ;  
              } else if (window.URL!=undefined) { // mozilla(firefox)  
                  url = window.URL.createObjectURL(file) ;  
              } else if (window.webkitURL!=undefined) { // webkit or chrome  
                  url = window.webkitURL.createObjectURL(file) ;  
              }  
              return url ; 
          },
     // 提交
          SignUpBtn(){
                this.formData=new FormData()
                if(!this.username){
                    this.alertText('请输入您的姓名！')
                }else if(!this.tel){
                    this.alertText('请输入您的手机号！')
                }else if(!this.sex){
                    this.alertText('请选择性别！')
                }else  if(!this.selectValue){
                    this.alertText('请选择赛区')
                }else if(!this.$refs.inputer.files[0]){
                    this.alertText('请选择您的照片！')
                } 
                this.formData.append('photo_introduction',this.$refs.inputer.files[0]);
                this.formData.append('division_id',this.selectValue);
                this.formData.append('username',this.username);
                this.formData.append('tel',this.tel);
                this.formData.append('wechat_id',this.wechatId);
                this.formData.append('sex',this.sex);
                this.formData.append('parent_invite_code',this.invitationCode)
                this.$http.post('api/player/sign_up',this.formData).then((res) => {
                        if(res.data.code==200){
                            this.showSignSuccess=true
                            this.erweimaImg=res.data.data.img
                        }else{
                             this.alertText(res.data.msg)
                        }
                });
          },
       ...mapMutations(['AddunionPages']),
       // 身份证验证
        cardNumber(){
            var idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            iFlag = idCardReg.test(this.idNumber);
            if(!iFlag){
                this.alertText('您输入的身份证格式有误！')
            }
        },
    // 城市地址盒子显示
          citydiv(){
              this.citySHow=!this.citySHow
          },
    // 选择城市地址
          citySel(name){
              this.citySHow=false  //城市地址盒子消失
              this.cityValue=name 
          },

  },
        
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
.sign_btn{
  display:flex;
  flex-wrap:wrap;
  margin:0.27rem 0.53rem;
  align-items :center;
  >li{
      width:2.4rem;
        height:0.64rem;
        background :rgba(255, 157, 172, 1);
        font-size:0.347rem;
        color:rgba(255, 255, 255, 1);
        line-height:0.64rem;
        text-align:center;
        border-radius:0.667rem;
        margin-bottom:0.32rem;
        margin-right:0.4rem;
        &:nth-of-child(3){
          margin-right:0;
        }
    }
  
}
.upload-imgs{margin: 0.27rem 0 0 0;overflow: hidden;font-size: 0;position :relative;}
.uploadimgs_first{
  position :absolute;
  top:0;
  left:0;
  z-index:900;
}
.uploadimgs_opacity{
  opacity :0;
}
.upload-imgs li{width: 3.15rem;height: 3.15rem;font-size: 0.373rem;display: inline-block;padding: 0.27rem;margin-right: 0.67rem;border: 0.053rem dashed #ccc;text-align: center;vertical-align: middle;}

.upload-imgs .add{display: block;background-color: #ccc;color: #ffffff;height: 2.51rem;line-height:2.51rem;padding: 0.213rem 0;}
.upload-imgs li .upload{opacity :0;position: absolute;top: 0;bottom: 0;left: 0;right: 0;width: 3.15rem;height: 3.15rem;}
.upload-imgs .img img{width:100%;vertical-align: middle;}
.upload-imgs .img .close{display: none;}
.upload-imgs li:hover .img .close{display: block;position: absolute;right: -0.16rem;top: -0.27rem;line-height: 1rem;font-size: 0.6rem;}
.SignUp{
  width:100%;
  background:#fff;
}
.SignUp_img{
  width:100%;
  >img{
    width:100%;
    height:auto;
  }
  
}
.SignUp_img_header{
    width:100%;
    position :relative;
    >img{
      width:100%;
      height:auto;
    }
    >span{
      width:100%;
      height:0.7rem;
      text-align :center;
      line-height :0.7rem;
      
    }
  }
.SignUp_list{
  margin:0.4rem;
  padding:0.27rem;
   border-radius:0.133rem;
    box-shadow :0 0.05rem 0.3rem rgba(254, 222, 227, 1);
  >li{
    display :flex;
    flex-direction :column;
    margin-bottom:0.4rem;
     >.SignUp_infoName{
            font-size:0.37rem;
            color:#FF0000;
            margin-bottom:0.27rem;
            >span{
                color:#000000;
            }
      }
      // 性别
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
      >input{
        width:100%;
        height:0.667rem;
        border:0.02rem solid rgba(112, 112, 112, 0.6);
        outline:none;
        border-radius:0.16rem;
        padding-left:0.1rem;
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
    .cityDiv{
      height:0.9rem;
      border:0.03rem solid #dddddd;
      position :relative;
      margin-bottom:0.27rem;
      margin-left:0.27rem;
      line-height :0.9rem;
      padding-left:0.27rem;
      font-size:0.37rem;
      >ul{
        height:10rem;
        border:0.03rem solid #dddddd;
        position :absolute;
        background :#fff;
        top:0.9rem;
        z-index:999;
        overflow :hidden;
        overflow-y:scroll;
        >li{
          font-size:0.37rem;
          margin-bottom:0.32rem;
        }
      }
    }
    >span{
      font-size:0.45rem;
      color:#d84589;
      margin-bottom:0.27rem;
    }
    >select{
       height:0.667rem;
        border:0.02rem solid rgba(112, 112, 112, 0.6);
        outline:none;
        border-radius:0.16rem;
        padding-left:0.1rem;
        background :#fff;
        color:rgba(0, 0, 0, 0.38);
        font-size:0.32rem;
        >option{
          width:100%;
        }
    }
    >.selPhone{
      width:2.667rem;
      height:2.667rem;
      line-height :2.667rem;
      border:0.03rem dashed #d9d9d9;
      font-size:0.32rem;
      text-align :center;
      color:#b4b4b6;
      margin-left:0.2rem;
    }
    >.country{
      display :flex;
      margin-bottom:0.27rem;
      >span{
        height:0.9rem;
        font-size:0.34rem;
        margin-left:0.2rem;
        padding:0 0.3rem;
        border:0.03rem solid #dddddd;
        line-height :0.9rem;
      }
      
    }
   
  }
 
}
.AngelUnion{
    display :flex;
    flex-direction :row	;
    align-items :center;
    justify-content :center;
    margin-top:0.5rem;
    >span{
      margin-left:0.2rem;
      font-size:0.373rem;
    }
     >i{
      width:0.373rem;
      height:0.373rem;
      border:0.03rem solid #ccc;
      margin-left:0.32rem;
      border-radius:50%;
    }
    >.sel{
      background :#fb2180;
    }
    >.xieyi{
      font-size:0.27rem;
      color:#fb2180;
    }
  }
.service{
  width:100%;
  font-size:0.373rem;
  color:#454543;
  display :flex;
  align-items :center;
  justify-content :center;
  >span{
    color:#5f5f61;
  }
}
.SignUp_btn{
  width:9.2rem;
  height:0.8rem;
  background :rgba(255, 157, 172, 1);
  color:rgba(255, 255, 255, 1);
  font-size:0.347rem;
  margin:0.4rem auto;
  text-align :center;
  line-height:0.8rem;
  border-radius:0.667rem;
}
.AfterSubmit{
  .AfterSubmit_img{
    width:100%;
    >img{
      width:100%;
      height:auto;
    }
  }
  .AfterSubmit_des{
    width:100%;
    display :flex;
    flex-direction :column;
    align-items :center;
    color:#ff388a;
    font-size:0.48rem;
    margin-top:0.32rem;
    >span{
      color:#61615f;
      font-size:0.373rem;
      margin-top:0.27rem;
    }
  }
  .AfterSubmit_btn{
    width:80%;
  height:1rem;
  background :#fb2180;
  color:#fff;
  font-size:0.45rem;
  margin:0.8rem auto;
  text-align :center;
  line-height:1rem;
  }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
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

.remind{
  display:flex;
  flex-direction :column;
  padding:0.4rem;
      >.remind_name{
        color:rgba(236, 10, 66, 1);
        font-size:0.427rem;
        margin-bottom:0.2rem;
      }
      >.remind_des{
        font-size:0.32rem;
        color:rgba(0, 0, 0, 1);
        line-height :0.45rem;
        >span{
          color:rgba(236, 10, 66, 1);
        }
      }
      >.remind_btn{
           font-size:0.373rem;
          color:rgba(236, 10, 66, 1);
          margin:0 auto;
          margin-top:0.27rem;
      }

}

.submitAlert_wrap{
  width:100%;
  height:100%;
  position:fixed;
  top:0;
  left:0;
  z-index:999;
  background:rgba(0, 0, 0, 0.9);
  display:flex;
  justify-content :center;
  align-items :center;
  >.submitAlert{
    display:flex;
    flex-direction :column;
    align-items :center;
    >.submitAlert_cha{
      width:100%;
      margin-top:2.453rem;
      text-align:right;
      padding-right:1.28rem;
      >img{
        width:0.8rem;
        height:0.747rem;
      }
    }
    >.submitAlert_img{
      width:100%;
      text-align:right;
      margin-bottom:0.213rem;
      >img{
        width:9.44rem;
      }
    }
    >.grasp{
        width:3.6rem;
        height:0.907rem;
        position:relative;
        text-align:center;
        line-height:0.907rem;
        font-size:0.373rem;
        color:rgba(222, 137, 162, 1);
        margin:0 auto;
        margin-bottom:1.333rem;
        background:url('/static/mock/img/bao_btn.png') no-repeat;
        background-size:100% 100%;
    }
    >.erweima{
      display:flex;
      flex-direction :column;
      align-items :center;
      >img{
        width:2.16rem;
        height:2.16rem;
        margin-bottom:0.4rem;
      }
      >span{
        font-size:0.373rem;
        color:rgba(255, 255, 255, 1);
      }
    }
    >.submitAlert_btn{
      display:flex;
      >span{
        width:50%;
      }
    }
  }
}
// 报名成功提示
.sign_success_wrap{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    background:rgba(0,0,0,0.9);
    z-index:999;
    .sign_success{
        margin-top:0.5rem;
        display:flex;
        flex-direction :column;
        align-items:center;
        >.sign_Cha{
          width:5.3rem;
          text-align:right;
          >img{
            width:0.493rem;
            height:0.493rem;
            margin-right:0.187rem;
          }
        }
        >.sign_succeddImg{
            width:5.3rem;
            height:6rem;
            position:relative;
          >img{
            width:5.3rem;
            height:6rem;
          }
          >span{
              position:absolute;
              top:0.18rem;
              left:1.2rem;
              font-size:0.373rem;
              color:rgba(255, 157, 172, 1);
          }
          
        }
        >.sign_succeddtext{
          font-size:0.43rem;
          color:rgba(236, 10, 66, 1);
          line-height:0.5rem;
          margin-top:0.27rem;
          margin-bottom:0.4rem;
        }
        >.sign_succeddBtn{
          width:3.95rem;
          height:0.8rem;
          border-radius:0.67rem;
          background:rgba(255, 157, 172, 1);
          font-size:0.347rem;
          color:rgba(255, 255, 255, 1);
          text-align :center;
          line-height:0.8rem;
        }
        >.erweima_img{
          width:2rem;
          height:2rem;
          margin-top:0.8rem;
          margin-bottom:0.27rem;
        }
        >.erweima_des{
          font-size:0.32rem;
          color:rgba(255, 255, 255, 1);
        }
        >.erweima_down{
          width:0.3rem;
          height:0.32rem;
          margin-top:0.1rem;
        }
    }
}
// 报名失败提示
.sign_fail_wrap{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    background:rgba(0,0,0,0.9);
    z-index:999;
    .sign_fail{
        margin-top:1.6rem;
        display:flex;
        flex-direction :column;
        align-items:center;
        >.sign_fail_Cha{
          width:7.91rem;
          text-align:right;
          >img{
            width:0.493rem;
            height:0.493rem;
            margin-right:0.187rem;
          }
        }
        >.sign_failImg{
          width:7.88rem;
          height:8.9rem;
          position:relative;
          >img{
            width:7.88rem;
            height:8.9rem;
          }
          >span{
              position:absolute;
              top:0.33rem;
              left:2rem;
              font-size:0.373rem;
              color:rgba(255, 157, 172, 1);
          }
        }
        >.sign_failtext{
          font-size:0.43rem;
          color:rgba(236, 10, 66, 1);
          line-height:0.5rem;
          margin-top:0.27rem;
          margin-bottom:0.4rem;
        }
        >.sign_failBtn{
          width:3.95rem;
          height:0.8rem;
          border-radius:0.67rem;
          background:rgba(255, 157, 172, 1);
          font-size:0.347rem;
          color:rgba(255, 255, 255, 1);
          text-align :center;
          line-height:0.8rem;
        }
    }
}
</style>