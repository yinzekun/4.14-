<template>
	<div class="proveTwo">
		<consultHeader></consultHeader>
    <tipsCom message="您的证明会帮助求助人获得更多的爱心人士的信任！"></tipsCom>
		<div class="proveTwo-cont">
			<span>感谢您为</span>
			<span class="proveTwo-cont-red">{{patientName}}</span>
			<span>求助信息证实情况可信，如果您参与、探访、深入了解过患者治疗和家庭真实情况，如果您如实填写以下真实身份、真实情况，这将为求助人获得更多信任！</span>
		</div>
		<div class="proveTwo-clear"></div>
		<p class="proveTwo-title">请选择</p>
		<van-cell-group><van-cell @click="show = !show" title="与受助人关系" :value="relation" is-link /></van-cell-group>
		<van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
			<van-picker show-toolbar title="与受助人关系" :columns="reportRelation" @cancel="onCancel" @confirm="onConfirm" />
		</van-popup>
		<van-cell-group>
			<div class="proveTwo-text">证实内容</div>
			<van-field
			    v-model="content"
			    rows="5"
			    type="textarea"
			    placeholder="请输入证实内容"
			  />
		</van-cell-group>

		<div class="proveTwo-button-bottom" @click="submitFun">提交</div>
	</div>
</template>

<script>
import { Row, Col, Cell, CellGroup, RadioGroup, Radio, Field, uploader, Popup, Picker, Toast } from 'vant';
import tipsCom from './../components/tipsCom.vue';
import consultHeader from './../components/consultHeader.vue';
export default {
	name: 'proveTwo',
	data() {
		return {
			content: '',
			show: false,
			patientName:'某某某',
			relation:'亲人',
			reportRelation: ['亲人', '朋友']
		};
	},
	components: {
    tipsCom,
    consultHeader,
		[Row.name]: Row,
		[Col.name]: Col,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		[RadioGroup.name]: RadioGroup,
		[Radio.name]: Radio,
		[Field.name]: Field,
		[uploader.name]: uploader,
		[Popup.name]: Popup,
		[Picker.name]: Picker,
		[Toast.name]: Toast,
	},
	mounted() {
		this.$wx.hideOptionMenu();
		this.patientName = this.$route.query.patientName;
		this.oneKeyConfig();
	},
	methods: {
		submitFun(){
			let _this = this,formData = new FormData();
			if(_this.content == ''){
				Toast("您还未填写证实内容！");
				return false
			}
			formData.append('userId',_this.$route.query.currentUserId);
			formData.append('fundraisingId',_this.$route.query.id);
			formData.append('relation',_this.relation);
			formData.append('content',_this.content);
			_this
				.$axios({
					method: 'post',
					url: '/yqc/user/prove',
					data:formData,
					responseType: 'json'
				})
				.then(function(response) {
					console.log(response)
					if (response.data.ret) {
						Toast.success('证明成功');
						if(_this.$route.query.several == 1){
							_this.$router.go(-1);
						}else{
							_this.$router.go(-2);
						}
					}else{
						Toast.fail(response.data.msg);
					}
				})
				.catch(function(error) {
					Toast.fail('服务器异常！！');
					console.log(error);
				});
		},
		oneKeyConfig() {
			let _this = this;
			_this
				.$axios({
					method: 'post',
					url: '/yqc/donation/getThankConfig',
					responseType: 'json'
				})
				.then(function(response) {
					console.log(response)
					if (response.data.ret) {
						_this.reportRelation = response.data.data.reportRelation
						// reply回复  leavingMsg留言
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		onConfirm(value, index) {
			this.show = false;
			this.relation = value;
			console.log(`当前值：${value}, 当前索引：${index}`);
		},
		onCancel() {
			this.show = false;
			console.log('取消');
		}
	}
};
</script>

<style scoped lang="less">
.proveTwo {
  font-size: 16px;
  padding: 60px 0;
	&-text{
		padding: 15px 15px 0 15px;
	}
	&-title {
		padding: 0 15px;
		font-size: 20px;
		font-weight: 500;
	}
	&-clear {
		height: 10px;
		background: #f7f7f7;
	}
	&-button {
		&-bottom {
			width: 100vw;
			height: 50px;
			line-height: 50px;
			background: #ff5a5a;
			position: fixed;
			bottom: 0;
			text-align: center;
			color: #fff;
			font-size: 18px;
		}
	}
	&-cont {
		font-size: 16px;
		padding: 0 15px 15px 15px;
		text-align: justify;
		&-red {
			color: #ff5a5a;
		}
	}
}
</style>
