<!--  -->
<template>
  <div class="PresentVideo">
       <div class="PlayerRanking_header">
          <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
          <span>添加照片</span>
		  <div class="PresentPhoto_admin" @click="delFlag=!delFlag">管理</div>
      </div>
      <ul class="videoList">
          <li v-for="(item,index) in photoDataList" :key="index">
            <img :src="item.src" alt="">
            <div v-if="delFlag" class="gxuan" @click="delPhoto(item.src)">删除</div>
          </li>
      </ul>
      <div class="right_wrap">
            <div class="right">
                添加照片
                <span><img :src="staticImgH+'tianjia.png'" alt=""></span>
                <input type="file" class="upload" @change="uploadFile" ref="inputer" accept="image/*"/>
            </div>
      </div>
      <div class="login_wrap" v-if="lodingShow">
         <div class="loginImg">
           <img :src="staticImgH+'jiazai.gif'" alt="">
         </div>
      </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {mapMutations} from 'vuex'
  import qs from 'qs'

  export default {
    name: 'PresentPhoto',
    data() {
      return {
        delFlag: false,
        formData: new FormData(),
        imgLen: 0,
        fil: '',
        photoDataList: [],
        lodingShow:false, //加载状态默认不显示
      };
    },

//   components: {},

    computed: {
      ...mapState(['staticImgH', 'tokenH'])
    },

    mounted() {
      this.photoData()
    },

    methods: {
      delPhoto(src) {
        this.lodingShow=true
        // @TODO 个人视频删除，感觉接口调用的不对
        this.$http.delete('api/player/photo_introduction', {
          headers: {
            'authorization': this.tokenH
          },
          params: {
            src: src
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.lodingShow=false
            this.photoDataList = this.photoDataList.filter(value => value.src !== src)
            this.alertText("图片删除成功")
          }else{
            this.lodingShow=false
            this.alertText(res.data.msg)

          }
        })
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
      photoData() {
        this.$http.post('api/user/info').then((res) => {
          if(res.data.code==200){
              this.lodingShow=false
              this.photoDataList = res.data.data.photo_introduction
          }else{
              this.lodingShow=false
              this.alertText(res.data.msg)
          }
            
        })
      },
      toReturn() {
        this.$router.push('/MineInformation')
      },
      uploadFile() {
            this.lodingShow=true
            let inputDOM = this.$refs.inputer;
            // 通过DOM取文件数据
            this.fil = inputDOM.files;
            let oldLen = this.imgLen;
            let len = this.fil.length + oldLen;
            
            if (len > 4) {
              this.lodingShow=false
              alert('最多可上传4张，您还可以上传' + (4 - oldLen) + '张');
              return false;
            }

            for (let i = 0; i < this.fil.length; i++) {
              let size = Math.floor(this.fil[i].size / 1024);
              if (size > 5 * 1024 * 1024) {
                alert('请选择5M以内的图片！');
                this.lodingShow=false
                return
              }
              this.imgLen++;
              this.formData.append('photo_introduction', this.fil[i])
            }
            
            this.$http.post('api/player/photo_introduction', this.formData).then(res => {
                    this.$refs.inputer.value=""
                    if(res.data.code==200){
                        this.lodingShow=true
                        this.photoData()
                    }else{
                      this.lodingShow=false
                        this.imgLen--
                        this.alertText(res.data.msg)
                    }
            });
      },
    }
  }

</script>
<style scoped lang="stylus">
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
	>.PresentPhoto_admin{ font-size:0.42rem;}
}
.right_wrap{
  width:100%;
  background :rgba(0,0,0,0.1);
  display :flex;
  align-items :center;
  justify-content :center;
  padding:0.3rem 0;
  position :fixed;
  bottom:0;
  left:0;
}
.right{
    position :relative;
    display:flex;
    align-items :center;
    font-size:0.4rem;
        >span{
          margin-left:0.32rem;
            color:rgba(0, 0, 0, 1);
            >img{ 
              width:0.8rem;
            }
        }
        >input{
            width:100%;
			      height:0.8rem;
            opacity :0;
            position :absolute;
            top:0;
            left:0;
            z-index:999;
        }
    }
.videoList{
    width:100%;
	min-height:14.6rem;
    padding-left:0.4rem;
    margin-top:0.27rem;
    >li{
        width:4.44rem;
        height:4.44rem;
        margin-bottom:0.27rem;
		display:inline-block;
		margin-right:0.31rem;
        >img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius:0.2rem;
          display:block;
        }
    }
}
.login_wrap{
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.9);
  position:fixed;
  top:0;
  left:0;
  z-index:999;
  .loginImg{
    width:1.28rem;
    height:1.28rem;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
    >img{
      width:100%;
      height:100%;
    }
  }
}
.gxuan{ margin-top:-0.9rem; height:0.9rem; background:rgba(0,0,0,0.5); position:relative; width:4.44rem; color:#fff; text-align:center; line-height:0.9rem; font-size:0.48rem; border-radius:0 0 0.2rem 0.2rem;}
</style>
