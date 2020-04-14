<template>
	<div class="supplement">
		<van-row style="padding-top: 15px;">
			<van-col span="12" class="supplement-title">
				<div class="supplement-title-nav" v-if="fundraisingId !=0 && data.idcardVerification == 0" @click="routerLink('/supplement/identity')">
					<van-image class="supplement-title-nav-img" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/组1-0.png" />
					<span class="supplement-title-nav-text">患者身份验证</span>
				</div>
				<div class="supplement-title-navGray" v-else>
					<van-image class="supplement-title-navGray-img" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/组2-0.png" />
					<span class="supplement-title-navGray-text">患者身份验证</span>
				</div>
			</van-col>
			<van-col span="12" class="supplement-title">
				<div class="supplement-title-nav" v-if="fundraisingId !=0 && data.payee == 0" @click="routerLink('/supplement/authentication')">
					<van-image class="supplement-title-nav-img" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/组1-1.png" />
					<span class="supplement-title-nav-text">收款人验证</span>
				</div>
				<div class="supplement-title-navGray" v-else>
					<van-image class="supplement-title-navGray-img" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/组2-1.png" />
					<span class="supplement-title-navGray-text">收款人验证</span>
				</div>
			</van-col>
			<van-col span="12" class="supplement-title">
				<div class="supplement-title-nav" v-if="fundraisingId !=0 && data.diagnosticProof == 0" @click="routerLink('/supplement/verification')">
					<van-image class="supplement-title-nav-img" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/组1-2.png" />
					<span class="supplement-title-nav-text">诊断证明验证</span>
				</div>
				<div class="supplement-title-navGray" v-else>
					<van-image class="supplement-title-navGray-img" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/组2-2.png" />
					<span class="supplement-title-navGray-text">诊断证明验证</span>
				</div>
			</van-col>
			<van-col span="12" class="supplement-title">
				<div class="supplement-title-nav" v-if="fundraisingId !=0 && data.creditMaterial == 0" @click="routerLink('/supplement/increase/room')">
					<van-image class="supplement-title-nav-img" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/组1-3.png" />
					<span class="supplement-title-nav-text">增信证明完善</span>
				</div>
				<div class="supplement-title-navGray" v-else>
					<van-image class="supplement-title-navGray-img" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/组2-3.png" />
					<span class="supplement-title-navGray-text">增信证明完善</span>
				</div>
			</van-col>
			<van-col span="12" class="supplement-title">
				<div class="supplement-title-nav" v-if="fundraisingId !=0 && data.lovePromise == 0" @click="routerLink('/supplement/promises')">
					<van-image class="supplement-title-nav-img" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/组1-4.png" />
					<span class="supplement-title-nav-text">为爱心承诺</span>
				</div>
				<div class="supplement-title-navGray" v-else>
					<van-image class="supplement-title-navGray-img" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/组2-4.png" />
					<span class="supplement-title-navGray-text">为爱心承诺</span>
				</div>
			</van-col>
		</van-row>
		
		<van-row class="supplement-tips">
			<van-col span="24" >
				如果材料审核通过则该补充材料项被隐藏且不可修改，爱心承诺项保存后则不可修改！
			</van-col>
		</van-row>
	</div>
</template>

<script>
import { Grid, GridItem, Image, Row, Col, Toast } from 'vant';
export default {
	name: 'supplement',
	data() {
		return {
			data:{
				creditMaterial: 0,
				diagnosticProof: 0,
				idcardVerification: 0,
				lovePromise: 0,
				payee: 0,
        fundraisingId:0
			}
		};
	},
	components: {
		[Row.name]: Row,
		[Col.name]: Col,
		[Grid.name]: Grid,
		[GridItem.name]: GridItem,
		[Image.name]: Image,
		[Toast.name]: Toast,
	},
	mounted() {
		this.$wx.hideOptionMenu();
    this.fundraisingId = this.$route.query.id;
		this.dataFun(this.$route.query.id);
	},
	methods: {
		dataFun(id){
			const toast =  Toast.loading({
			  forbidClick: false
			});
			let _this = this;
			_this.$axios({
				method: 'post',
				url: '/yqc/supplement/getSupplement?fundraisingId='+id,
				responseType: 'json'
			}).then(function(response) {
				console.log(response)
				// payee  收款人 lovePromise  爱心承诺 creditMaterial   增信材料 diagnosticProof  诊断证明  idcardVerification  身份证验证 0 为可修改  1不可修改
				if(response.data.ret){
					_this.data = response.data.data;
					toast.clear();
				}
			}).catch(function (error) {
				console.log(error)
				Toast.fail('加载失败');
			});
		},
		routerLink(link){
			let _this = this;
			_this.$router.push({
				path:link,
				query:{
					id: _this.$route.query.id,
					userId:_this.$route.query.userId
				},
				replace:true
			});
		}
		
	}
};
</script>

<style scoped lang="less">
.supplement {
	width: 360px;
	height: 100vh;
	padding: 0 7.5px;
	background: #f3f3f3;
  font-size: 16px;
	&-title{
		padding:7.5px 3.5px;
		&-nav{
			background: #fff;
			height: 75px;
			line-height: 75px;
			border-radius: 5px;
			&-img{
				width: 48px;
				height: 48px;
				margin: 0 7.5px;
				vertical-align: middle;
			}
			&-text{
				font-size: 15px;
				// vertical-align: middle;
			}
		}
		
		&-navGray{
			background: #fff;
			height: 75px;
			line-height: 75px;
			border-radius: 5px;
			&-img{
				width: 48px;
				height: 48px;
				margin: 0 7.5px;
				vertical-align: middle;
			}
			&-text{
				color: #AAAAAA;
				font-size: 15px;
				// vertical-align: middle;
			}
		}
	}
	&-tips{
		padding: 20px 15px;
		text-align: center;
		color: #FF5A5A;
		font-size: 13px;
		line-height: 25px;
	}
}
</style>
