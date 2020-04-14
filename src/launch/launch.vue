<template>
  <div class="launch" style="padding-bottom: 60px;">
    <div class="launch-title">
      <span class="launch-title-main">筹款金额</span>
      <span class="launch-title-vice" @click="linkCustomer">在线咨询</span>
    </div>
    <div class="launch-back">
      <van-field placeholder='0' readonly clickable :value="formData.fundraisingMoney" @touchstart.native.stop="show = true" />

      <van-number-keyboard v-model="formData.fundraisingMoney" :show="show" :maxlength="6" @blur="show = false" />
    </div>

    <div class="launch-title">
      <span class="launch-title-main">筹款标题</span>
      <span class="launch-title-vice" @click="showTitle = true">怎么写标题？</span>
    </div>
    <div class="launch-back">
      <van-field maxlength="30" v-model="formData.fundraisingTitle" placeholder="一句话简单描述你的情况(30字以内)" />
    </div>

    <div class="launch-title">
      <span class="launch-title-main">求助说明</span>
      <span class="launch-title-vice" @click="showExplain = true">怎么写求助说明？</span>
    </div>
    <div class="launch-back">
      <van-field v-model="formData.helpNote" rows="5" type="textarea" placeholder="个人情况：我叫某某，来自某省某市某县某村，今年年龄X岁。病情现状：从某年某月开始感到不适，经过医院一系统检测被确诊为某病，为治病已经花去X万元，目前还缺X万元，借遍了亲朋好友，已无任何能力承担后续费用，只能被迫放弃治疗。呼吁帮助：请社会各界爱心人士伸出援手帮帮我！" />
    </div>

    <div class="launch-title">
      <span class="launch-title-main">添加图片</span>
      <span class="launch-title-text">(必填，至少上传一张图片)</span>
    </div>
    <div class="launch-text">建议您第一张上传患者积极阳光/乐观向上的医院治疗照（如面带微笑的治疗照），更易获得广大爱心人士的帮助，更快筹到治病钱！</div>
    <div class="launch-imgLoader">
      <van-uploader :max-count="8" preview-size="75px" :accept="'image/*'" :preview-full-image='true' v-model="formData.seekHelpImage"
        :before-delete="deleteRead" :before-read="beforeRead" />
    </div>

    <van-row class="launch-title">
      <van-col class="launch-title-main">我承诺：</van-col>
    </van-row>
    <div class="launch-text">1.发起的项目类型为个人大病救助，所筹款项将全部用于受助人的治疗及康复。</div>
    <div class="launch-text">2.提交的救助信息完整、真实、合理，不存在任何虚构、伪造和隐瞒的情况。</div>
    <div class="launch-text">3.积极配合赠与人及平台的要求，说明受助人病情情况、治疗花费、家庭经济情况等，并提供相应证明材料。</div>
    <div class="launch-text">若有违背，愿承担全部法律责任，并赔偿相关方所有损失。</div>

    <van-row class="launch-title">
      <van-col span="24" class="launch-title-agreement">
        <van-checkbox icon-size="15px" :label-disabled="true" v-model="checked" shape="square" checked-color="#FF5A5A">
          <span class="launch-title-agreement">我已阅读并同意</span>
          <span class="launch-title-agreement-red" @click="showClause = true">《医群筹个人求助信息发布条款》</span>
          <span class="launch-title-agreement-red" @click="showPrivacy = true">《隐私政策》</span>
          <span class="launch-title-agreement-red" @click="showAgreement = true">《用户协议》</span>
        </van-checkbox>
      </van-col>
      <van-col span="24" style="height: 10px;"></van-col>
      <van-col span="2"></van-col>
      <van-col span="22" class="launch-title-agreement">
        <span>不会下一步操作了？拨打400电话咨询：</span>

        <a href="tel:4006099595" class="launch-title-agreement-red">400 609 9595</a>
      </van-col>
    </van-row>

    <div class="launch-button-bottom" :class="checked?'':'launch-button-placing'" @click="submitFun">下一步</div>

    <!-- 怎么写标题 -->
    <van-popup v-model="showTitle" round>
      <div class="launch-fill">
        <p class="launch-fill-title">怎么写标题</p>
        <div class="launch-fill-tips">写标题时要突出重点，简明扼要的标题能加快 筹款的速度</div>
        <van-cell-group>
          <van-cell class="launch-fill-text">例一：感恩有您，请您伸出援手帮帮身患XX病的我！</van-cell>
          <van-cell class="launch-fill-text">例二：孩子刚满3周岁，妈妈不想失去你！想让你健康的活着！</van-cell>
          <van-cell class="launch-fill-text">例三：家庭顶梁柱命悬一线，请各位乡亲父老救救他！助我们战胜病魔！</van-cell>
        </van-cell-group>
        <div class="launch-fill-btn" @click="showTitle = false">好的</div>
      </div>
    </van-popup>
    <!-- 怎么写说明 -->
    <van-popup v-model="showExplain" round>
      <div class="launch-fill">
        <p class="launch-fill-title">怎么写求助说明</p>
        <div class="launch-fill-tips">求助说明建议从个人情况、病情现状、呼吁帮助三个方面阐述</div>
        <div class="launch-fill-nav">
          <div>个人情况：我叫某某，来自某省某市某县某村，今年年龄X岁</div>
          <div>
            病情现状：从某年某月开始感到不适，经过医生一 系列检测被确诊为某病，为治病已经花去了X万元， 目前还缺X万元，借遍了亲朋好友，已无任何能力
            承担后续费用，只能被迫放弃治疗。
          </div>
          <div>呼吁帮助：请社会各界爱心人士伸出援手帮我吧！</div>
        </div>
        <div class="launch-fill-btn" @click="showExplain = false">好的</div>
      </div>
    </van-popup>
    <!-- 短信验证 -->
    <van-popup v-model="showCode" round :close-on-click-overlay="false">
      <div class="launch-code">
        <p class="launch-code-title">验证手机号</p>
        <van-row class="launch-code-input">
          <van-col span="24">
            <van-field :error-message="phoneError" v-model="phoneVal" placeholder="请输入您的手机号" />
          </van-col>
        </van-row>
        <van-row class="launch-code-input">
          <van-col span="16">
            <van-field v-model="codeVal" maxlength="4" placeholder="请输入验证码" />
          </van-col>
          <van-col span="8">
            <span class="launch-code-input-btn" @click="obtainCode">{{ codeText }}</span>
          </van-col>
        </van-row>
        <div class="launch-code-btn" @click="commitCode">确认</div>
      </div>
    </van-popup>

    <!-- 隐私政策 -->
    <van-popup v-model="showPrivacy" round>
      <privacy @showPrivacyOn="showPrivacy = false"></privacy>
    </van-popup>
    <!-- 发布条款 -->
    <van-popup v-model="showClause" round>
      <clause @showClauseOn="showClause = false"></clause>
    </van-popup>
    <!-- 用户协议 -->
    <van-popup v-model="showAgreement" round>
      <agreement @showAgreementOn="showAgreement = false"></agreement>
    </van-popup>
  </div>
</template>

<script>
  import {
    Row,
    Col,
    Field,
    NumberKeyboard,
    Uploader,
    Checkbox,
    Popup,
    Cell,
    CellGroup,
    Button,
    Notify,
    Toast
  } from 'vant';
  import privacy from '../components/privacy.vue'; //隐私政策
  import clause from '../components/clause.vue'; //条款
  import agreement from '../components/agreement.vue'; //用户协议
  export default {
    name: 'launch',
    data() {
      return {
        show: false,
        formData: {
          fundraisingMoney: '',
          fundraisingTitle: '',
          helpNote: '',
          seekHelpImage: []
        },
        seekHelpImage: [],
        checked: true,
        showTitle: false, //标题
        showCode: false, // 短信验证
        showExplain: false, //说明
        phoneState: false,
        phoneVal: '',
        phoneError: '', //手机号格式错误
        codeVal: '',
        codeState: true,
        codeText: '获取验证码',
        showPrivacy: false,
        showClause: false,
        showAgreement: false,
        yqcLoginData: null,
        yqcUserData: null,
        fundraisingId: 0,
        setInt:''
      };
    },
    components: {
      privacy,
      clause,
      agreement,
      [Row.name]: Row,
      [Col.name]: Col,
      [Field.name]: Field,
      [NumberKeyboard.name]: NumberKeyboard,
      [Uploader.name]: Uploader,
      [Checkbox.name]: Checkbox,
      [Popup.name]: Popup,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Button.name]: Button,
      [Notify.name]: Notify,
      [Toast.name]: Toast,
    },
    mounted() {
      this.$wx.hideOptionMenu();
      let yqcLoginData = JSON.parse(sessionStorage.getItem('yqcLoginData'));
      this.yqcUserData = JSON.parse(sessionStorage.getItem('yqcUserData'));
      this.yqcLoginData = yqcLoginData;
      if (yqcLoginData.phone == 1) {
        this.showCode = true
      }

      if (this.$route.query.id == undefined) {
        this.fundraisingId = 0;
      } else {
        this.fundraisingId = this.$route.query.id;
      }
      this.getMyFundraising(this.fundraisingId);
      let _this = this;
      this.setInt = setInterval(function(){
        _this.submitSetIntervalFun();
      },20000)
    },
    beforeDestroy(){
      clearInterval(this.setInt);
    },
    methods: {
      linkCustomer() {
        window.location.href =
          'https://webchat.yuntongxun.com/wapchat.html?accessId=9ded0ec0-15a4-11ea-ba1b-71b245892110&fromUrl=在线咨询&urlTitle=医群筹网络科技&clientId=' +
          this.yqcUserData.id + '&otherParams={"nickName":"' + this.yqcUserData.nickname + '"}'

          // 'https://webchat.7moor.com/wapchat.html?accessId=9ded0ec0-15a4-11ea-ba1b-71b245892110&fromUrl=在线咨询&urlTitle=医群筹网络科技&clientId=' +
          // this.yqcUserData.id + '&otherParams={"nickName":"' + this.yqcUserData.nickname + '"}'
      },
      submitSetIntervalFun() {
        let data = new FormData(),_this = this;
        data.append('fundraisingId', _this.fundraisingId);
        data.append('userId', JSON.parse(sessionStorage.getItem('yqcUserData')).id);
        data.append('money', Number(_this.formData.fundraisingMoney));
        data.append('title', _this.formData.fundraisingTitle);
        data.append('note', _this.formData.helpNote);
        data.append('image', JSON.stringify(_this.seekHelpImage));
        _this.$axios({
            method: 'post',
            url: '/yqc/fundraising/launchFundraising',
            data: data,
            responseType: 'json'
          })
          .then(function(response) {
            if (response.data.ret) {
              Notify({ type: 'success', message: '保存成功' });
              _this.fundraisingId = response.data.data.id;
            }
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      // 提交表单
      submitFun() {
        let _this = this;
        if (!_this.checked) {
          return false
        }
        if (_this.formData.fundraisingMoney == '') {
          Notify({
            type: 'danger',
            message: '您还未填写筹款金额'
          });
        } else if (_this.formData.fundraisingTitle == '') {
          console.log(_this.formData.fundraisingMoney)
          Notify({
            type: 'danger',
            message: '您还未填写筹款标题'
          });
        } else if (_this.formData.helpNote == '') {
          Notify({
            type: 'danger',
            message: '您还未填写求助说明'
          });
        } else if (_this.seekHelpImage.length == 0) {
          Notify({
            type: 'danger',
            message: '您还未上传宣传图片'
          });
        } else if (Number(_this.formData.fundraisingMoney) < 1000) {
          Notify({
            type: 'danger',
            message: '筹款最少1000元'
          });
        } else {
          let data = new FormData();
          data.append('fundraisingId', _this.fundraisingId);
          data.append('userId', JSON.parse(sessionStorage.getItem('yqcUserData')).id);
          data.append('money', Number(_this.formData.fundraisingMoney));
          data.append('title', _this.formData.fundraisingTitle);
          data.append('note', _this.formData.helpNote);
          data.append('image', JSON.stringify(_this.seekHelpImage));

          _this.$axios({
              method: 'post',
              url: '/yqc/fundraising/launchFundraising',
              data: data,
              responseType: 'json'
            })
            .then(function(response) {
              if (response.data.ret) {
                _this.$router.replace({
                  path: '/launch/information',
                  query: {
                    id: response.data.data.id
                  }
                })
              }
              console.log(response);
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      },
      // 删除预览图
      deleteRead(file, detail) {
        this.seekHelpImage.splice(detail.idnex, 1);
        this.formData.seekHelpImage = this.seekHelpImage
        return true
      },
      // 图片上传
      beforeRead(file) {
        let toastUpload = Toast.loading({
          message: '上传中...',
          forbidClick: false,
          duration: 0
        });
        let data = new FormData(),
          _this = this;
        data.append("image", file);
        _this.$axios({
            method: 'post',
            url: '/yqc/image/imageUpload',
            data: data,
            responseType: 'json'
          })
          .then(function(response) {
            if (response.data.ret) {
              let newData = new Object();
              newData.url = response.data.data;
              _this.seekHelpImage.push(newData);
              _this.formData.seekHelpImage = _this.seekHelpImage
              toastUpload.clear();
              Toast.success('上传成功');
            } else {
              toastUpload.clear();
              Toast.fail('上传失败');
            }
          })
          .catch(function(error) {
            console.log(error);
            toastUpload.clear();
            Toast.fail('上传失败');
          });
        return true
      },
      // 获取我的筹款信息
      getMyFundraising(fundraisingId) {
        let _this = this;
        _this.$axios({
            method: 'post',
            url: '/yqc/fundraising/getMyFundraising?fundraisingId=' + fundraisingId,
            responseType: 'json'
          })
          .then(function(response) {
            console.log(response);
            if (response.data.ret) {
              if (response.data.data != null) {
                let data = response.data.data;
                data.fundraisingMoney = String(data.fundraisingMoney)
                _this.seekHelpImage = data.seekHelpImage;
                _this.formData = data;

              }
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      },
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
          _this.phoneError = '手机号格式错误';
        } else {
          _this.phoneState = true;
          _this.phoneError = '';
          // 获取验证码
          _this
            .$axios({
              method: 'post',
              url: '/yqc/user/sendSMS?phone=' + _this.phoneVal,
              responseType: 'json'
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
              method: 'post',
              url: '/yqc/user/verificationCode?phone=' + _this.phoneVal + '&code=' + _this.codeVal + '&userId=' +
                JSON.parse(sessionStorage.getItem('yqcUserData')).id,
              responseType: 'json'
            })
            .then(function(response) {
              console.log(response);
              if (response.data.ret) {
                _this.showCode = false;
              } else {
                Toast(response.data.msg)
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          Toast('您还未填写手机号或验证码！！')
        }
      },
      countdown() {
        // 倒计时
        let num = 59,
          _this = this;
        let setIn = setInterval(function() {
          _this.codeText = num + 'S';
          num--;
          if (num < 0) {
            clearInterval(setIn);
            _this.codeState = true;
            _this.codeText = '获取验证码';
          }
        }, 1000);
      }
    }
  };
</script>

<style scoped lang="less">
  .van-cell {
    background: none;
  }

  .launch {
    font-size: 16px;

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

    &-fill {
      width: 320px;

      // height: 360px;
      &-nav {
        padding: 0 15px;

        div {
          font-size: 13px;
          line-height: 20px;
        }
      }

      &-title {
        text-align: center;
        font-size: 17px;
        padding: 0 15px;
      }

      &-tips {
        font-size: 14px;
        font-weight: bold;
        padding: 0 15px 15px 15px;
      }

      &-text {
        font-size: 13px;
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

      &-placing {
        background: #ddd;
        color: #666;
      }
    }

    &-back {
      width: 90vw;
      background: #f7f7f7;
      margin: 0 auto;
      padding: 5px 0;
      border-radius: 5px;
    }

    &-text {
      font-size: 14px;
      color: #999999;
      padding: 5px 15px;
      line-height: 20px;
    }

    &-imgLoader {
      padding: 15px;
    }

    &-title {
      padding: 15px;
      vertical-align: bottom;

      &-main {
        font-size: 20px;
        font-weight: 900;
      }

      &-vice {
        font-size: 15px;
        margin-top: 5px;
        font-weight: 500;
        color: #ff5a5a;
        text-decoration: underline;
      }

      &-text {
        font-size: 15px;
        margin-top: 5px;
      }

      &-agreement {
        font-size: 12px;
        color: #666666;

        &-red {
          color: #ff5a5a;
          text-decoration: underline;
        }
      }
    }
  }
</style>
<style>
  .launch .van-popup--center.van-popup--round {
    border-radius: 5px;
  }
</style>
