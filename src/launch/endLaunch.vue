<template>
	<div class="inAudit">
		<img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/选中.png" alt="" />
		<p>项目已结束，请提现完后在发起筹款！</p>
		<div>{{name}}</div>
		<nav @click="linkWithdraw">去提现</nav>
		<footer>如有疑问，拨打400电话咨询：<a href="tel:4006099595">400 609 9595</a></footer>
	</div>
</template>

<script>
import { Row, Col } from 'vant';
export default {
	name: 'inAudit',
	data() {
		return {
      name:''
    };
	},
	components: {
		[Row.name]: Row,
		[Col.name]: Col
	},
	mounted() {
		this.$wx.hideOptionMenu();
    this.name =  JSON.parse(sessionStorage.getItem('yqcUserData')).nickname;
	},
	methods: {
    linkWithdraw() {
    	//  /fundraising/withdraw
    	let _this = this;
    	_this.$router.push({
    		path: '/fundraising/withdraw',
    		query: {
    			id: _this.$route.query.id,
    			userId: _this.$route.query.userId
    		}
    	});
    },
  }
};
</script>

<style scoped lang="less">
	.inAudit{
    font-size: 16px;
		img{
			display: block;
			width: 44px;
			height: 44px;
			margin: 50px auto 15px;
		}
		p{
			text-align: center;
			font-size: 20px;
			font-weight: 800;
		}
		div{
			text-align: center;
			color: #666666;
			font-size: 13px;
			line-height: 25px;
		}
		nav{
      width: 80vw;
      height: 45px;
      background: #FF5A5A;
      margin: 35px auto 20px;
			text-align: center;
			color: #FFFFFF;
			font-size: 20px;
			line-height: 45px;
      border-radius: 45px;
		}
		footer{
			// position: fixed;
			// bottom: 15px;
			width: 100vw;
			text-align: center;
			margin-top: 10px;
			font-size: 12px;
			color: #666666;
			a{
				font-size: 12px;
				font-weight: 400;
				color: #FF5A5A;
				text-decoration: underline;
			}
		}
	}
</style>
