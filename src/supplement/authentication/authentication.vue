<template>
  <div class="authentication">
    <consultHeader></consultHeader>
    <tipsCom message="未放置信息丢失,填写的内容请及时保存！"></tipsCom>
    <div class="authentication-title">填写基本信息</div>
    <div class="authentication-menu">
      <div class="authentication-menu-nav">
        <van-row class="authentication-menu-nav-wid">
          <van-col span="4" @click="switchMenu(1)" class="authentication-menu-nav-list" :class="relationship ==1?'authentication-menu-nav-red':''">
            <van-image class="authentication-menu-nav-list-img" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/authentication/1.png" />
            <div class="authentication-menu-nav-list-text">患者本人</div>
          </van-col>
          <van-col span="1"></van-col>
          <van-col span="4" @click="switchMenu(2)" class="authentication-menu-nav-list" :class="relationship ==2?'authentication-menu-nav-red':''">
            <van-image class="authentication-menu-nav-list-img" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/authentication/2.png" />
            <div class="authentication-menu-nav-list-text">患者配偶</div>
          </van-col>
          <van-col span="1"></van-col>
          <van-col span="4" @click="switchMenu(3)" class="authentication-menu-nav-list" :class="relationship ==3?'authentication-menu-nav-red':''">
            <van-image class="authentication-menu-nav-list-img" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/authentication/3.png" />
            <div class="authentication-menu-nav-list-text">直系亲属</div>
          </van-col>
          <van-col span="1"></van-col>
          <van-col span="4" @click="switchMenu(4)" class="authentication-menu-nav-list" :class="relationship ==4?'authentication-menu-nav-red':''">
            <van-image class="authentication-menu-nav-list-img" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/authentication/4.png" />
            <div class="authentication-menu-nav-list-text">医院账户</div>
          </van-col>
          <van-col span="1"></van-col>
          <van-col span="4" @click="switchMenu(5)" class="authentication-menu-nav-list" :class="relationship ==5?'authentication-menu-nav-red':''">
            <van-image class="authentication-menu-nav-list-img" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/authentication/5.png" />
            <div class="authentication-menu-nav-list-text">公益组织</div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="authentication-tips"> *如果患者已满18岁，建议使用患者本人作为收款人，无需上传关系证明材料，更容易通过审核！</div>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" class="App_head"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" class="App_head"></router-view>
  </div>
</template>
<!-- 1 患者本人 2 患者配偶  3 直系亲属  4 医院账户  5 公益组织-->
<script>
  import {
    Row,
    Col,
    Image
  } from 'vant';
  import tipsCom from './../../components/tipsCom.vue';
  import consultHeader from './../../components/consultHeader.vue';
  export default {
    name: 'authentication',
    data() {
      return {
        relationship: 1
      };
    },
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Image.name]: Image,
      tipsCom,
      consultHeader
    },
    mounted() {
      this.$wx.hideOptionMenu();
    },
    methods: {
      switchMenu(num) {
        let _this = this;
        _this.relationship = num;
        if (num == 1) {
          this.$router.replace({
            path: '/supplement/authentication/',
            query: {
              id: _this.$route.query.id,
              userId: _this.$route.query.userId
            },
            replace: true
          })
        } else if (num == 2) {
          this.$router.replace({
            path: '/supplement/authentication/spouse',
            query: {
              id: _this.$route.query.id,
              userId: _this.$route.query.userId
            },
            replace: true
          })
        } else if (num == 3) {
          this.$router.replace({
            path: '/supplement/authentication/relative',
            query: {
              id: _this.$route.query.id,
              userId: _this.$route.query.userId
            },
            replace: true
          })
        } else if (num == 4) {
          this.$router.replace({
            path: '/supplement/authentication/hospital',
            query: {
              id: _this.$route.query.id,
              userId: _this.$route.query.userId
            },
            replace: true
          })
        } else {
          this.$router.replace({
            path: '/supplement/authentication/publicgood',
            query: {
              id: _this.$route.query.id,
              userId: _this.$route.query.userId
            },
            replace: true
          })
        }
      },
    }
  };
</script>

<style scoped lang="less">
  .authentication {
    padding-top: 60px;
    font-size: 16px;

    &-title {
      padding: 0 15px;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
    }

    &-tips {
      padding: 15px;
      color: #FF5A5A;
      line-height: 20px;
      font-size: 12px;
    }

    &-menu {
      width: 100vw;
      overflow-x: scroll;

      &-nav {
        width: 550px;

        &-wid {
          padding: 0 15px;
        }

        &-list {
          height: 108px;
          box-sizing: border-box;
          border: 1px solid #D0D0D0;
          border-radius: 7.5px;

          &-img {
            display: block;
            width: 50px;
            height: 50px;
            margin: 9.5px auto;
          }

          &-text {
            text-align: center;
            font-size: 14px;
          }
        }

        &-red {
          border: 1px solid #FF5A5A;
          background-image: url(https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/authentication/对.png);
          background-repeat: no-repeat;
          background-size: 23px 19px;
          background-position: bottom right;
        }
      }
    }
  }
</style>
