<template>
	<div>
		<div class="promises-text">您将得到社会各界爱心人士的帮助，同时建议您的亲属和朋友将大家的爱心传递下去，让爱永远是一种轮回，积极参与无偿献血及参加医养互助志愿者服务中心，用您的正能量温暖更多的爱人！</div>
		<div class="promises-clear"></div>
		  <van-cell-group>
		    <van-cell>
				<van-checkbox v-model="bloodDonation" checked-color="#FF5A5A">我承诺无偿献血</van-checkbox>
		    </van-cell>
		    <van-cell>
				<van-checkbox v-model="volunteer" checked-color="#FF5A5A">我承诺积极参与志愿者义工活动</van-checkbox>
		    </van-cell>
		  </van-cell-group>
		
		<div class="promises-button-bottom" @click="submitFun()">保存</div>
	</div>
</template>

<script>
import { Row, Col, Checkbox, CheckboxGroup, Cell, CellGroup, Toast } from 'vant';
export default {
	name: 'promises',
	data() {
		return {
			bloodDonation:false,
			volunteer:false
		};
	},
	components: {
		[Row.name]: Row,
		[Col.name]: Col,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		[Checkbox.name]: Checkbox,
		[CheckboxGroup.name]: CheckboxGroup,
		[Toast.name]: Toast,
	},
	mounted() {
		this.$wx.hideOptionMenu();
	},
	methods: {
		submitFun(){
			let _this = this,bloodDonation=1,volunteer=1;
			console.log(_this.bloodDonation);
			if(_this.bloodDonation){
				bloodDonation = 0;
			}else{
				bloodDonation = 1;
			}
			if(_this.volunteer){
				volunteer = 0;
			}else{
				volunteer = 1;
			}
			_this.$axios({
					method: 'post',
					url: '/yqc/supplement/addLovePromise?fundraisingId='+_this.$route.query.id+'&bloodDonation='+bloodDonation+'&volunteer='+volunteer,
					responseType: 'json'
				})
				.then(function(response) {
					console.log(response)
					if (response.data.ret) {
						Toast.success('保存成功！！');
						_this.$router.go(-1);
					} else {
						Toast.fail(response.data.msg);
					}
				})
				.catch(function(error) {
					Toast.fail('服务器异常！！');
				});
		}
	}
};
</script>

<style scoped lang="less">
	.promises{
    font-size: 16px;
		&-text{
			color: #FF5A5A;
			padding: 15px;
			font-size: 14px;
		}
		&-clear{
			width: 100vw;
			background: #F7F7F7;
			height: 10px;
		}
		&-button{
			&-bottom{
				width: 100vw;
				height: 50px;
				line-height: 50px;
				background: #FF5A5A;
				position: fixed;
				bottom: 0;
				text-align: center;
				color: #fff;
				font-size: 18px;
			}
		}
	}
</style>
