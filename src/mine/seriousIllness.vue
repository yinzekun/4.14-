<template>
	<div class="seriousIllness">
		<img class="seriousIllness-logo" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/launch/logo.png" alt="" />
		<p class="seriousIllness-title">常见问题解答</p>

		<div class="seriousIllness-list">
			<p>姓名</p>
			<van-field class="seriousIllness-list-back" v-model="name" placeholder="请输入姓名" />
		</div>

		<div class="seriousIllness-list">
			<p>电话</p>
			<van-field class="seriousIllness-list-back" v-model="phone" placeholder="请输入电话" />
		</div>

		<div class="seriousIllness-list">
			<p>与筹款人关系</p>
			<van-dropdown-menu active-color="#ff5a5a"><van-dropdown-item v-model="relationValue" :options="relation" /></van-dropdown-menu>
		</div>

		<div class="seriousIllness-list">
			<p>是否为慢性病</p>
			<van-dropdown-menu active-color="#ff5a5a"><van-dropdown-item v-model="diseaseValue" :options="disease"  /></van-dropdown-menu>
		</div>

		<div class="seriousIllness-list">
			<p>手动填写疾病</p>
			<van-field class="seriousIllness-list-back" v-model="diseaseaModel" placeholder="请输入疾病" />
		</div>
    <div v-if="rliefStatus != 0" class="seriousIllness-tips">您已经填写过大病救助信息了!</div>
    <div v-if="rliefStatus != 0" class="seriousIllness-button-bottom seriousIllness-button-blur">提交</div>
		<div v-else class="seriousIllness-button-bottom" @click="submitFun()">提交</div>
	</div>
</template>

<script>
import { Row, Col, Field, DropdownMenu, DropdownItem, Toast } from 'vant';
export default {
	name: 'seriousIllness',
	data() {
		return {
			name: '',
			phone: '',
			relation: [],
			relationValue:'0',
			disease:[],
			diseaseValue:'0',
			diseaseaModel:'',
      rliefStatus:1
		};
	},
	components: {
		[Row.name]: Row,
		[Col.name]: Col,
		[Field.name]: Field,
		[DropdownMenu.name]: DropdownMenu,
		[DropdownItem.name]: DropdownItem,
		[Toast.name]: Toast,
	},
	mounted() {
		this.$wx.hideOptionMenu();
		this.config();
    this.dataFun();
	},
	methods: {
    dataFun(){
    	// 获取个人信息
    	const toast =  Toast.loading({
    	  forbidClick: false
    	});
    	let _this = this;
    	_this.$axios({
    		method: 'post',
    		url: '/yqc/user/getMyPage?userId='+JSON.parse(sessionStorage.getItem('yqcUserData')).id,
    		responseType: 'json'
    	}).then(function(response) {
    		toast.clear();
    		console.log(response)
    		if(response.data.ret){
    			_this.rliefStatus = response.data.data.rliefStatus;
    		}
    	}).catch(function (error) {
    		console.log(error)
    		Toast.fail('加载失败');
    	});
    },
		submitFun(){
			let _this = this,formData = new FormData();
			formData.append('userId',JSON.parse(sessionStorage.getItem('yqcUserData')).id);
			if(_this.name == ''){
				Toast("您还未填写姓名！");
				return false
			}
			formData.append('name',_this.name);

			if(_this.phone == ''){
				Toast("您还未填写电话！");
				return false
			}
			formData.append('phone',_this.phone);

			formData.append('fundraiserRelationship',_this.relation[_this.relationValue].text);
			formData.append('chronicDisease',_this.disease[_this.diseaseValue].text);

			if(_this.diseaseaModel == ""){
				Toast("您还未填写疾病！");
				return false
			}
			formData.append('disease',_this.diseaseaModel);
			_this.$axios({
				method: 'post',
				url: '/yqc/diseaseRelief/addDiseaseRelief',
				data:formData,
				responseType: 'json'
			}).then(function(response) {
				if(response.data.ret){
					Toast.success('保存成功！！');
					_this.$router.go(-1);
				}else{
					Toast.fail(response.data.msg);
				}
			}).catch(function (error) {
				Toast.fail('服务器异常！！');
				console.log(error);
			});
		},
		config(){
			let _this = this;
			_this.$axios({
				method: 'post',
				url: '/yqc/donation/getThankConfig',
				responseType: 'json'
			}).then(function(response) {
				// reply回复  leavingMsg留言  disease 慢性病 relation关系
				if(response.data.ret){
					let disease = response.data.data.disease,diseaseArray = new Array();
					for(let index in disease){
						var data = new Object();
						data.text = disease[index];
						data.value = index;
						diseaseArray.push(data)
					}
					console.log(diseaseArray)
					_this.disease = diseaseArray;

					let relation = response.data.data.relation,relationArray = new Array();
					for(let index in relation){
						var data = new Object();
						data.text = relation[index];
						data.value = index;
						relationArray.push(data)
					}
					_this.relation = relationArray;
				}
			}).catch(function (error) {
				console.log(error);
			});
		},
	}
};
</script>

<style scoped lang="less">
.seriousIllness {
  font-size: 16px;
	padding-bottom: 60px;
	&-logo {
		width: 140px;
		height: 40px;
		display: block;
		margin: 15px auto;
	}
	&-title {
		color: #ff5a5a;
		font-size: 17px;
		text-align: center;
	}
  &-tips{
    color: #ff5a5a;
    font-size: 20px;
    text-align: center;
    padding: 20px 15px;
  }
	&-list {
		padding: 0 15px;
		&-back {
			background: #F7F7F7;
			border-radius: 5px;
			overflow: hidden;
		}
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
    &-blur{
      background: #dddddd;
      color: #666666;
    }
	}
}
</style>
<style>
	.seriousIllness .van-dropdown-menu__title{
		width: 100%;
		color: #666;
	}
</style>
