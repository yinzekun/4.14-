<template>
  <div id="proveOne" class="proveOne">
    <consultHeader></consultHeader>
    <tipsCom message="需要验证您的身份信息，请保证如实填写您的相关资料。"></tipsCom>
    <p class="proveOne-title">填写你的姓名和身份证编号</p>
    <van-cell-group>
      <van-cell class="vanCell">
        <van-field input-align="right" label="您的姓名" v-model="name" placeholder="请输入您的姓名" />
      </van-cell>
      <van-cell class="vanCell">
        <van-field input-align="right" label="您的身份证号" v-model="idCard" placeholder="请输入身份证号" />
      </van-cell>
    </van-cell-group>
    <p class="proveOne-tips">
      暂时无法提供资料怎么办？拨打400电话咨询：
      <a href="tel:400 609 9595">400 609 9595</a>
    </p>
    <div class="proveOne-button-bottom" @click="submitFun">提交</div>

    <!-- 短信验证 -->
    <van-popup v-model="showCode" round :close-on-click-overlay="false">
      <div class="proveOne-code">
        <p class="proveOne-code-title">验证手机号</p>
        <van-row class="proveOne-code-input">
          <van-col span="24">
            <van-field :error-message="phoneError" v-model="phoneVal" placeholder="请输入您的手机号" />
          </van-col>
        </van-row>
        <van-row class="proveOne-code-input">
          <van-col span="16">
            <van-field v-model="codeVal" maxlength="4" placeholder="请输入验证码" />
          </van-col>
          <van-col span="8">
            <span class="proveOne-code-input-btn" @click="obtainCode">{{ codeText }}</span>
          </van-col>
        </van-row>
        <div class="proveOne-code-btn" @click="commitCode">确认</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {
  Row,
  Col,
  Cell,
  CellGroup,
  RadioGroup,
  Radio,
  Field,
  uploader,
  Toast,
  Popup
} from "vant";
import tipsCom from "./../components/tipsCom.vue";
import consultHeader from "./../components/consultHeader.vue";
export default {
  name: "proveOne",
  data() {
    return {
      name: "",
      idCard: "",
      showCode: false,
      phoneState: false,
      phoneVal: "",
      phoneError: "", //手机号格式错误
      codeVal: "",
      codeState: true,
      codeText: "获取验证码"
    };
  },
  components: {
    tipsCom,
    consultHeader,
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Field.name]: Field,
    [uploader.name]: uploader,
    [Popup.name]: Popup,
    [Toast.name]: Toast
  },
  mounted() {
    this.$wx.hideOptionMenu();
    let yqcLoginData = JSON.parse(sessionStorage.getItem("yqcLoginData"));
    if (yqcLoginData.phone == 1) {
      this.showCode = true;
    }
    // source  0  举报   1  证明
  },
  methods: {
    obtainCode() {
      // 获取验证码
      let _this = this;
      if (_this.codeState) {
        _this.codeState = false;
        _this.countdown();
      } else {
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(_this.phoneVal)) {
        _this.phoneState = false;
        _this.phoneError = "手机号格式错误";
      } else {
        _this.phoneState = true;
        _this.phoneError = "";
        // 获取验证码
        _this
          .$axios({
            method: "post",
            url: "/yqc/user/sendSMS?phone=" + _this.phoneVal,
            responseType: "json"
          })
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      // codeState =
    },
    // 短信验证  --  登录
    commitCode() {
      let _this = this;
      if (_this.codeVal.length == 4) {
        _this
          .$axios({
            method: "post",
            url:
              "/yqc/user/verificationCode?phone=" +
              _this.phoneVal +
              "&code=" +
              _this.codeVal +
              "&userId=" +
              JSON.parse(sessionStorage.getItem("yqcUserData")).id,
            responseType: "json"
          })
          .then(function(response) {
            console.log(response);
            if (response.data.ret) {
              _this.showCode = false;
            } else {
              Toast(response.data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        Toast("您还未填写手机号或验证码！！");
      }
    },
    countdown() {
      // 倒计时
      let num = 59,
        _this = this;
      let setIn = setInterval(function() {
        _this.codeText = num + "S";
        num--;
        if (num < 0) {
          clearInterval(setIn);
          _this.codeState = true;
          _this.codeText = "获取验证码";
        }
      }, 1000);
    },
    submitFun() {
      let _this = this;
      if (_this.name == "") {
        Toast("您还未填写您的姓名！");
        return false;
      }

      if (_this.idCard == "") {
        Toast("您还未填写您的身份证号！");
        return false;
      }

      _this
        .$axios({
          method: "post",
          url:
            "/yqc/user/idCardVerification?name=" +
            _this.name +
            "&idCard=" +
            _this.idCard +
            "&userId=" +
            _this.$route.query.currentUserId,
          responseType: "json"
        })
        .then(function(response) {
          console.log(response);
          if (response.data.ret) {
            Toast.success("身份验证成功");
            // source  0  举报   1  证明
            if (_this.$route.query.source == 0) {
              _this.$router.push({
                path: "/share/report",
                query: {
                  id: _this.$route.query.id,
                  userId: _this.$route.query.userId,
                  currentUserId: _this.$route.query.currentUserId,
                  patientName: _this.$route.query.patientName,
                  source: 0,
                  several: 2
                }
              });
            } else if (_this.$route.query.source == 1) {
              _this.$router.push({
                path: "/share/proveTwo",
                query: {
                  id: _this.$route.query.id,
                  userId: _this.$route.query.userId,
                  currentUserId: _this.$route.query.currentUserId,
                  patientName: _this.$route.query.patientName,
                  source: 1,
                  several: 2
                }
              });
            }
          } else {
            Toast.fail(response.data.msg);
          }
        })
        .catch(function(error) {
          Toast.fail("服务器异常！！");
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="less">
.proveOne {
  font-size: 16px;
  padding: 60px 0;
  &-code {
    width: 320px;
    &-title {
      text-align: center;
      font-size: 17px;
      padding: 0 15px;
    }
    &-input {
      width: 290px;
      margin: 0 auto 15px;
      border-radius: 5px;
      border: 1px solid #d2d2d2;
      &-btn {
        display: block;
        width: 100%;
        height: 44px;
        font-size: 14px;
        color: #ff5a5a;
        line-height: 44px;
        border-left: 1px solid #d2d2d2;
        text-align: center;
      }
    }
    &-btn {
      width: 100px;
      background: #ff5a5a;
      height: 35px;
      border-radius: 35px;
      text-align: center;
      line-height: 35px;
      color: #fff;
      margin: 20px auto;
    }
  }
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
    font-size: 12px;
    color: #666;
    text-align: center;
    margin-top: 250px;
    width: 100vw;
    a {
      color: #ff5a5a;
      text-decoration: underline;
    }
  }
  &-title {
    font-size: 20px;
    padding: 0 15px;
    font-weight: 500;
  }
}
</style>
<style>
#proveOne .vanCell {
  padding: 0;
}
#proveOne .van-cell:not(:last-child):after {
  left: 0;
}
</style>
