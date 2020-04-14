<template>
	<div class="withdraw" v-if="data != null">
    <shareGuide ref="mychild"></shareGuide>
		<div class="withdraw-header">
			<van-row class="withdraw-header-tabs">
				<van-col span="8" class="withdraw-header-tabs-li">
					<p>目标总金额</p>
					<p>{{ data.fundraising_money }}</p>
				</van-col>
				<van-col span="8" class="withdraw-header-tabs-li">
					<p>已筹总金额</p>
					<p>{{ data.raise_money }}</p>
				</van-col>
				<van-col span="8" class="withdraw-header-tabs-li withdraw-header-tabs-last">
					<p>已提现金额</p>
					<p>{{ data.withdrawals_money }}</p>
				</van-col>
			</van-row>
		</div>
		<nav class="withdraw-nav">
			<van-row class="withdraw-nav-btn">
				<van-col span="12"><span @click="withdrawalFun" class="withdraw-nav-btn-n">提现</span></van-col>
				<van-col span="12">
					<span class="withdraw-nav-btn-n withdraw-nav-btn-red" @click="releasePromise">
						<img class="withdraw-nav-btn-icon" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/mine/发布.png" alt="" />
						发布诺言动态
					</span>
				</van-col>
			</van-row>

			<van-cell-group class="withdraw-nav-list">
				<van-cell title="项目进行倒计时"><span class="withdraw-nav-list-red">{{timeText}}</span></van-cell>
				<van-cell title="转发次数">
					<span class="withdraw-nav-list-li">{{ data.forword }}</span>
				</van-cell>
				<van-cell title="帮助次数">
					<span class="withdraw-nav-list-li">{{ data.help_num }}</span>
				</van-cell>
				<van-cell title="筹款小助手定时提醒">
					<!-- <span class="withdraw-list-li">项目进行倒计时</span> -->
					<van-switch v-model="data.is_remind" @change="switchFun" size="22px" active-color="#FF5A5A" inactive-color="#DDDDDD" />
				</van-cell>
			</van-cell-group>
		</nav>
		<div class="withdraw-clear"></div>
		<van-cell-group>
			<van-row class="withdraw-summary">
				<van-col class="withdraw-summary-title" span="24">转发朋友圈</van-col>
				<van-col class="withdraw-summary-text" span="17">
					每日转发朋友圈间隔2-3小时一次最佳，通 过分时间段的转发会让您的微信好友在不同 时间段看到您的筹款，可以获得更多的爱心 人士帮助
				</van-col>
				<van-col span="7"><span class="withdraw-summary-btn" @click="shareGuideShowFun">立即转发</span></van-col>
			</van-row>
		</van-cell-group>

		<van-cell-group>
			<van-row class="withdraw-summary">
				<van-col class="withdraw-summary-title" span="24" >邀请好友帮我实名认证</van-col>
				<van-col class="withdraw-summary-text" span="17">
					邀请更多的好友在不同时间段帮助转发，通 过一度人脉好友转发让二度人脉爱心人士看 到，能得到更多的爱心人士的帮助
				</van-col>
				<van-col span="7"><span class="withdraw-summary-btn withdraw-summary-red" @click="shareGuideShowFun">现在邀请</span></van-col>
			</van-row>
		</van-cell-group>

		<van-cell-group>
			<van-row class="withdraw-summary">
				<van-col class="withdraw-summary-title" span="24">转发到微信群</van-col>
				<van-col class="withdraw-summary-text" span="17">
					每日在不同时间段转发到微信群内，让大家 帮忙证实、帮忙转发，获得更多的扩散，能 得到更多爱心人士的帮助。自己和亲朋好友 的所有微信群每日转发一次最佳
				</van-col>
				<van-col span="7"><span class="withdraw-summary-btn" @click="shareGuideShowFun">现在转发</span></van-col>
			</van-row>
		</van-cell-group>

		<van-popup v-model="showWithdrawal" round :close-on-click-overlay="false">
			<div class="withdraw-money">
				<p class="withdraw-money-title">提现</p>
				<van-row class="withdraw-money-input">
					<van-col span="24"><van-field disabled v-model="money" placeholder="" /></van-col>
				</van-row>
				<van-row class="withdraw-money-bottom">
					<van-col span="12"><span @click="submitFun" class="withdraw-money-bottom-btn withdraw-money-bottom-red">确认</span></van-col>
					<van-col span="12"><span @click="showWithdrawal = false" class="withdraw-money-bottom-btn withdraw-money-bottom-white">取消</span></van-col>
				</van-row>
			</div>
		</van-popup>


	</div>
</template>

<script>
import { Row, Col, Cell, CellGroup, Switch, Popup, Field, Toast } from 'vant';
import shareGuide from './../../components/shareGuide.vue';
export default {
	name: 'withdraw',
	data() {
		return {
			checked: true,
			showWithdrawal: false,
			money: 0,
			data: null,
			timeText:''
		};
	},
	components: {
    shareGuide,
		[Row.name]: Row,
		[Col.name]: Col,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		[Switch.name]: Switch,
		[Popup.name]: Popup,
		[Field.name]: Field,
		[Toast.name]: Toast
	},
	mounted() {
		this.$wx.showOptionMenu();
		this.cashWithdrawalData(this.$route.query.id);
	},
	methods: {
    shareGuideShowFun(){
      this.$refs.mychild.shareGuideShowFun();
    },
    // 获取我的筹款信息
    getMyFundraising() {
    	let _this = this;
    	const toast = Toast.loading({
    		forbidClick: false
    	});
    	_this
    		.$axios({
    			method: 'post',
    			url: '/yqc/fundraising/getMyFundraising?fundraisingId=' + _this.$route.query.id,
    			responseType: 'json'
    		})
    		.then(function(response) {
    			if (response.data.ret) {
    				let data = response.data.data;
    				data.seekHelpImage = JSON.parse(response.data.data.seekHelpImage);
    				_this.wxShareFun(window.location.href,data.fundraisingTitle,data.helpNote,data.seekHelpImage[data.seekHelpImage.length-1].url,_this.$route.query.id);
    				toast.clear();
    			} else {
    				Toast.fail(response.data.msg);
    			}
    		})
    		.catch(function(error) {
    			Toast.fail('服务器异常！！');
    			console.log(error);
    		});
    },


		withdrawalFun(){
			let cha = Number(this.data.raise_money) - Number(this.data.withdrawals_money);
			this.money = cha.toFixed(2);
			this.showWithdrawal = true;

		},
		releasePromise(){
			let _this = this;
			_this.$router.push({
				path:'/fundraising/releasePromise',
				query:{
					id:_this.$route.query.id,
					userId:JSON.parse(sessionStorage.getItem('yqcUserData')).id
				}
			})
		},
		submitFun(){
			let _this = this;
			if(_this.money == 0){
				Toast('您没有可提现金额！！')
				return false
			}
			_this
				.$axios({
					method: 'post',
					url: '/yqc/cashWithdrawal/applyCashWithdrawal?fundraisingId=' + _this.$route.query.id+'&money='+_this.money,
					responseType: 'json'
				})
				.then(function(response) {
					console.log(response);
					if (response.data.ret) {
						Toast.success('提交成功');
						_this.cashWithdrawalData(_this.$route.query.id);
						_this.showWithdrawal = false;
					} else {
						Toast.fail(response.data.msg);
					}
				})
				.catch(function(error) {
					Toast.fail('服务器异常！！');
					console.log(error);
				});
		},
		switchFun(){
			let switchState,_this = this;
			if(_this.data.is_remind){
				switchState = 0;
			}else{
				switchState = 1;
			}
			_this
				.$axios({
					method: 'post',
					url: '/yqc/cashWithdrawal/updateRemind?fundraisingId=' + _this.$route.query.id+'&remind='+switchState,
					responseType: 'json'
				})
				.then(function(response) {
					console.log(response);
					if (response.data.ret) {
						Toast.success('修改成功');
					} else {
						Toast.fail(response.data.msg);
					}
				})
				.catch(function(error) {
					Toast.fail('服务器异常！！');
					console.log(error);
				});
		},
		cashWithdrawalData(id) {
			let _this = this;
			_this
				.$axios({
					method: 'post',
					url: '/yqc/cashWithdrawal/cashWithdrawalData?fundraisingId=' + id,
					responseType: 'json'
				})
				.then(function(response) {
					console.log(response);
					if (response.data.ret) {
						let data = response.data.data;
						if (data.is_remind == 0) {
							data.is_remind = true;
						} else {
							data.is_remind = false;
						}
						_this.dataTime(response.data.data.fundraising_end_time.time);
						_this.data = response.data.data;
					} else {
						Toast.fail(response.data.msg);
					}
				})
				.catch(function(error) {
					Toast.fail('服务器异常！！');
					console.log(error);
				});
		},
		dataTime(time) {
			let cha = time - new Date().getTime();
			let cha1 = Math.ceil(cha / 60000);
			if(cha <= 0){
				this.timeText = '';
			}else{
				this.timeText = parseInt(cha1/(60*24))+'天'+parseInt((cha1%(24*60))/60)+'小时'+(cha1%(24*60))%60+'分钟';
			}

		}
	}
};
</script>

<style scoped lang="less">
.withdraw {
  font-size: 16px;
	&-money {
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
		}
		&-bottom {
			width: 290px;
			margin: 35px auto 15px;
			&-btn {
				display: block;
				width: 100px;
				height: 37px;
				text-align: center;
				margin: 0 auto;
				line-height: 37px;
				border: 1px solid #ff5a5a;
				border-radius: 37px;
				overflow: hidden;
				font-size: 16px;
			}
			&-red {
				background: #ff5a5a;
				color: #fff;
			}
			&-white {
				background: #fff;
				color: #ff5a5a;
			}
		}
	}
	&-summary {
		padding: 15px;
		&-title {
			font-size: 16px;
			margin-bottom: 10px;
		}
		&-text {
			font-size: 13px;
			color: #666;
			text-align: justify;
			&-red {
				color: #ff5a5a;
			}
		}
		&-btn {
			display: block;
			width: 85px;
			text-align: center;
			font-size: 15px;
			height: 31px;
			line-height: 31px;
			border-radius: 31px;
			margin-left: 15px;
			border: 1px solid #ff5a5a;
			color: #ff5a5a;
		}
		&-red {
			color: #fff;
			background: #ff5a5a;
		}
	}
	&-clear {
		height: 10px;
		background: #e6e6e6;
	}
	&-nav {
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
		margin-top: -40px;
		background: #fff;
		padding: 15px 0;
		&-list {
			&-li {
				color: #000;
			}
			&-red {
				color: #ff5a5a;
			}
		}
		&-btn {
			margin-bottom: 15px;
			&-icon {
				width: 16px;
				height: 16px;
				vertical-align: middle;
				margin-right: 5px;
			}
			&-n {
				display: block;
				width: 165px;
				height: 42px;
				text-align: center;
				line-height: 42px;
				border: 2px solid #ff5a5a;
				border-radius: 42px;
				margin: 0 auto;
				font-size: 16px;
				color: #fff;
				background: #ff5a5a;
			}
			&-red {
				color: #ff5a5a;
				background: #fff;
			}
		}
	}
	&-header {
		height: 180px;
		padding: 0.1px;
		background: #ff5a5a;
		&-tabs {
			margin-top: 40px;
			&-li {
				text-align: center;
				font-size: 16px;
				color: #fff;
				border-right: 2px solid #e74343;
				p {
					margin-block-start: 0.2em;
					margin-block-end: 1em;
				}
				p:last-of-type {
					margin-block-start: 1em;
					margin-block-end: 0.2em;
				}
			}
			&-last {
				border: none;
			}
		}
	}
}
</style>
<style>
.withdraw .van-cell {
	background: rgba(0, 0, 0, 0);
}
.withdraw .van-popup--center.van-popup--round {
	border-radius: 5px;
}
</style>
