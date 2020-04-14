<template>
  <div class="consultHeader">
    <van-cell-group>
      <van-row class="consultHeader-header">
        <van-col span="16"><img class="consultHeader-header-logo" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/launch/logo.png"
            alt="" /></van-col>
        <van-col span="8">
          <div class="consultHeader-header-button" @click="link">
            <img class="consultHeader-header-button-icon" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/launch/咨询.png"
              alt="" />
            在线咨询
          </div>
        </van-col>
      </van-row>
    </van-cell-group>
  </div>
</template>

<script>
  import {
    Row,
    Col,
    Cell,
    CellGroup
  } from 'vant';
  export default {
    name: 'consultHeader',
    data() {
      return {
        yqcUserData: null
      };
    },
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
    },
    mounted() {
      this.yqcUserData = JSON.parse(sessionStorage.getItem('yqcUserData'));
    },
    methods: {
      link() {
        window.location.href =
          'https://webchat.yuntongxun.com/wapchat.html?accessId=9ded0ec0-15a4-11ea-ba1b-71b245892110&fromUrl=在线咨询&urlTitle=医群筹网络科技&clientId=' +
          this.yqcUserData.id + '&otherParams={"nickName":"' + this.yqcUserData.nickname + '"}'
          //  'https://webchat.7moor.com/wapchat.html?accessId=9ded0ec0-15a4-11ea-ba1b-71b245892110&fromUrl=在线咨询&urlTitle=医群筹网络科技&clientId=' +
          // this.yqcUserData.id + '&otherParams={"nickName":"' + this.yqcUserData.nickname + '"}'
      }
    }
  };
</script>

<style scoped lang="less">
  .consultHeader {
    &-header {
      width: 100vw;
      height: 60px;
      overflow: hidden;
      position: fixed;
      top: 0;
      z-index: 1000;
      background: #fff;

      &-logo {
        width: 105px;
        height: 30px;
        margin: 12.5px 15px;
      }

      &-button {
        width: 100px;
        padding: 7px 0;
        margin: 12px 15px 0 0;
        border-radius: 35px;
        text-align: center;
        background: #ff5a5a;
        color: #fff;
        font-size: 14px;

        &-icon {
          width: 16px;
          height: 16px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
</style>
