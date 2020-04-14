<template>
  <div id="fundraisingList">
    <div class="fundraisingList-list" v-if="data != null && data.length != 0">
      <div @click.stop="fundraisingFun(item)" class="vanCell fundraisingList-list-li" v-for="(item,index) in data " :key="index">
        <!-- withdrawStatus	int	提现状态 0未申请1待审核2审核通过3审核不通过4已打款5打款失败填写备注’
             fundraisingStatus int	筹款计划状态 0未提交1审核中2通过3不通过10结束 -->
        <van-row>
          <van-col span="5">
            <van-image class="fundraisingList-list-li-img" round fit="cover" :src="item.seekHelpImage" />
          </van-col>
          <van-col span="14">
            <div class="fundraisingList-list-li-title">{{item.fundraisingTitle}}</div>
            <div class="fundraisingList-list-li-time">发起时间：{{getLocalTime(item.createTime)}}</div>
          </van-col>
          <van-col span="5">
            <div v-if="item.fundraisingStatus == 0" class="fundraisingList-list-li-leftBtn">未提交</div>
            <div v-else-if="item.fundraisingStatus == 1" class="fundraisingList-list-li-leftBtn">预审中</div>
            <div v-else-if="item.fundraisingStatus == 10 && item.withdrawStatus == 1" class="fundraisingList-list-li-leftBtn">提现审核中</div>
            <div v-else-if="item.fundraisingStatus == 10 && item.withdrawStatus == 2" class="fundraisingList-list-li-leftBtn">审核通过</div>
            <div v-else-if="item.fundraisingStatus == 10 && item.withdrawStatus == 4" class="fundraisingList-list-li-leftBtn">已打款</div>
            <div v-else-if="item.fundraisingStatus == 10 && item.withdrawStatus == 6" class="fundraisingList-list-li-leftBtn">公示期</div>
            <div v-else-if="item.fundraisingStatus == 10 && item.withdrawStatus == 7" class="fundraisingList-list-li-leftBtn">已结束</div>
          </van-col>
        </van-row>
        <!-- btn  容器 -->
        <van-row v-if="(item.fundraisingStatus == 2 && item.withdrawStatus==0) || (item.fundraisingStatus == 10 && item.withdrawStatus==0) || (item.fundraisingStatus == 10 && item.withdrawStatus==3)" class="fundraisingList-list-li-btnNav">
          <van-col span="7"></van-col>
          <van-col span="5">
            <div @click.stop="supplementFun(item.fundraisingId)" class="fundraisingList-list-li-bottomBtn">补充材料</div>
          </van-col>
          <van-col span="1"></van-col>
          <van-col span="5">
            <div @click.stop="linkWithdraw(item.fundraisingId)" class="fundraisingList-list-li-bottomBtn">提现</div>
          </van-col>
          <van-col span="1"></van-col>
          <van-col span="5">
            <div v-if="item.fundraisingStatus == 2" class="fundraisingList-list-li-bottomBtn fundraisingList-list-li-bottomBtnRed">筹款中</div>
            <div v-if="item.fundraisingStatus == 10" class="fundraisingList-list-li-bottomBtn fundraisingList-list-li-bottomBtnRed">日期结束</div>
          </van-col>
        </van-row>
      </div>
    </div>

    <div v-else class="fundraisingList-lack">
      <img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/mine/lack.png" alt="">
      <span>暂无内容</span>
    </div>

  </div>
</template>

<script>
  import {
    Row,
    Col,
    Cell,
    CellGroup,
    Image,
    Toast
  } from 'vant';

  export default {
    name: 'fundraisingList',
    data() {
      return {
        data:null
      };
    },
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Image.name]: Image,
      [Toast.name]: Toast,
    },
    mounted() {
      this.$wx.hideOptionMenu();
      this.getFundraisingListFun()
    },
    methods: {
      // 提现
      linkWithdraw(id) {
      	//  /fundraising/withdraw
      	this.$router.push({
      		path: '/fundraising/withdraw',
      		query: {
      			id: id,
      			userId:JSON.parse(sessionStorage.getItem('yqcUserData')).id
      		}
      	});
      },
      // 点击补充材料
      supplementFun(id){
      	this.$router.push({
      		path:'/supplement',
      		query:{
      			id: id,
      			userId:JSON.parse(sessionStorage.getItem('yqcUserData')).id
      		}
      	});
      },
      fundraisingFun(data){
        if(data.fundraisingStatus == 0){
          this.$router.push({
          	path:'/launch',
            query:{
              id:data.fundraisingId
            }
          })
        }else if(data.fundraisingStatus == 1){
          this.$router.push({
          	path:'/inAudit'
          })
        }else{
          this.$router.push({
          	path:'/fundraising',
            query:{
            	id: data.fundraisingId
            }
          })
        }
      },
      // 整理时间格式
      getLocalTime(timestamp) {
      	let date = new Date(timestamp);
      	let Y = date.getFullYear() + '-';
      	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      	let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
      	let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      	let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      	let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      	let strDate = Y + M + D + h + m + s;
      	return strDate;
      },
      getFundraisingListFun() {
        let _this = this;
        _this.$axios({
        	method: 'post',
        	url: '/yqc/fundraising/getFundraisingList?userId='+JSON.parse(sessionStorage.getItem('yqcUserData')).id,
        	responseType: 'json'
        }).then(function(response) {
          console.log(response)
        	if(response.data.ret){
        		_this.data = response.data.data
        	}else{
        		Toast.fail(response.data.msg);
        	}
        }).catch(function (error) {
        	Toast.fail('服务器异常！！');
        	console.log(error);
        });
      }
    }
  };
</script>

<style scoped lang="less">
.fundraisingList{
  &-lack{
    position: relative;
    width: 187px;
    height: 187px;
    margin: 150px auto;
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
    span{
      display: block;
      width: 100%;
      text-align: center;
      position: absolute;
      bottom: 40px;
      color: #666666;
      font-size: 16px;
    }
  }
  &-list{
    padding: 0 15px;
    &-li{
      border-bottom: 1px solid #E6E6E6;
      &-img{
        width: 60px;
        height: 60px;
      }
      &-title{
        max-width: 90%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        padding-top: 7px;
        font-size: 15px;
      }
      &-time{
        font-size: 13px;
        color: #666666;
        padding-top: 4px;
      }
      &-leftBtn{
        width: 100%;
        text-align: center;
        padding: 5px 0;
        margin-top: 16px;
        float: right;
        background: #FF5A5A;
        color: #FFFFFF;
        border-radius: 20px;
        box-sizing: border-box;
        font-size: 13px;
      }
      &-btnNav{
        padding-bottom: 5px;
      }
      &-bottomBtn{
        width: 100%;
        float: left;
        text-align: center;
        padding: 5px 0;
        background: #FFFFFF;
        border: 1px solid #FF5A5A;
        color: #FF5A5A;
        box-sizing: border-box;
        border-radius: 20px;
        font-size: 13px;
      }
      &-bottomBtnRed{
        background: #FF5A5A;
        color: #FFFFFF;
        font-size: 13px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
}
 // .fundraisingList-list>div:last-child{
 //    border: none;
 //  }
</style>
<style>
  #fundraisingList .vanCell{
    padding: 10px 0 5px 0;
  }
  #fundraisingList .van-cell:not(:last-child):after {
    left: 0;
  }
</style>
