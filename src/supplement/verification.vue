<template>
	<div class="verification">
		<consultHeader></consultHeader>
    <tipsCom message="您的医疗材料将在筹款页面中公示，公示后才可开始筹款。"></tipsCom>
		<!-- 基本信息 -->
		<div class="verification-title">诊断证明照片</div>
		<van-uploader class="verification-nav" v-model="fileList" preview-size="100px"   :accept="'image/*'" :preview-full-image='true' :before-delete="deleteRead" :before-read="beforeRead"    :max-count="1" >
		  <div class="verification-nav-fill">
			  <img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/上传图片.png" alt="">
			  <div>上传照片</div>
		  </div>
		</van-uploader>


		<van-cell-group>
		  <van-field input-align="right" label="所患疾病" v-model="disease" placeholder="请填写诊断证明书疾病" />
		</van-cell-group>


		<van-cell-group><van-cell @click="show = !show" title="慢性病" :value="chronicValue" is-link /></van-cell-group>
		<van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
			<van-picker
			  show-toolbar
			  title="慢性病？"
			  :columns="columns"
			  @cancel="onCancel"
			  @confirm="onConfirm"
			/>
		</van-popup>
		<van-cell-group>
		  <van-field input-align="right" label="就诊医院地区" v-model="hospitalAddress" placeholder="请输入就诊医院地区" />
		</van-cell-group>
		<van-cell-group>
		  <van-field input-align="right" label="就诊医院名称" v-model="hospitalName" placeholder="请输入就诊医院名称" />
		</van-cell-group>
		<van-cell-group class="verification-radio">
			<span class="verification-radio-name">是否在此医院确诊</span>
			<div class="verification-radio-nav">
				<div @click="radio = 1" class="verification-radio-nav-list" :class="radio == 1 ? 'verification-radio-nav-red':''">是</div>
				<div @click="radio = 2" class="verification-radio-nav-list" :class="radio == 2 ? 'verification-radio-nav-red':''">否</div>
			</div>
		</van-cell-group>
		<div class="verification-button-bottom" @click="submit()">保存</div>
	</div>
</template>

<script>
import { Row, Col, Field, uploader, Icon, Cell, CellGroup, Popup, Picker, RadioGroup, Radio, Toast  } from 'vant';
import tipsCom from './../components/tipsCom.vue';
import consultHeader from './../components/consultHeader.vue';
export default {
	name: 'verification',
	data() {
		return {
			fileList: [],
			confirmedReport:'',
			show: false,
			columns: ['无'],
			chronicDisease:0,
			hospitalAddress:'',
			hospitalName:'',
			disease:'',
			value:"",
			radio:1,
			chronicValue:'无'
		};
	},
	components: {
    tipsCom,
    consultHeader,
		[Row.name]: Row,
		[Col.name]: Col,
		[Field.name]: Field,
		[uploader.name]: uploader,
		[Icon.name]: Icon,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		[Popup.name]: Popup,
		[Picker.name]: Picker,
		[RadioGroup.name]: RadioGroup,
		[Radio.name]: Radio,
		[Toast.name]: Toast,
	},
	mounted() {
		this.$wx.hideOptionMenu();
		this.config()
	},
	methods: {
		submit(){
			let _this = this,formData = new FormData();
			formData.append('fundraisingId',_this.$route.query.id);
			if(_this.confirmedReport == ""){
				Toast("您还未上传诊断证明照片！");
				return false
			}
			formData.append('confirmedReport',_this.confirmedReport);
			if(_this.disease == ""){
				Toast("您还未填写所患疾病！");
				return false
			}
			formData.append('disease',_this.disease);
			formData.append('chronicDisease',_this.chronicDisease);
			if(_this.hospitalAddress == ""){
				Toast("您还未填写就诊医院地区！");
				return false
			}
			formData.append('hospitalAddress',_this.hospitalAddress);
			if(_this.hospitalName == ""){
				Toast("您还未填写就诊医院名称！");
				return false
			}
			formData.append('hospitalName',_this.hospitalName);
			formData.append('isConfirmed',_this.radio);
			_this.$axios({
				method: 'post',
				url: '/yqc/supplement/addDiagnosticProof',
				data:formData,
				responseType: 'json'
			}).then(function(response) {
				if(response.data.ret){
					Toast.success('保存成功！！');
          _this.$router.go(-1);
					// _this.$router.push({
					// 	path:'/supplement',
					// 	query:{
					// 		id: _this.$route.query.id,
					// 		userId:_this.$route.query.userId
					// 	},
					// 	replace:true
					// })
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
				if(response.data.ret){
					// reply回复  leavingMsg留言  disease 慢性病
					_this.columns =  response.data.data.disease;
				}else{
					Toast.fail(response.data.msg);
				}
			}).catch(function (error) {
				Toast.fail('服务器异常！！');
				console.log(error);
			});
		},
		onConfirm( value, index) {
			this.show = false;
			this.chronicValue = value;
			this.chronicDisease = index;
		},
		onCancel(){
			this.show = false;
		},
		// 删除预览图
		deleteRead(file,detail){
			this.confirmedReport = '';
			return true
		},
		// 图片上传
		beforeRead(file) {
			let toastUpload = Toast.loading({
				message: '上传中...',
				forbidClick: false,
			  duration:0
			});
			let data = new FormData(),_this = this;
			data.append("image",file);
			_this.$axios({
					method: 'post',
					url: '/yqc/image/imageUpload',
					data:data,
					responseType: 'json'
				})
				.then(function(response) {
					console.log(response);
					if(response.data.ret){
            let obj = new Object(),ary = new Array();
            obj.url = response.data.data;
            ary.push(obj);
            _this.fileList = ary;
						_this.confirmedReport = response.data.data;
            toastUpload.clear();
						Toast.success('上传成功');
					}else{
            toastUpload.clear();
						Toast.fail('上传失败');
					}
				})
				.catch(function(error) {
          toastUpload.clear();
					Toast.fail('服务器异常！！');
				});
				return true
		},
	}
};
</script>

<style scoped lang="less">
.verification {
	width: 100vw;
  font-size: 16px;
  padding: 60px 0;
	&-radio{
		&-name{
			display: inline-block;
			padding: 10px 16px;
			font-size: 14px;
		}
		&-nav{
			float: right;
			padding-right: 15px;
			&-list{
				padding: 10px 20px 10px 16px;
				float: left;
				background: url(https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/椭圆.png);
				background-size: 16px 16px;
				background-repeat: no-repeat;
				background-position: right;
        font-size: 14px;
			}
			&-red{
				background: url(https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/选中.png);
				background-size: 16px 16px;
				background-repeat: no-repeat;
				background-position: right;
        font-size: 14px;
			}
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
	}
	&-title {
		padding: 0 15px;
		height: 50px;
		line-height: 50px;
		font-size: 20px;
	}
	&-wide {
		height: 50px;
		line-height: 50px;
		padding: 0 15px;
		font-size: 20px;
		font-weight: 900;
	}
	&-nav{
		margin: 0 auto;
		padding: 15px;
		&-title{
			margin-bottom: 15px;
		}
		&-fill{
			width: 100px;
			background: #F7F7F7;
			height: 100px;
			padding: 0.1px;
			margin-bottom: 10px;
			img{
				display: block;
				width: 32px;
				height: 31px;
				margin: 23px auto 10px;
			}
			div{
				text-align: center;
				color: #666666;
				font-size: 14px;
			}
		}
	}
	&-header {
		&-logo {
			width: 105px;
			height: 30px;
			margin: 12.5px 15px;
		}
		&-button {
			width: 100px;
			height: 35px;
			margin: 10px 15px 0 0;
			border-radius: 35px;
			background: #ff5a5a;
			color: #fff;
			font-size: 14px;
			&-icon {
				width: 16px;
				height: 16px;
				margin: 9.5px 1.5px 0 10.5px;
				vertical-align: bottom;
			}
		}
	}

	&-remind {
		background: #fff3de;
    padding: 6px 0;
		line-height:20px;
		&-icon {
			width: 18px;
			height: 18px;
			margin: 0 5px;
			display: inline-block;
			vertical-align: middle;
		}
		&-text {
			font-size: 13px;
			color: #d98422;
		}
	}
}
</style>
