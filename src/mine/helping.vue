<template>
  <div style="padding-top: 60px;">
    <van-cell-group class="helping-header">
      <img
        class="helping-header-logo"
        src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/launch/logo.png"
        alt
      />
      <span class="helping-header-btn" @click="linkLaunch">我也要筹款</span>
    </van-cell-group>
    <van-cell-group class="helping-title">我帮助的筹款</van-cell-group>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        @click="linkShare(item.fundraisingId)"
        v-for="(item,index) in proveArray"
        :key="index"
        class="helping-list"
      >
        <van-image class="helping-list-img" round :src="item.head_url" />
        <div class="helping-list-content">
          <div class="helping-list-content-title">{{item.nickname}}</div>
          <div class="helping-list-content-explain">帮助金额{{item.money}}元 帮忙转发{{item.forwardNum}}次</div>
        </div>
        <p class="helping-list-clear"></p>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { Row, Col, Image, Cell, CellGroup, List } from "vant";
import wx from "weixin-js-sdk";
export default {
  name: "helping",
  data() {
    return {
      num: 0,
      list: [],
      loading: false,
      finished: false,
      numData: 0,
      proveArray: []
    };
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Image.name]: Image,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [List.name]: List
  },
  mounted() {
    this.$wx.hideOptionMenu();
  },
  methods: {
    linkLaunch() {
      this.$router.push({
        path: "/launch"
      });
    },
    linkShare(id) {
      this.$router.push({
        path: "/share",
        query: {
          id: id
        }
      });
    },
    onLoad(num) {
      // 异步更新数据
      let _this = this;
      setTimeout(() => {
        _this
          .$axios({
            method: "post",
            url:
              "/yqc/donation/getMyHelpFundraising?userId=" +
              _this.$route.query.userId +
              "&pageSize=10&pageNum=" +
              _this.numData,
            responseType: "json"
          })
          .then(function(response) {
            console.log(response);
            if (response.data.ret) {
              _this.numData += 1;
              _this.size = response.data.data.size;
              for (let i = 0; i < response.data.data.list.length; i++) {
                _this.proveArray.push(response.data.data.list[i]);
              }
              // 加载状态结束
              console.log(_this.proveArray);
              _this.loading = false;

              // 数据全部加载完成
              if (_this.proveArray.length >= response.data.data.size) {
                _this.finished = true;
              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }, 500);
    }
  }
};
</script>

<style scoped lang="less">
.helping {
  font-size: 16px;
  &-header {
    position: fixed;
    top: 0;
    width: 100vw;
    background: #fff;
    z-index: 1000;
    &-logo {
      width: 105px;
      height: 30px;
      margin: 15px;
    }
    &-btn {
      float: right;
      width: 100px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      color: #fff;
      font-size: 14px;
      background: #ff5a5a;
      border-radius: 35px;
      margin: 10px 15px;
    }
  }
  &-title {
    font-size: 20px;
    font-weight: 800;
    padding: 15px;
  }
  &-list {
    padding: 10px 15px;
    &-img {
      width: 60px;
      height: 60px;
      float: left;
    }
    &-clear {
      clear: both;
    }
    &-content {
      float: left;
      vertical-align: top;
      font-size: 15px;
      width: 250px;
      margin-left: 15px;
      line-height: 25px;
      &-title {
        margin-top: 5px;
        color: #ff5a5a;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &-explain {
      }
    }
  }
}
</style>
