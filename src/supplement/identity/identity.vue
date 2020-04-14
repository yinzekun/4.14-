<template>
	<div id="identity">
		<van-cell-group>
      <van-cell class="vanCell"><van-field label="发起者是否本人" label-width="150px" input-align="right" disabled v-model="relationship" placeholder="请输入用户名" /></van-cell>
      <van-cell class="vanCell"><van-field label="患者姓名" label-width="150px" input-align="right" disabled v-model="formData.patient_name" placeholder="请输入患者姓名" /></van-cell>
      <van-cell class="vanCell"><van-field :label="labelValue" label-width="150px" input-align="right" disabled v-model="formData.patient_card" placeholder="请输入用户名" /></van-cell>
		</van-cell-group>
		<div class="identity-button-bottom" @click="routerLink()">下一步</div>
	</div>
</template>

<script>
import { Row, Col, Cell, CellGroup, Field, Toast, Popup, Picker} from 'vant';
export default {
	name: 'identity',
	data() {
		return {
			value: '',
			relationship:'本人', //与患者关系
			labelValue:'患者身份证',
			formData:{
				promoter_relation: 0,
				patient_name:'',
				patient_card:''
			}
		};
	},
	components: {
		[Row.name]: Row,
		[Col.name]: Col,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		[Toast.name]: Toast,
		[Field.name]: Field,
	},
	mounted() {
		this.$wx.hideOptionMenu();
		this.dataFun(this.$route.query.id)
	},
	methods: {
		routerLink(){
			let _this = this;
      if(_this.formData.patient_card_type == 0){
        _this.$router.push({
        	path:'/supplement/identityPhone',
        	query:{
        		id: _this.$route.query.id,
        		userId:_this.$route.query.userId
        	},
        	replace:true
        });
      }else{
        _this.$router.push({
        	path:'/supplement/identityCertificate',
        	query:{
        		id: _this.$route.query.id,
        		userId:_this.$route.query.userId
        	},
        	replace:true
        });
      }
		},
		dataFun(userId){
			const toast =  Toast.loading({
			  forbidClick: false
			});
			let _this = this;
			_this.$axios({
				method: 'post',
				url: '/yqc/supplement/getPatientCard?fundraisingId='+userId,
				responseType: 'json'
			}).then(function(response) {
				if(response.data.ret){
					toast.clear()
					_this.formData = response.data.data;
					if(response.data.data.promoter_relation == 0){
						_this.relationship = '本人';
					}else{
						_this.relationship = '非本人';
					}
					if(response.data.data.patient_card_type == 0){
						_this.labelValue = '患者身份证号';
					}else{
						_this.labelValue = '患者出生证号';
					}
				}
				console.log(response)
			}).catch(function (error) {
				console.log(error)
				Toast.fail('加载失败');
			});
		},
	}
};
</script>

<style scoped lang="less">
	.identity{
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
<style>
  #identity .vanCell{
    padding: 0;
  }
</style>
