<!-- 个人资料 -->
<template>
  <div class="MineInformation">
      <div class="MineInfo_title">
        <img @click="InfoReturn" :src="staticImgH+'zuojiantou.png'" alt="">
        <span>个人资料</span>
        <span class="submit" @click="mineHomepage">我的主页</span>
      </div>
      <div class="hideDiv"></div>
      <ul class="MineInfo_List">
        <li>
          <span>头像</span>
          <div class="imgInput">
              <img :src="headPicM" alt="">
              <input type="file" class="upload" @change="uploadFile" ref="inputer" accept="image/*"/>
          </div>
        </li>
        <li @click="changeInfo">
          <span>姓名（或昵称）</span>
          <div class="MineInfo_ListRight" >
            <span>{{nickNameM}}</span><img :src="staticImgH+'MineRight.png'" alt="">
          </div>
        </li>
        <li @click="SignatureReturn">
          <span>个性签名</span>
          <div  class="MineInfo_ListRight">
            <span>{{signatureM}}</span><img :src="staticImgH+'MineRight.png'" alt="">
          </div>
        </li>
        <li @click="secC">
          <span>性别</span>
          <div   class="MineInfo_ListRight">
            <span v-if='sexM==1'>男</span><span v-if='sexM==2'>女</span><img :src="staticImgH+'MineRight.png'" alt="">
          </div>
        </li>
        <li @click="changeAge">
          <span>年龄</span>
          <div  class="MineInfo_ListRight" >
            <span v-if="ageM">{{ageM}}岁</span><img :src="staticImgH+'MineRight.png'" alt="">
          </div>
        </li>
        <li @click="changeHeight">
          <span>身高</span>
          <div  class="MineInfo_ListRight" >
            <span>{{heightM}}cm</span><img :src="staticImgH+'MineRight.png'" alt="">
          </div>
        </li>
        <li @click="changeWeight">
          <span>体重</span>
          <div  class="MineInfo_ListRight" >
            <span>{{weightM}}kg</span><img :src="staticImgH+'MineRight.png'" alt="">
          </div>
        </li>
        <li @click="tocity">
          <span>常驻城市</span >
          <div   class="MineInfo_ListRight">
            <span>{{cityM}}</span><img :src="staticImgH+'MineRight.png'" alt="">
          </div>
        </li>
        <li @click="changeConstellation">
          <span>星座</span >
          <div class="MineInfo_ListRight" >
            <span>{{constellationM}}</span><img :src="staticImgH+'MineRight.png'" alt="">
          </div>
        </li>
        <li @click="toPhoto">
          <span>照片</span>
          <div class="MineInfo_ListRight" >
            <img :src="staticImgH+'MineRight.png'" alt="">
          </div>
        </li>
        <li @click="toVideo">
          <span>视频</span>
          <div class="MineInfo_ListRight" >
            <img :src="staticImgH+'MineRight.png'" alt="">
          </div>
        </li>
      </ul>
      <div class="sign" @click="submit">提交</div>
      <!-- 性别选择 -->
      <div class="sex_wrap" @click="showSexC"  v-if="sexShow">
             <div class="sex">
               <span @click.stop="sexSelC(item.id)" v-for="(item,index) in sexData" :key="index">{{item.name}}</span>
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
  name:'MineInformation',
  data () {
    return {
      sexData:[
        {
          name:'男',
          id:1,
        },
        {
          name:'女',
          id:2
        }
      ],
      sexShow:false, //性别选择盒子默认不显示
      personData:'',//用户资料数据
      headPicM:'',//头像
      nickNameM:'',//名字
      signatureM:"",//个签
      sexM:'',//性别
      ageM:"",//年龄
      heightM:'',//身高
      weightM:'',//体重
      cityM:'',//城市
      constellationM:'',//星座
      blooM:'',//血型
      nationM:'',//民族
      cultureM:'',//生肖
      usernameM:'',//用户名
      userIntroductionM:'',//视频


      // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
        timer2:'',//定时器
        timer3:"",

      // 上传图片
      formData:new FormData(),
      imgLen:0,
      fil:'',
    };
  },
  // components: {},
   computed:{
        ...mapState(['staticImgH','tokenH','nickNamePerX','agePerX','heightPerX','weightPerX','constellationPerX','SignaturePerX','cityNamePerX','tokenH','MineInformationPage'])
    },
  mounted(){
        this.getInformation()
   },
  methods: {
    // 上传视频
    toVideo(){
        this.$router.push('/MineVideo')
    },
    // 去我的主页
    mineHomepage(){
        this.addressIdIsSels('false') //进入选手详情默认不选择地址
        this.PlayerDetailPages('/MineInformation')  //选手详情返回页面
        this.playDetailVoteDivs('false') //选手详情的投票盒子的消失
        this.$router.push('/PlayerDetails')
    },
    // 到选择照片
    toPhoto(){
        this.$router.push('/PresentPhoto')
    },
    // 获取用户信息接口
    getInformation(){
      this.$http.post('api/player/per_sonals').then((res)=>{
          if(res.data.code==200){
              var personData=res.data.data
              this.headPicM=personData.head_pic
              //个签
              if(this.SignaturePerX){
                  this.signatureM=this.SignaturePerX
                }else{
                  this.signatureM=personData.signature
              }
              //城市
              if(this.cityNamePerX){
                  this.cityM=this.cityNamePerX
                }else{
                    this.cityM=personData.city
              }
              //名字
              if(this.nickNamePerX){ 
                    this.nickNameM=this.nickNamePerX;
                }else{
                  this.nickNameM=personData.username
              }
              //年龄
              if(this.agePerX){
                  this.ageM=this.agePerX
                }else {
                  this.ageM=personData.age
              }
              //身高
              if(this.heightPerX){
                  this.heightM=this.heightPerX
                }else {
                  this.heightM=personData.height
              }
              //体重
              if(this.weightPerX){
                 this.weightM=this.weightPerX
                }else {
                  this.weightM=personData.weight
              }
              //星座
              if(this.constellationPerX){
                  this.constellationM=this.constellationPerX
                }else {
                  this.constellationM=personData.constellation
              }
              this.sexM=personData.sex
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
    // 获取图片
     uploadFile(){
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        this.fil = inputDOM.files;
        let len=this.fil.length;
        if(len>1){
          alert('最多可上传1张');
          return false;
        }
        for (let i=0; i < this.fil.length; i++) {
          let size = Math.floor(this.fil[i].size / 1024);
          if (size > 5*1024*1024) {
            alert('请选择5M以内的图片！');
            return false
          }
           this.formData.append('avatar',this.fil[i])
        }
        this.$http.post('api/user/avatar', this.formData).then(res => {
              this.getInformation()
        });
      },
    // 修改昵称
    changeInfo(index){
          this.nickNamePerXs(this.nickNameM)//名字
          this.$router.push('/changeName')
    },
    // 修改年龄
    changeAge(){
        this.agePerXs(this.ageM) //年龄
        this.$router.push('/changeAge')
    },
    // 修改体重
    changeWeight(){
     
        this.weightPerXs(this.weightM) //体重 
         this.$router.push('/changeWeight')
    },
    // 修改星座
    changeConstellation(){
         this.$router.push('/changeConstellation')
    },
    // 我的信息返回
    InfoReturn(){
        this.$router.push(this.MineInformationPage)
    },
    // 修改身高
    changeHeight(){
       this.heightPerXs(this.heightM) //身高
        this.$router.push('/changeHeight')
    },
    // 个性签名跳转
    SignatureReturn(){
      this.SignaturePerXs(this.signatureM)
      this.$router.push('/Signature')
    },
    // 性别盒子显示
    secC(){
      this.sexShow=true;
    },
    // 选择性别
    sexSelC(id){
        this.sexM=id
        this.sexShow=false;
    },
    // 性别盒子消失
    showSexC(){
      this.sexShow=false;
    },
    // 常驻城市
    tocity(){
        this.$router.push('/City')
    },
    // 提交
    submit(){
       var obj=qs.stringify({
          username:this.nickNameM,
          signature:this.signatureM,
          constellation:this.constellationM,
          bloo:this.blooM,
          nation:this.nationM,
          culture:this.cultureM,
          sex:this.sexM,
          age:this.ageM,
          city:this.cityM,
          weight:this.weightM,
          height:this.heightM,
          head_pic:this.headPicM,
          user_introduction:this.userIntroductionM
       })
       this.$http.post('api/player/add_sonals',obj,{
          headers: {
              'authorization': this.tokenH
          }
        }).then((res)=>{
            if(res.data.code==200){
                var self=this
                clearInterval(self.timer2);
                    this.promptContent='提交成功'
                    this.showPrompt=true
                    self.timer2=setTimeout(function(){
                        self.showPrompt=false
                        clearInterval(self.timer2);
                    },1000)
                    if(self.MineInformationPage=='/PlayerDetails'){
                        clearInterval(self.timer3);
                        self.timer3=setTimeout(function(){
                          self.$router.push(self.MineInformationPage)
                            clearInterval(self.timer3);
                        },1500)
                    }
                    
              return false;
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
     ...mapMutations(['specialInfos','nickNamePerXs','cityNamePerXs','SignaturePerXs','agePerXs','heightPerXs','weightPerXs','constellationPerXs','addressIdIsSels','PlayerDetailPages','playDetailVoteDivs']),
    
  }
}

</script>
<style scoped lang="stylus">
.MineInformation{
  width:100%;
  height:100%;
  padding-bottom:0.4rem;
  background:#fff;
}
.MineInfo_title{
  width:100%;
  height:1.23rem;
  display :flex;
  align-items :center;
  justify-content :center;
  padding:0 0.4rem;
  position:fixed;
  top:0;
  left:0;
  background :#fff;
  >img{
    width:0.32rem;
    height:0.56rem;
    position:absolute;
    top:50%;
    margin-top:-0.28rem;
    left:0.4rem;
  }
  >span{
    line-height:0.667rem;
      font-size:0.48rem;
      color:rgba(0, 0, 0, 1);
  }
  >.submit{
    font-size:0.427rem;
    color:rgba(0, 0, 0, 1);
    position:absolute;
    top:50%;
    margin-top:-0.28rem;
    right:0.4rem;
    line-height:0.6rem;
  }
}
.hideDiv{
  height:1.23rem;
}
.MineInfo_List{
  margin:0.4rem 0.27rem;
  border-radius:0.133rem;
  box-shadow :0 0.05rem 0.3rem rgba(241, 241, 241, 0.9);
  >li{
    display :flex;
    align-items :center;
    justify-content :space-between;
    margin:0 0.32rem;
    padding:0.4rem 0;
    font-size:0.347rem;
    border-bottom:0.03rem solid rgba(241, 241, 241, 1);
    >.imgInput{
        width:1.07rem;
        height:1.07rem;
        position :relative;
        >img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius:50%;
        }
        >input{
          width:1.07rem;
            height:1.07rem;
            border-radius:50%;
            position :absolute;
            top:0;
            left:0;
            opacity :0;
            overflow :hidden;
            
        }

    }
    
    >.MineInfo_ListRight{
      color:rgba(51, 51, 51, 0.6);
      font-size:0.32rem;
      display :flex;
      align-items :center;
      >span{
        width:5.5rem;
        text-align:right;
        overflow :hidden;
        text-overflow :ellipsis;
        white-space:nowrap;
      }
      >img{
        width:0.187;
        height:0.293rem;
        margin-left:0.32rem;
      }
    }
  }
}
.sex_wrap{
  width:100%;
  height:100%;
  background :rgba(0,0,0,0.9);
  position :fixed;
  top:0;
  left:0;
  >.sex{
    width:8rem;
    height:2.83rem;
    display :flex;
    flex-direction :column;
    background :#fff;
    border-radius:0.133rem;
    position :absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
    >span{
      width:100%;
      height:1.413rem;
      line-height :1.413rem;
        border-bottom:0.03rem solid rgba(204, 204, 204, 1);
        font-size:0.373rem;
        color:rgba(0, 0, 0, 1);
        padding:0 0.4rem;
        &:last-child{
          border-bottom:0;
        }
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

// 提交
.sign{
  width:9.2rem;
  height:0.8rem;
  line-height 0.8rem; 
  text-align:center;
  border-radius:0.667rem;
  font-size:0.347rem;
  color:rgba(255, 255, 255, 1);
  background :rgba(255, 157, 172, 1);
  margin: 0 auto;
  margin-top:0.4rem;
  
}
</style>