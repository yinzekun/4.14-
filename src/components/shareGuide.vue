<template>
  <div class="shareGuide">
    <van-popup v-model="showShare" position="top">
      <div class="shareGuide-nav">
        <img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/点击分享.png" alt="">
      </div>
    </van-popup>
  </div>
</template>

<script>
  import { Popup } from 'vant';
export default {
	name: 'shareGuide',
	data() {
		return {
      showShare:false
    };
	},
	components: {
    [Popup.name]: Popup,
	},
	mounted() {},
	methods: {
    shareGuideShowFun(e) {
      this.showShare = true;
    }
  }
};
</script>

<style scoped lang="less">
  .shareGuide{
    &-nav{
      width: 100vw;
      background: rgba(0,0,0,0);
      img{
        width: 80vw;
        margin-top: 15px;
        margin-left: 15vw;
      }
    }
  }
</style>
<style>
  .shareGuide .van-popup{
    background: rgba(0,0,0,0);
  }
</style>
