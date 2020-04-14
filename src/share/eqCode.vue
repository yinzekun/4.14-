<template>
	<div>
		<div class="eqCode-nav">
			<p>长按识别二维码关注</p>
			<img class="eqCode-nav-codeImg" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/share/eCode.png" alt="">
			<div class="eqCode-nav-text">1.请先关注公众号</div>
			<div class="eqCode-nav-text">2.再给您的朋友捐款</div>
		</div>
	</div>
</template>

<script>
import { Row, Col } from 'vant';
export default {
	name: 'eqCode',
	data() {
		return {};
	},
	components: {
		[Row.name]: Row,
		[Col.name]: Col,
	},
	mounted() {
		this.$wx.hideOptionMenu();
	},
	methods: {}
};
</script>

<style scoped lang="less">
.eqCode{
  font-size: 16px;
	&-nav{
		width:305px;
		height:425px;
		padding: 0.1px;
		background:rgba(255,255,255,1);
		box-shadow:0px 5px 15px 0px rgba(0, 0, 0, 0.1);
		margin: 50px auto;
		p{
			text-align: center;
			font-size: 16px;
		}
		&-codeImg{
			width: 250px;
			height: 250px;
			display: block;
			margin: 0 auto 35px;
		}
		&-text{
			color: #FF5A5A;
			font-size: 15px;
			text-align: center;
			line-height: 25px;
		}
	}
}
</style>
