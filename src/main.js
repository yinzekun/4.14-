// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import Es6Promise from 'es6-promise'
import App from './App'
import router from './router'
import Axios from 'axios'
import wx from 'weixin-js-sdk'
import 'amfe-flexible/index.js'
import fastclick from 'fastclick';
fastclick.attach(document.body);
// var Less = require('Less');
require('es6-promise').polyfill()
Es6Promise.polyfill()
Vue.config.productionTip = false



Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
if (JSON.parse(sessionStorage.getItem('yqcUserData')) == null) {
  Axios.defaults.headers.common['yqcToken'] = '';
} else {
  Axios.defaults.headers.common['yqcToken'] = JSON.parse(sessionStorage.getItem('yqcUserData')).yqcToken;
}


Vue.prototype.$axios = Axios
Vue.prototype.$wx = wx

Vue.prototype.butShareFun = function (id) {
  Axios({
    method: 'get',
    url: '/yqc/donation/helpForward?fundraisingId=' + id + '&userId=' + JSON.parse(sessionStorage.getItem(
      'yqcUserData')).id,
    responseType: 'json',
  }).then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log(error);
  });
}

Vue.prototype.AxiosFun = function (url, data) {
  let res = new Object();
  Axios({
    method: 'get',
    url: url,
    data: data,
    responseType: 'json',
  }).then(function (response) {
    res = response;
  }).catch(function (error) {
    res = error;
  });
  return res
}
Axios({
  method: 'get',
  url: '/yqc/sign/getJSSign?url=' + encodeURIComponent(window.location.href.split('#')[0]),
  responseType: 'json',
}).then(function (response) {
  console.log(response)
  if (response.data.ret) {
    wx.config({
      debug: false,
      appId: response.data.data.appId,
      timestamp: response.data.data.timestamp,
      nonceStr: response.data.data.nonceStr,
      signature: response.data.data.signature,
      jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareWeibo',
        'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone'
      ]
    });
  }
}).catch(function (error) {
  console.log(error);
});


Vue.prototype.wxShareFun = function (url, title, desc, imgUrl, id) {
  wx.error(function (res) { });

  wx.ready(function () {
    var shareWxLink = 'https://yqc.yiqunchou.cn/dist/redirect.html?app3Redirect=' + encodeURIComponent(
      'https://yqc.yiqunchou.cn/dist/#/share?id=' + id);
    let shareData = {
      title: '【医群筹】' + title, //标题
      desc: desc, //简介
      link: shareWxLink,
      imgUrl: imgUrl,
      success: function () {
        // 用户点击了分享后执行的回调函数
        Axios({
          method: 'get',
          url: '/yqc/donation/helpForward?fundraisingId=' + id + '&userId=' + JSON.parse(
            sessionStorage.getItem('yqcUserData')).id,
          responseType: 'json',
        }).then(function (response) {
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      }
    };

    // wx.updateAppMessageShareData(shareData);

    // wx.updateTimelineShareData(shareData);

    wx.onMenuShareTimeline(shareData);

    wx.onMenuShareAppMessage(shareData);

    wx.onMenuShareQQ(shareData);

    wx.onMenuShareQZone(shareData);

    wx.onMenuShareWeibo(shareData);

  });
}


/* eslint-disable no-new */
