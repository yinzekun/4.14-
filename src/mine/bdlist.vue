<template>
  <div id="fundraisingList">
    <div class="bdlist">
      <div class="bdlistText">
        <div class="dvf">
          <span class="bdtext2">{{getList.smConditionLaunchNum}}</span>
          <img src="../assets/医群筹_03.jpg" alt class="yiqun" />
        </div>
        <span class="bdtext1">当月捐款大于两千</span>
      </div>
      <div class="bdlistText">
        <div class="dvf">
          <span class="bdtext2">{{getList.totalConditionLaunchNum}}</span>
          <img src="../assets/医群筹_06.png" alt class="yiqun" />
        </div>
        <span class="bdtext1">捐款超过两千</span>
      </div>
      <div class="bdlistText">
        <div class="dvf">
          <span class="bdtext2">{{getList.smLaunchNum}}</span>
          <img src="../assets/医群筹_11.jpg" alt class="yiqun" />
        </div>
        <span class="bdtext1">当月捐款人数</span>
      </div>
      <div class="bdlistText">
        <div class="dvf">
          <span class="bdtext2">{{getList.totalLaunchNum}}</span>
          <img src="../assets/医群筹_13.jpg" alt class="yiqun" />
        </div>
        <span class="bdtext1">捐款人数</span>
      </div>
    </div>
    <!-- <div class="fundraisingList-list" v-if="data != null && data.length != 0">
      <div
        @click.stop="fundraisingFun(item.id)"
        class="vanCell fundraisingList-list-li"
        v-for="(item,index) in data "
        :key="index"
      >
        <van-row>
          <van-col span="5">
            <van-image class="fundraisingList-list-li-img" round fit="cover" :src="item.image" />
          </van-col>
          <van-col span="14">
            <div class="fundraisingList-list-li-title">{{item.title}}</div>
            <div class="fundraisingList-list-li-time">发起人：{{item.promoterName}}</div>
            <div class="fundraisingList-list-li-time">筹款金额：{{item.raiseMoney}}</div>
          </van-col>
        </van-row>
      </div>
    </div>-->

    <!-- 分页刷新 -->
    <!-- <div class="fundraisingList-list" v-if=" proveArray.length != 0"> -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        @click.stop="fundraisingFun(item.id)"
        v-for="(item,index) in proveArray"
        :key="index"
        class="vantent"
      >
        <!-- <van-image class="helping-list-img" round :src="item.head_url" />
				<div class="helping-list-content">
					<div class="helping-list-content-title">{{item.nickname}}</div>
					<div class="helping-list-content-explain">帮助金额{{item.money}}元 帮忙转发{{item.forwardNum}}次</div>
				</div>
        <p class="helping-list-clear"></p>-->
        <van-row>
          <van-col span="5">
            <van-image class="listimg" round fit="cover" :src="item.image" />
          </van-col>
          <van-col span="14">
            <div class="btgy">
              <p class="title">{{item.title}}</p>
              <p class="faqiren">发起人：{{item.promoterName}}</p>
              <div class="faqiren" v-if="item.status==2">筹款状态：正在筹款</div>
              <div class="faqiren" v-if="item.status==10">筹款状态：已结束</div>
            </div>
          </van-col>
          <div class="jine">
            <p class="choukuan">筹款金额</p>
            <p class="shuliang">{{item.raiseMoney}}</p>
          </div>
        </van-row>
      </van-cell>
    </van-list>
    <!-- </div> -->

    <!-- 末尾 -->
    <!-- <div v-else class="fundraisingList-lack">
      <img
        src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/mine/lack.png"
        alt
      />
      <span>暂无内容</span>
    </div>-->
  </div>
</template>

<script>
import { Row, Col, Cell, CellGroup, Image, Toast, List } from "vant";
// Row, Col, Image, Cell, CellGroup, List

export default {
  name: "bdlist",
  data() {
    return {
      data: null,
      //   numData: 1,
      num: 0,
      loading: false,
      finished: false,
      numData: 0,
      proveArray: [],
      getList: []
    };
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Image.name]: Image,
    [Toast.name]: Toast
  },
  mounted() {
    this.$wx.hideOptionMenu();
    this.getFundraisingListFun();
    this.getListbuy(); //业绩信息
  },
  methods: {
    fundraisingFun(id) {
      console.log(id);
      this.$router.push({
        path: "/share",
        query: {
          id: id
        }
      });
    },
    //业绩信息
    getListbuy() {
      let _this = this;
      _this
        .$axios({
          method: "post",
          url:
            "/yqc/user/getBdStatisticsInfo?uid=" +
            JSON.parse(sessionStorage.getItem("yqcUserData")).id,
          responseType: "json"
        })
        .then(function(response) {
          console.log(response);
          if (response.data.ret) {
            _this.getList = response.data.data;
          } else {
            Toast.fail(response.data.msg);
          }
        })
        .catch(function(error) {
          Toast.fail("服务器异常！！");
          console.log(error);
        });
    },
    //列表信息
    getFundraisingListFun() {
      let _this = this;
      _this
        .$axios({
          method: "post",
          url:
            "/yqc/user/getBdList?uid=" +
            JSON.parse(sessionStorage.getItem("yqcUserData")).id +
            "&pageSize=15&pageNum=1",
          responseType: "json"
        })
        .then(function(response) {
          console.log(response);
          if (response.data.ret) {
            for (let i = 0; i < response.data.data.list.length; i++) {
              _this.proveArray.push(response.data.data.list[i]);
            }
          } else {
            Toast.fail(response.data.msg);
          }
        })
        .catch(function(error) {
          Toast.fail("服务器异常！！");
          console.log(error);
        });
    },
    //异步更新数据
    onLoad(num) {
      // 异步更新数据
      let _this = this;
      setTimeout(() => {
        _this
          .$axios({
            method: "post",
            // url: '/yqc/donation/getMyHelpFundraising?userId=' + _this.$route.query.userId + '&pageSize=10&pageNum=' + _this.numData,
            url:
              "/yqc/user/getBdList?uid=" +
              JSON.parse(sessionStorage.getItem("yqcUserData")).id +
              "&pageSize=15&pageNum=" +
              _this.numData,
            responseType: "json"
          })
          .then(function(response) {
            console.log(response);
            if (response.data.ret) {
              _this.numData += 1;
              // _this.size = response.data.data.size;
              for (let i = 0; i < response.data.data.list.length; i++) {
                _this.proveArray.push(response.data.data.list[i]);
              }
              // 加载状态结束
              console.log(_this.proveArray);
              _this.loading = false;

              // 数据全部加载完成
              if (_this.proveArray.length >= response.data.data.totalNum) {
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
.fundraisingList {
  &-lack {
    position: relative;
    width: 187px;
    height: 187px;
    margin: 150px auto;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    span {
      display: block;
      width: 100%;
      text-align: center;
      position: absolute;
      bottom: 40px;
      color: #666666;
      font-size: 16px;
    }
  }
  &-list {
    padding: 0 15px;
    &-li {
      border-bottom: 1px solid #e6e6e6;
      &-img {
        width: 60px;
        height: 60px;
      }
      &-title {
        max-width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-top: 7px;
        font-size: 15px;
      }
      &-time {
        font-size: 13px;
        color: #666666;
        padding-top: 4px;
      }
      &-leftBtn {
        width: 100%;
        text-align: center;
        padding: 5px 0;
        margin-top: 16px;
        float: right;
        background: #ff5a5a;
        color: #ffffff;
        border-radius: 20px;
        box-sizing: border-box;
        font-size: 13px;
      }
      &-btnNav {
        padding-bottom: 5px;
      }
      &-bottomBtn {
        width: 100%;
        float: left;
        text-align: center;
        padding: 5px 0;
        background: #ffffff;
        border: 1px solid #ff5a5a;
        color: #ff5a5a;
        box-sizing: border-box;
        border-radius: 20px;
        font-size: 13px;
      }
      &-bottomBtnRed {
        background: #ff5a5a;
        color: #ffffff;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
// .fundraisingList-list>div:last-child{
//    border: none;
//  }
</style>
<style scoped>
.bdlistText {
  box-sizing: border-box;
  width: 40%;
  height: 120px;
  margin-left: 20px;
  margin-right: 15px;
  margin-bottom: 30px;
  padding-top: 24px;
  float: left;
  box-shadow: 3px 5px 15px #e3f7f6;
  border-radius: 10px;
  overflow: hidden;
}
.yiqun {
  width: 35px;
  height: 35px;
  margin-right: 15px;
  float: right;
}
.dvf {
  overflow: hidden;
}
.bdtext1 {
  float: left;
  margin-left: 20px;
  font-size: 14px;
  margin-top: 12px;
  color: #999999;
}
.bdtext2 {
  float: left;
  font-size: 36px;
  font-weight: bold;
  color: #000;
  float: left;
  margin-top: -7px;
  margin-left: 20px;
}
.listimg {
  width: 76px;
  height: 76px;
  border-radius: 50%;
}
.vantent {
  overflow: hidden;
  width: 92%;
  margin-left: 15px;
  border-bottom: 1px solid #e5e5e5;
}
.btgy {
  overflow: hidden;
  float: left;
  margin-left: 15px;
}
.faqiren {
  margin-top: -15px;
}
.title {
  font-size: 16px;
  color: #000;
  font-weight: bold;
}
.bdlist {
  margin-bottom: 30px;
}
.jine {
  float: right;
  text-align: center;
}
.choukuan{
  font-size: 16px;
   margin-top: 20px;
  color: #666666;
}
.shuliang{
  font-size: 16px;
  margin-top: -10px;
   color: #ed6662;
}
</style>
<style>
#fundraisingList .vanCell {
  padding: 10px 0 5px 0;
}
#fundraisingList .van-cell:not(:last-child):after {
  left: 0;
}
</style>