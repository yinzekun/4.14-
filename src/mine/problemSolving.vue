<template>
  <div>
    <img class="problemSolving-logo" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/launch/logo.png"
      alt="">
    <p class="problemSolving-title">常见问题解答</p>
    <div v-if="data != null" v-for="(item,index) in data" :key="index">
      <van-row class="problemSolving-list">
        <van-col span="4" class="problemSolving-list-left">
          <div class="problemSolving-list-left-head">Q{{ item.id }}</div>
          <div class="problemSolving-list-left-triangle"></div>
        </van-col>
        <van-col span="16" class="problemSolving-list-leftCenter">
          <div>{{ item.question }}</div>
        </van-col>
      </van-row>
      <van-row class="problemSolving-list">
        <van-col span="4">
        </van-col>
        <van-col span="16" class="problemSolving-list-rightCenter">
          <div>
            {{ item.answer }}
          </div>
        </van-col>
        <van-col span="4" class="problemSolving-list-right">
          <div class="problemSolving-list-right-head">
            <img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/mine/logo.png" alt="">
          </div>
          <div class="problemSolving-list-right-triangle"></div>
        </van-col>
      </van-row>
    </div>
    <van-row class="problemSolving-list">
      <van-col span="4" class="problemSolving-list-left">
      </van-col>
      <van-col span="16" class="problemSolving-list-leftCenter">
        <div>更多问题请识别二维码添加客服微信，或拨打电话 <a href="tel:400-609-9595">400-609-9595</a></div>
      </van-col>
    </van-row>

    <img class="problemSolving-codeImg" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/share/eCode.png"
      alt="">
  </div>
</template>

<script>
  import {
    Row,
    Col
  } from 'vant';
  export default {
    name: 'problemSolving',
    data() {
      return {
        data: null
      };
    },
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
    },
    mounted() {
      this.$wx.hideOptionMenu();
      let _this = this;
      _this.$axios({
        method: 'get',
        url: '/yqc/answer/getAnswer',
        responseType: 'json'
      }).then(function(response) {
        if (response.data.ret) {
          let data = response.data.data;
          for (let index in data) {
            data[index].question = data[index].question.slice(2)
          }
          _this.data = data
        }
      }).catch(function(error) {
        console.log(error);
      });
    },
    methods: {}
  };
</script>

<style scoped lang="less">
  .problemSolving {
    font-size: 16px;

    &-codeImg {
      width: 95px;
      height: 95px;
      display: block;
      margin: 0 auto 40px;
    }

    &-logo {
      width: 140px;
      height: 40px;
      display: block;
      margin: 15px auto;
    }

    &-title {
      color: #FF5A5A;
      font-size: 17px;
      text-align: center;
    }

    &-list {
      padding: 15px;

      &-left {
        position: relative;
        height: 40px;

        &-head {
          background: #FF5A5A;
          font-size: 15px;
          text-align: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;
          line-height: 30px;
          color: #fff;
          margin-top: 5px;
        }

        &-triangle {
          position: absolute;
          right: 0;
          top: 12.5px;
          border-bottom: 7.5px solid rgba(0, 0, 0, 0);
          border-left: 10px solid rgba(0, 0, 0, 0);
          border-right: 10px solid #FF5A5A;
          border-top: 7.5px solid rgba(0, 0, 0, 0);
        }
      }

      &-leftCenter {
        min-height: 20px;
        line-height: 20px;
        background: #FF5A5A;
        color: #fff;
        padding: 10px;
        font-size: 15px;
        text-align: justify;

        a {
          color: #fff;
          text-decoration: underline;
        }
      }

      &-right {
        position: relative;
        height: 40px;

        &-head {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;
          margin-top: 5px;
          position: absolute;
          background: #F5F5F5;
          right: 0;

          img {
            display: block;
            width: 18px;
            height: 18px;
            margin: 6px auto;
          }
        }

        &-triangle {
          position: absolute;
          left: 0;
          top: 12.5px;
          border-bottom: 7.5px solid rgba(0, 0, 0, 0);
          border-right: 10px solid rgba(0, 0, 0, 0);
          border-left: 10px solid #F5F5F5;
          border-top: 7.5px solid rgba(0, 0, 0, 0);
        }
      }

      &-rightCenter {
        min-height: 20px;
        padding: 10px;
        line-height: 20px;
        background: #F5F5F5;
        font-size: 14px;
        color: #666666;
        text-align: justify;
      }
    }
  }
</style>
