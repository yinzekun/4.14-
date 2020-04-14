<template>
	<div class="user" v-if="userData != null">
		<van-row class="user-header">
			<van-col span="6"><van-image class="user-header-img" round :src="userData.headUrl" /></van-col>
			<van-col span="18">
				<van-row class="user-header-name">{{userData.nickname}}</van-row>
				<van-row class="user-header-money">
					<span>{{data.loveValue}}爱心币</span>
					<img @click="showExplain = true" class="user-header-money-icon" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/mine/问好.png" alt="">
				</van-row>
			</van-col>
		</van-row>
		<van-row class="user-links">
			<van-col span="12" @click="routerLinkFunds">
				<img class="user-links-icon" round src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/mine/钱.png" />
				我的筹款
			</van-col>
			<van-col span="12" @click="linkHelping">
				<img class="user-links-icon" round src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/mine/募捐资金.png" />
				我的捐款
			</van-col>
		</van-row>
		<div class="user-clear">

		</div>
		<van-cell-group class="user-list">
			<van-cell v-if="data.rliefStatus == 0" title="大病救助" @click="linkSeriousIllness" is-link />
			<van-cell v-if="data.rliefStatus == 1" title="大病救助" value="客服正在处理" />
			<van-cell v-if="data.rliefStatus == 2" title="大病救助" value="已处理" />
			<van-cell title="常见问题" @click="routerLink('/problemSolving')" is-link />
			<van-cell title="联系客服">
				<a  href="tel:400-609-9595" class="user-list-phone">400-609-9595</a>
			</van-cell>
			<van-cell v-if="data.bdStatus == 1" title="BD业绩查询" @click="bdList" is-link />
		</van-cell-group>

		<!-- 说明 -->
		<van-popup v-model="showExplain" round>
			<div class="user-explain">
				<p class="user-explain-title">爱心币</p>
				<div class="user-explain-text">
					爱心币为虚拟币，根据您的捐款进行累计，爱心币可以通过商城购买商品进行抵现；
				</div>
				<div class="user-explain-text">
					当捐助50元之内时爱心币与人民币为1：1
				</div>
				<div class="user-explain-text">
					当捐助50元以上，爱心币与人民币为2：1
				</div>
				<div class="user-explain-btn" @click="showExplain = false">我知道了</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
import { Row, Image, Col, Icon, Cell, CellGroup, Toast, Popup } from 'vant';
import wx from 'weixin-js-sdk';
export default {
	name: 'mine',
	data() {
		return {
			userData:null,
			userId:1,
			data:{
				loveValue: 0,
				status: 0,
				rliefStatus:0,
				fundraisingId:'',
				bdStatus:0,
			},
			showExplain:false
		};
	},
	components: {
		[Row.name]: Row,
		[Image.name]: Image,
		[Col.name]: Col,
		[Icon.name]: Icon,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		[Toast.name]: Toast,
		[Popup.name]: Popup,
	},
	mounted() {
		this.$wx.hideOptionMenu();
		this.userData = JSON.parse(sessionStorage.getItem('yqcUserData'));
		this.userId = JSON.parse(sessionStorage.getItem('yqcUserData')).id;
		this.dataFun(this.userId);
    // window.addEventListener("popstate", function(e) { 
    //   this.$wx.closeWindow();
    // }, false); 
	},
	methods: {
		// 我的筹款
		routerLinkFunds(){
			this.$router.push({
				path:'/fundraisingList'
			})
		},
		linkHelping(){
			this.$router.push({
				path:'helping',
				query:{
					userId:this.userId,
					id: this.data.fundraisingId,
				}
			})
		},
		// 路由跳转
		routerLink(url){
			this.$router.push({
				path:url
			})
		},
		linkSeriousIllness(){
			let _this = this;
			this.$router.push({
				path:'/seriousIllness',
				query:{
					userId:_this.userId
				}
			});
		},
		//bd业绩查询
		bdList(){
		   let _this = this;
			this.$router.push({
				path:'/bdlist',
				query:{
					userId:_this.userId
				}
			});	
		},
		dataFun(userId){
			// 获取个人信息
			const toast =  Toast.loading({
			  forbidClick: false
			});
			let _this = this;
			_this.$axios({
				method: 'post',
				url: '/yqc/user/getMyPage?userId='+userId,
				responseType: 'json'
			}).then(function(response) {
				toast.clear();
				console.log(response)
				if(response.data.ret){
					_this.data = response.data.data;
          sessionStorage.setItem('yqcLoginData', JSON.stringify(response.data.data))
				}
			}).catch(function (error) {
				console.log(error)
				Toast.fail('加载失败');
			});
		},
	}
};
</script>

<style scoped lang="less">
.user {
  font-size: 16px;
	&-explain{
		width: 290px;
		padding: 0 15px;
		&-title{
			font-size: 17px;
		}
		&-text{
			font-size: 14px;
			line-height: 25px;
		}
		&-btn{
			width: 100px;
      padding: 8px 0;
			background: #ff5a5a;
			border-radius: 38px;
			text-align: center;
			font-size: 14px;
			color: #fff;
			margin: 40px auto 20px;
		}
	}
	&-clear{
		background: #F7F7F7;
		height: 10px;
	}
	&-header {
		width: 100%;
		padding: 20px 0;
		display: block;
		text-align: left;
		&-name {
			font-size: 18px;
			margin-top: 10px;
		}
		&-money {
			font-size: 14px;
			color: #ff5a5a;
			&-icon{
				width: 12.5px;
				height: 12.5px;
				vertical-align: top;
				margin-top: 4.5px;
			}
		}
		&-img {
			width: 56px;
			height: 56px;
			margin-left: 20px;
		}
	}
	&-links {
		padding: 15px 0;
		font-size: 12px;
		text-align: center;
		background-color: #fff;
		&-icon {
			display: block;
			height: 24px;
			margin: 0 auto 10px;
		}
	}
	&-list {
		text-align: left;
		&-phone{
			color: #FF5A5A;
			font-size: 16px;
			font-weight: bold;
		}
	}
}
</style>
<style>
.user .van-popup--center.van-popup--round {
	border-radius: 5px;
}
</style>
