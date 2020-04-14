<template>
  <div class="HelloWorld">
    <consultHeader></consultHeader>
    <tipsCom message="请您不要向任何人支付任何形式的费用，医群筹平台不收取任何费用！筹2000打款2000给求助人，医群筹不收取任何费用！"></tipsCom>
    <van-row class="HelloWorld-bottom">
      <van-col span="12" class="HelloWorld-bottom-btn HelloWorld-bottom-left">管理我的筹款</van-col>
      <van-col span="12" class="HelloWorld-bottom-btn HelloWorld-bottom-right" @click="shareGuideShowFun">立即转发</van-col>
    </van-row>
    <van-field v-model="money" @blur="moneyBlur()" @keyup="num" placeholder="输入其他金额" />
    <shareGuide ref="mychild"></shareGuide>
    <van-field label-width="250px" input-align="right" label="患者家庭金融资产总价值" @input="financialAssets = financialAssets.replace(/[^\d]/g,'')" v-model="financialAssets"
      placeholder="元" />
    <van-field maxlength="30" v-model="aaaaa" placeholder="一句话简单描述你的情况(30字以内)" />
    <van-row class="HelloWorld-proveNo">
      <van-col span="17">此时还未有任何人帮助实名认证，请您帮助证明情况真实，帮助患者得到更多爱心的帮助！</van-col>
      <van-col span="17">此时已有1人帮助实名认证，请您帮助证明情况真实，帮助患者得到更多爱心的帮助！</van-col>
      <van-col span="7"><span class="HelloWorld-proveNo-btn">我也来证明</span></van-col>
    </van-row>

    <div class="HelloWorld-bubbling">
      <div style="position: absolute;width: 160px;">
        <div class="HelloWorld-bubbling-li">
          <img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/mine/logo.png" alt="" />
          <div class="HelloWorld-bubbling-li-span">
            <span class="HelloWorld-bubbling-li-span-name">11111</span>
            <span class="HelloWorld-bubbling-li-span-money">帮助了50000元</span>
          </div>
        </div>
      </div>
    </div>

    <div v-html="ccc"></div>

  </div>
</template>

<script>
  import {
    Row,
    Col,
    Popup,
    Field
  } from 'vant';
  import shareGuide from './shareGuide.vue';
  import tipsCom from './tipsCom.vue';
  import consultHeader from './consultHeader.vue';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        text: '',
        showLove: true,
        money: '',
        url: '',
        aaaaa: '',
        financialAssets:'',
        ccc:'    徐召鹏\n奥术大师大所\n按时发散发傻'
      };
    },
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Popup.name]: Popup,
      [Field.name]: Field,
      shareGuide,
      tipsCom,
      consultHeader
    },
    mounted() {
      this.ccc = this.ccc.replace(/\n/g,"<br>").replace(/\ /g,"&nbsp;");
      // console.log(this.ccc.replace(/\n/g,"<br>"))
    },
    methods: {
      num(obj) {
        this.money = this.money.replace(/[^\d.]/g, "");
        this.money = this.money.replace(/^\./g, "");
        this.money = this.money.replace(/\.{2,}/g, ".");
        this.money = this.money.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        this.money = this.money.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
      },
      moneyBlur() {
        if (this.money != '') {
          if (this.money < 100) {
            this.money = 100;
          }
        }
      },
      shareGuideShowFun() {
        this.$refs.mychild.shareGuideShowFun();
      }
    }
  };
</script>

<style scoped lang="less">
  .HelloWorld {
    padding-top: 60px;

    &-bottom {
      position: fixed;
      width: 375px;
      bottom: 0;
      height: 50px;
      background: #fff;
      z-index: 1000;

      &-btn {
        text-align: center;
        line-height: 50px;
        font-size: 18px;
      }

      &-left {
        background: #ff5a5a;
        color: #fff;
      }

      &-right {
        background: #fff;
        color: #ff5a5a;
      }
    }

    &-bubbling {
      width: 160px;
      height: 3rem;
      position: fixed;
      left: 15px;
      overflow: hidden;
      z-index: 1000;

      &-li {
        background: #fe672e;
        border-radius: 27.5px;
        width: 160px;
        overflow: hidden;
        height: 27.5px;
        font-size: 13px;
        color: #fff;
        margin-bottom: 10px;

        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          margin: 1px 3px 1px 0;
          float: left;
          background: #fff;
        }

        &-span {
          padding: 5px 0;
          float: left;
          font-size: 13px;

          &-name {
            display: inline-block;
            max-width: 45px;
            overflow-x: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          &-money {
            display: inline-block;
            max-width: 80px;
            overflow-x: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }

    &-proveNo {
      padding: 0 15px;
      font-size: 13px;
      color: #666666;
      text-align: justify;

      &-btn {
        font-size: 14px;
        color: #ff5a5a;
        padding: 5px 0;
        border-radius: 31px;
        border: 1px solid #ff5a5a;
        width: 85px;
        float: right;
        text-align: center;
      }
    }
  }
</style>
