<template>
  <div class="contribution" style="padding-bottom: 60px;">
    <van-row class="contribution-header">
      <van-col span="6">
        <van-image v-if="headUrl != null" class="contribution-header-img" width="65px" height="65px" :src="headUrl" fit="cover">
          <template v-slot:error>
            加载失败
          </template>
        </van-image>
      </van-col>

      <van-col span="18">
        <div class="contribution-header-name">{{ nickname }}</div>
        <div class="contribution-header-cont">感谢您为我提供爱心帮助，我将会铭记在心，我将始终保持一颗善良的心，把您的正能量传递下去！</div>
      </van-col>
    </van-row>
    <van-row class="contribution-top">
      <van-col span="12"><span @click="staticChange(0)" class="contribution-top-btn" :class="static == 0 ? 'contribution-top-red' : ''">我是个人</span></van-col>
      <van-col span="12"><span @click="staticChange(1)" class="contribution-top-btn" :class="static == 1 ? 'contribution-top-red' : ''">我是企业</span></van-col>
    </van-row>
    <div class="contribution-clear"></div>
    <p class="contribution-title">选择帮助金额</p>
    <van-row class="contribution-select">
      <van-col @click="selectedFun(500, 1)" span="8"><span :class="selectedType == 1 ? 'contribution-select-red' : ''"
          class="contribution-select-option">500</span></van-col>
      <van-col @click="selectedFun(200, 2)" span="8"><span :class="selectedType == 2 ? 'contribution-select-red' : ''"
          class="contribution-select-option">200</span></van-col>
      <van-col @click="selectedFun(100, 3)" span="8"><span :class="selectedType == 3 ? 'contribution-select-red' : ''"
          class="contribution-select-option">100</span></van-col>
      <van-col @click="selectedFun(50, 4)" span="8" v-if="static == 0">
        <span :class="selectedType == 4 ? 'contribution-select-red' : ''" class="contribution-select-option">50</span>
      </van-col>
      <van-col @click="selectedFun(20, 5)" span="8" v-if="static == 0">
        <span :class="selectedType == 5 ? 'contribution-select-red' : ''" class="contribution-select-option">20</span>
      </van-col>
    </van-row>
    <van-cell-group>
      <van-row>
        <van-col span="22">
          <van-field v-model="money" @click="selectedType = 0" @blur="moneyBlur()" @keyup="num" placeholder="输入其他金额" />
        </van-col>
        <van-col span="2"><span class="contribution-money">元</span></van-col>
      </van-row>
    </van-cell-group>
    <van-cell-group v-if="static == 1">
      <van-field input-align="right" label="企业名称" v-model="enterpriseName" placeholder="请输入企业名称" />
    </van-cell-group>
    <van-cell-group v-if="static == 1">
      <van-field input-align="right" label="联系电话" v-model="phone" placeholder="请输入企业联系电话" />
    </van-cell-group>

    <van-cell-group class="contribution-checked">
      <van-cell title="匿名支持">
        <van-switch v-model="checked" size="18px" active-color="#FF5A5A" inactive-color="#DDDDDD" />
      </van-cell>
      <span class="contribution-checked-span">(匿名后不显示捐款人信息)</span>
    </van-cell-group>
    <div class="contribution-clear"></div>
    <van-cell-group>
      <div class="contribution-title" style="padding-top: 15px;">爱心留言</div>
      <van-field v-model="loveMsg" rows="4" type="textarea" placeholder="请输入证实内容" />
    </van-cell-group>
    <div class="contribution-tips">* 爱心企业为患者帮助，医群筹平台将在筹款页顶端为爱心 企业宣传，提示企业公益知名度</div>
    <div class="contribution-button-bottom" @click="submitFun">提交</div>
  </div>
</template>

<script>
  import {
    Row,
    Col,
    Image,
    Cell,
    CellGroup,
    Field,
    Switch,
    Toast
  } from 'vant';
  export default {
    name: 'contribution',
    data() {
      return {
        checked: false,
        value: '',
        static: 0,
        money: '',
        moneyStateNum: 500,
        selectedType: 1,
        headUrl: null,
        nickname: '',
        helpNote: '',
        enterpriseName: '',
        phone: '',
        loveMsg: '',
        ip: ''
      };
    },
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Image.name]: Image,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Field.name]: Field,
      [Switch.name]: Switch,
      [Toast.name]: Toast
    },
    mounted() {
      this.$wx.hideOptionMenu();
      this.headUrl = this.$route.query.headUrl;
      this.nickname = this.$route.query.nickname;
      this.oneKeyThanks();
      this.getUserIP((ip) => {
        this.ip = ip;
      });
      if (window.location.href.indexOf("?#") < 0) {
        window.location.replace(window.location.href.replace("#", "?#"));
      }
    },
    methods: {
      num() {
        this.money = this.money.replace(/[^\d.]/g, ""); 
        this.money = this.money.replace(/^\./g, ""); 
        this.money = this.money.replace(/\.{2,}/g, "."); 
        this.money = this.money.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        this.money = this.money.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
      },
      getUserIP(onNewIP) {
        let MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        let pc = new MyPeerConnection({
          iceServers: []
        });
        let noop = () => {};
        let localIPs = {};
        let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
        let iterateIP = ip => {
          if (!localIPs[ip]) onNewIP(ip);
          localIPs[ip] = true;
        };
        pc.createDataChannel('');
        pc.createOffer()
          .then(sdp => {
            sdp.sdp.split('\n').forEach(function(line) {
              if (line.indexOf('candidate') < 0) return;
              line.match(ipRegex).forEach(iterateIP);
            });
            pc.setLocalDescription(sdp, noop, noop);
          })
          .catch(reason => {});
        pc.onicecandidate = ice => {
          if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
          ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
        };
      },

      random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
      },
      // 获取常用留言信息
      oneKeyThanks() {
        let _this = this;
        _this
          .$axios({
            method: 'post',
            url: '/yqc/donation/getThankConfig',
            responseType: 'json'
          })
          .then(function(response) {
            if (response.data.ret) {
              //  leavingMsg留言
              let num = _this.random(0, response.data.data.leavingMsg.length);
              _this.loveMsg = response.data.data.leavingMsg[num];
              console.log(_this.loveMsg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      submitFun() {
        //
        let _this = this,
          money,
          formData = new FormData();
        formData.append('userId', JSON.parse(sessionStorage.getItem('yqcUserData')).id);
        formData.append('fundraisingId', _this.$route.query.id);
        formData.append('userType', _this.static);

        if (_this.selectedType == 0) {
          if (_this.money == '' || _this.money == 0) {
            Toast('您还未填写帮助金额！！');
            return false;
          }
          money = _this.money;
        } else {
          money = _this.moneyStateNum;
        }
        formData.append('money', money);

        if (_this.static == 1) {
          if (_this.enterpriseName == '') {
            Toast('您还未填写企业名称！！');
            return false;
          }
          formData.append('enterpriseName', _this.enterpriseName);
          formData.append('phone', _this.phone);
        }

        if (_this.checked) {
          formData.append('anonymity', 0);
        } else {
          formData.append('anonymity', 1);
        }
        _this.getUserIP((ip) => {
          formData.append('ip', ip);
        });
        formData.append('ip', _this.ip);
        formData.append('loveMsg', _this.loveMsg);

        _this
          .$axios({
            method: 'post',
            url: '/yqc/donation/helpDonation',
            data: formData,
            responseType: 'json'
          })
          .then(function(response) {
            if (response.data.ret) {
              function onBridgeReady() {
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest', {
                    "appId": "wxa7c80e1e73e5ef91", //公众号名称，由商户传入
                    // "appId": "wxb30071264ca663ac",
                    "timeStamp": response.data.data.timeStamp, //时间戳，自1970年以来的秒数
                    "nonceStr": response.data.data.nonceStr, //随机串
                    "package": response.data.data.package,
                    "signType": "MD5", //微信签名方式：
                    "paySign": response.data.data.paySign //微信签名
                  },
                  function(res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                      _this.$router.go(-1);
                      // 使用以上方式判断前端返回,微信团队郑重提示：
                      //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    }
                  });
              }
              if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                  document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
              } else {
                onBridgeReady();
              }
              // _this.$wx.chooseWXPay({
              //   appId: "wxa7c80e1e73e5ef91",
              //   timestamp: response.data.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              //   nonceStr: response.data.data.nonceStr, // 支付签名随机串，不长于 32 位
              //   package: response.data.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              //   signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              //   paySign: response.data.data.paySign, // 支付签名
              //   success: function(res) {
              //     _this.$router.go(-1);
              //     // 支付成功后的回调函数
              //     console.log(res);
              //   }
              // });
            } else {
              Toast(response.data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      // 选择捐款金额
      selectedFun(money, type) {
        this.selectedType = type;
        this.money = '';
        this.moneyStateNum = money;
      },
      moneyBlur() {
        if (this.money != '') {
          if (this.static == 1) {
            if (this.money < 100) {
              this.money = 100;
            }
          }
        }
      },
      staticChange(num) {
        this.static = num;
        this.moneyStateNum = 500;
        this.selectedType = 1;
        this.money = '';
      }
    }
  };
</script>

<style scoped lang="less">
  .contribution {
    font-size: 16px;

    &-button {
      &-bottom {
        width: 100vw;
        height: 50px;
        line-height: 50px;
        background: #ff5a5a;
        position: fixed;
        bottom: 0;
        text-align: center;
        color: #fff;
        font-size: 18px;
      }
    }

    &-tips {
      padding: 0 37px;
      font-size: 12px;
      color: #ff5a5a;
      margin-top: 15px;
    }

    &-checked {
      position: relative;

      &-span {
        position: absolute;
        // width: 200px;
        left: 85px;
        top: 13px;
        font-size: 14px;
        color: #999;
      }
    }

    &-money {
      line-height: 24px;
      display: block;
      padding: 10px 0;
      font-size: 16px;
    }

    &-title {
      padding: 0 15px;
      font-size: 16px;
    }

    &-select {
      padding: 0 30px;

      &-option {
        display: block;
        width: 90px;
        height: 42px;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #ff5a5a;
        margin-bottom: 15px;
        line-height: 42px;
        color: #ff5a5a;
        font-size: 16px;
        border-radius: 5px;
      }

      &-red {
        background: #ff5a5a;
        color: #fff;
      }
    }

    &-clear {
      height: 10px;
      background: #f7f7f7;
    }

    &-top {
      padding: 15px 40px;

      &-btn {
        display: block;
        width: 95px;
        height: 35px;
        text-align: center;
        border: 1px solid #ff5a5a;
        border-radius: 35px;
        line-height: 35px;
        font-size: 15px;
        margin: 0 auto;
        color: #ff5a5a;
      }

      &-red {
        background: #ff5a5a;
        color: #fff;
      }
    }

    &-header {
      padding: 15px;

      &-img {
        margin-top: 10px;
        border-radius: 5px;
        overflow: hidden;
      }

      &-name {
        font-size: 17px;
        margin-bottom: 5px;
      }

      &-cont {
        font-size: 13px;
        color: #666666;
        text-align: justify;
      }
    }
  }
</style>
<style>
  .contribution .van-cell {
    font-size: 16px;
  }
</style>
