<template>
	<div class="inAudit">
		<img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/launch/时间.png" alt="" />
		<p>审核中</p>
		<div>审核通过后即可开始筹款，</div>
		<div>请耐心等待医群筹微信公众号的“项目发起成功通知”</div>
		<nav>（预计审核时间为10分钟左右）</nav>
		<footer>如有疑问，拨打400电话咨询：<a href="tel:4006099595">400 6099 9595</a></footer>
	</div>
</template>

<script>
import { Row, Col } from 'vant';
export default {
	name: 'inAudit',
	data() {
		return {};
	},
	components: {
		[Row.name]: Row,
		[Col.name]: Col
	},
	mounted() {
		this.$wx.hideOptionMenu();
	},
	methods: {}
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
			text-align: center;
			color: #FF5A5A;
			font-size: 13px;
			line-height: 30px;
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
