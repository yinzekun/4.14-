import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
Vue.use(Router)


const router = new Router({
  mode: "hash", //history
  base: '/dist/', // __dirname
  routes: [{
      //我的
      path: "/",
      name: 'mine',
      component: resolve => require(["../mine/mine.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    // 我帮助的筹款  helping
    {
      path: "/helping",
      name: 'helping',
      component: resolve => require(["../mine/helping.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    // 我的筹款列表 fundraisingList
    {
      path: "/fundraisingList",
      name: 'fundraisingList',
      component: resolve => require(["../mine/fundraisingList.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    //BD业绩查询列表
    {
      path: "/bdlist",
      name: 'bdlist',
      component: resolve => require(["../mine/bdlist.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },

    // 筹款详情 fundraising
    {
      path: "/fundraising",
      name: 'fundraising',
      component: resolve => require(["../mine/fundraising/fundraising.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    {
      // 我的筹款管理提现
      path: "/fundraising/withdraw",
      name: 'withdraw',
      component: resolve => require(["../mine/fundraising/withdraw.vue"], resolve),
      meta: {
        requireAuth: false,
        requireWithdraw: false
      }
    },
    {
      // 我的筹款管理提现 ---->  诺言发布动态
      path: "/fundraising/releasePromise",
      name: 'releasePromise',
      component: resolve => require(["../mine/fundraising/releasePromise.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    {
      // 常见问题解答
      path: "/problemSolving",
      name: 'problemSolving',
      component: resolve => require(["../mine/problemSolving.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    {
      // 大病救助
      path: "/seriousIllness",
      name: 'seriousIllness',
      component: resolve => require(["../mine/seriousIllness.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    {
      // 发起筹款
      path: "/launch",
      name: 'launch',
      component: resolve => require(["../launch/launch.vue"], resolve),
      meta: {
        requireAuth: true,
        requireWithdraw: false
      }
    },
    {
      // 审核中
      path: "/inAudit",
      name: 'inAudit',
      component: resolve => require(["../launch/inAudit.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    {
      // 当前筹款结束  --  提现未全部提现
      path: "/endLaunch",
      name: 'endLaunch',
      component: resolve => require(["../launch/endLaunch.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    {
      // 基本信息    ->   发起筹款点击下一步跳转
      path: "/launch/information",
      name: 'information',
      component: resolve => require(["../launch/information.vue"], resolve),
      meta: {
        requireAuth: false,
        requireWithdraw: false
      }
    },
    // 材料补充
    {
      // 材料补充
      path: "/supplement",
      name: 'supplement',
      component: resolve => require(["../supplement/supplement.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    {
      // 身份认证 -- 患者资料
      path: "/supplement/identity",
      name: 'identity',
      component: resolve => require(["../supplement/identity/identity.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    {
      // 身份认证 -- 身份证证明
      path: "/supplement/identityPhone",
      name: 'identityPhone',
      component: resolve => require(["../supplement/identity/identityPhone.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    {
      // 身份认证 -- 出生证照片
      path: "/supplement/identityCertificate",
      name: 'identityCertificate',
      component: resolve => require(["../supplement/identity/identityCertificate.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    {
      path: "/supplement/authentication",
      name: 'supplement',
      component: resolve => require(["../supplement/authentication/authentication.vue"], resolve),
      children: [{
        //本人
        path: "/",
        name: 'authentication',
        component: resolve => require(["../supplement/authentication/oneself.vue"], resolve),
        meta: {
          requireAuth: false
        }
      }, {
        //配偶
        path: "/supplement/authentication/spouse",
        name: 'spouse',
        component: resolve => require(["../supplement/authentication/spouse.vue"], resolve),
        meta: {
          requireAuth: false
        }
      }, {
        //直属亲属
        path: "/supplement/authentication/relative",
        name: 'relative',
        component: resolve => require(["../supplement/authentication/relative.vue"], resolve),
        meta: {
          requireAuth: false
        }
      }, {
        //医院账户
        path: "/supplement/authentication/hospital",
        name: 'hospital',
        component: resolve => require(["../supplement/authentication/hospital.vue"], resolve),
        meta: {
          requireAuth: false
        }
      }, {
        //公益组织
        path: "/supplement/authentication/publicgood",
        name: 'publicgood',
        component: resolve => require(["../supplement/authentication/publicgood.vue"], resolve),
        meta: {
          requireAuth: false
        }
      }],
      meta: {
        requireAuth: false
      }
    },
    {
      // 诊断证明验证
      path: "/supplement/verification",
      name: 'verification',
      component: resolve => require(["../supplement/verification.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    {
      // 承诺
      path: "/supplement/promises",
      name: 'promises',
      component: resolve => require(["../supplement/promises.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    // 增信材料
    {
      // 房
      path: "/supplement/increase/room",
      name: 'room',
      component: resolve => require(["../supplement/increase/room.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    {
      // 车
      path: "/supplement/increase/car",
      name: 'car',
      component: resolve => require(["../supplement/increase/car.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    {
      // 社会保障
      path: "/supplement/increase/guarantee",
      name: 'guarantee',
      component: resolve => require(["../supplement/increase/guarantee.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    //    -----------------------------分享后的页面---------------------------------------------------
    {
      // 分享页
      path: "/share",
      name: 'share',
      component: resolve => require(["../share/share.vue"], resolve),
      meta: {
        requireAuth: true
      }
    },
    {
      // 更多证明人
      path: "/share/moreProof",
      name: 'moreProof',
      component: resolve => require(["../share/moreProof.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    {
      // 举报
      path: "/share/report",
      name: 'report',
      component: resolve => require(["../share/report.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    {
      // 我来证明 -> 身份证号-姓名
      path: "/share/proveOne",
      name: 'proveOne',
      component: resolve => require(["../share/proveOne.vue"], resolve),
      meta: {
        requireAuth: true
      }
    },
    {
      // 我来证明 -> 身份证号-姓名
      path: "/share/proveTwo",
      name: 'proveTwo',
      component: resolve => require(["../share/proveTwo.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    // -------------   捐款  contribution   ----------------------------------
    {
      // 捐款 --- 支付
      path: "/share/contribution",
      name: 'contribution',
      component: resolve => require(["../share/contribution.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    {
      // 二维码
      path: "/share/eqCode",
      name: 'eqCode',
      component: resolve => require(["../share/eqCode.vue"], resolve),
      meta: {
        requireAuth: false,
      }
    },
    {
      // 却醒页
      path: "/HelloWorld",
      name: 'HelloWorld',
      component: resolve => require(["../components/HelloWorld.vue"], resolve),
      meta: {
        requireAuth: false
      }
    },
    {
      // 却醒页
      path: "/city",
      name: 'city',
      component: resolve => require(["../components/city.vue"], resolve),
      meta: {
        requireAuth: false
      }
    }

  ]
})

function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

// Djyz999888DJYZ   yiqunchougongyi

router.beforeEach((to, from, next) => {

  var requireAuthFunAll = function() {
    if (to.matched.some(res => res.meta.requireAuth)) {
      // 获取个人信息
      Axios.defaults.headers.common['yqcToken'] = JSON.parse(sessionStorage.getItem('yqcUserData')).yqcToken; 
      Axios({
        method: 'post',
        url: '/yqc/user/getMyPage?userId=' + JSON.parse(sessionStorage.getItem('yqcUserData')).id,
        responseType: 'json'
      }).then(function(response) {
        console.log(response)
        // status    状态(0未提交1审核中2通过3不通过10结束)',
        if (response.data.ret) {
          sessionStorage.setItem('yqcLoginData', JSON.stringify(response.data.data));
          next()
        }else{
           next()
        }
      }).catch(function(error) {
        console.log(error);
      });
    } else {
      next()
    }
  }


  var requireAuthFun = function() {
    if (to.matched.some(res => res.meta.requireAuth)) {
      // 获取个人信息
      Axios.defaults.headers.common['yqcToken'] = JSON.parse(sessionStorage.getItem('yqcUserData')).yqcToken;
      Axios({
        method: 'post',
        url: '/yqc/user/getMyPage?userId=' + JSON.parse(sessionStorage.getItem('yqcUserData')).id,
        responseType: 'json'
      }).then(function(response) {
        console.log(response)

        // status    状态(0未提交1审核中2通过3不通过10结束)',
        if (response.data.ret) { 
          if (to.matched.some(res => res.meta.requireWithdraw)) {
            if (response.data.data.status == 0) {
              next({
                path: '/launch',
              })
            } else if (response.data.data.status == 1) {
              next({
                path: '/inAudit',
              })
            } else {
              sessionStorage.setItem('yqcLoginData', JSON.stringify(response.data.data));
              next()
            }
          } else {
            if (response.data.data.status == 1) {
              next({
                path: '/inAudit',
              })
            } else if (response.data.data.status == 2) {
              next({
                path: '/fundraising',
                query: {
                  userId: JSON.parse(sessionStorage.getItem('yqcUserData')).id,
                  id: response.data.data.fundraisingId
                }
              })
            } else if (response.data.data.status == 10 && response.data.data.withdrawalsStatus == 1) {
              next({
                path: '/endLaunch',
                query: {
                  userId: JSON.parse(sessionStorage.getItem('yqcUserData')).id,
                  id: response.data.data.fundraisingId
                }
              })
            } else {
              sessionStorage.setItem('yqcLoginData', JSON.stringify(response.data.data));
              next()
            }
          }
        }
      }).catch(function(error) {
        console.log(error);
      });
    } else {
      next()
    }
  }

  // sessionStorage.setItem('yqcUserData','{"id":292356,"openId":"oOYrOwUIKSdRez0lmJgHnba5hXzc","nickname":"Angel、林","headUrl":"http://thirdwx.qlogo.cn/mmopen/qthboSXLqlP3qZd9vMDo46NGibyo2f0ysPzI4uMmrrpMAMZWicRqGiayzA2IunnYRicohveZOQHxXa12D0fdDZRAmPrroxm7l1dY/132","sex":1,"lealName":"","phone":"15614205930","idCard":null,"loveValue":1,"createTime":1577172133000,"updateTime":1577680703000,"isFollow":0,"status":0,"yqcToken":"yqcoOYrOwUIKSdRez0lmJgHnba5hXzc","bPopId":null,"bdStatus": 1}')
  // sessionStorage.setItem('yqcUserData','{"id":291709,"openId":"oVH7lwS1cvPS2uYnLJMxANxBMwaQ","nickname":"Angel、林","headUrl":"http://thirdwx.qlogo.cn/mmopen/qthboSXLqlP3qZd9vMDo46NGibyo2f0ysPzI4uMmrrpMAMZWicRqGiayzA2IunnYRicohveZOQHxXa12D0fdDZRAmPrroxm7l1dY/132","sex":1,"lealName":"","phone":"15614205930","idCard":null,"loveValue":1,"createTime":1577172133000,"updateTime":1577680703000,"isFollow":0,"status":0,"yqcToken":"yqcoVH7lwS1cvPS2uYnLJMxANxBMwaQ","bPopId":null,}')
  // requireAuthFunAll();
  // next()
  // return false
  // if(window.location.href.indexOf('&isappinstalled=0') > -1){
  //   window.location.replace(window.location.href.replace('&isappinstalled=0',''))
  // }

  const AppId = 'wxa7c80e1e73e5ef91';  //线上 wxa7c80e1e73e5ef91  测试 wxb30071264ca663ac
  const code = getUrlParam('code');
  let local = window.location.href;
  if(local.indexOf("?#") > -1){
    local = local.replace('?#', '%3F%23')
  }else{
    local = local.replace('#', '%3F%23')
  }
  let _this = this;
  if (sessionStorage.getItem('yqcCode') == null) {
    if (code == null || code == "") {
      window.location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + AppId +
        '&redirect_uri=' + local + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect');
    } else {
      sessionStorage.setItem('yqcCode', code);
      Axios({
        method: 'post',
        url: '/yqc/user/userLogin?code=' + code,
        responseType: 'json'
      }).then(function(response) {
        if (response.data.ret) {
          sessionStorage.setItem('yqcUserData', JSON.stringify(response.data.data));
          if (sessionStorage.getItem('yqcToeknStatic') == null) {
            sessionStorage.setItem('yqcToeknStatic', true);
            window.location.reload();
          }
          requireAuthFunAll();
        }
      }).catch(function(error) {
        console.log(error);
      });
    }
  } else {
    requireAuthFunAll();
  }

}
)

new Vue({
  router,
  template: `
		<router-view></router-view>
		`
}).$mount("#app")
