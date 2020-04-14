<template>
	<div class="information">
		<consultHeader></consultHeader>
    <tipsCom message="您的医疗材料将在筹款页面中公示，公示后才可开始筹款。"></tipsCom>
		<!-- 基本信息 -->
		<div class="information-title">填写基本信息</div>
		<van-cell-group><van-cell @click="show = !show" title="发起人与患者关系" :value="relationship" is-link /></van-cell-group>
		<van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
			<van-picker
			  show-toolbar
			  title="与患者关系"
			  :columns="columns"
			  @cancel="show = false"
			  @confirm="onConfirm"
			/>
		</van-popup>
		<div v-if="formData.promoterRelation == 1">
			<van-cell-group>
			  <van-field input-align="right" label="发起人姓名" v-model="formData.promoterName" placeholder="请输入发起人姓名" />
			</van-cell-group>
			<van-cell-group>
			  <van-field label-width="150px" input-align="right" label="发起人身份证号" v-model="formData.promoterCard" placeholder="请输入发起人身份证号" />
			</van-cell-group>
		</div>
		<van-cell-group>
		  <van-field input-align="right" maxlength="30" label="患者姓名" v-model="formData.patientName" placeholder="请输入患者姓名" />
		</van-cell-group>

		<van-cell-group><van-cell @click="papersShow = !papersShow" title="患者证件类型" :value="papersType" is-link /></van-cell-group>
		<van-popup v-model="papersShow" position="bottom" :style="{ height: '40%' }">
			<van-picker
			  show-toolbar
			  title="证件类型"
			  :columns="papersColumns"
			  @cancel="papersShow = false"
			  @confirm="onPapersConfirm"
			/>
		</van-popup>
		<van-cell-group>
		  <van-field input-align="right" maxlength="20" :label="papersLabel" v-model="formData.patientCard" :placeholder="papersPlace" />
		</van-cell-group>
		<!-- 医疗资料 -->
		<div class="information-wide">上传医疗材料</div>
		<div class="information-text">请上传一张医疗材料：</div>
		<div class="information-text">1.需要有患者姓名、疾病名称或病情描述，且图片清晰。</div>
		<div class="information-text">2.类型任选其一：诊断证明、病例首页、出入院证明、诊断报告等。</div>
		<div class="information-fill">
			<van-uploader v-model="fileList"  :accept="'image/*'" :preview-full-image='true' :before-delete="deleteRead" :before-read="beforeRead" :max-count="1" />
    </div>
		<van-row class="information-agreement">
			<van-col span="24">
				<span>暂时无法提供资料怎么办？拨打400电话咨询：</span>
				<a href="tel:4006099595" class="information-agreement-red">400 609 9595</a>
			</van-col>
		</van-row>
		<div class="information-button-bottom" @click="submitFun">提交</div>
	</div>
</template>

<script>
import { Row, Col, Field, uploader, Icon, Cell, CellGroup, Popup, Picker, Notify, Toast } from 'vant';
import tipsCom from './../components/tipsCom.vue';
import consultHeader from './../components/consultHeader.vue';
export default {
	name: 'information',
	data() {
		return {
			relationship:'本人', //与患者关系
			papersType:'身份证', //证件类型
			fileList: [],
			show: false,
			papersShow:false,
			columns: ['本人', '非本人'],
			papersColumns:['身份证','出生证'],
			value:"",
			papersLabel:'患者身份证号',
			papersPlace:'请输入身份证号',
			formData:{
				"promoterName":'', //发起人姓名
				"promoterCard":'',		//发起人身份证号
				"promoterRelation":	0, //发起人与患者关系(0本人1非本人)
				"patientName": 	'',	//患者名字
				"patientCardType" :0,	//证件类型0身份证1出生证
				"patientCard" :'',		//患者证件号
				"image":'',
			}
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
		[Notify.name]: Notify,
		[Toast.name]: Toast,
	},
	mounted() {
		this.$wx.hideOptionMenu();
	},
	methods: {
		submitFun(){
			// 提交表单
			let date = new FormData(),_this = this;
			date.append('userId',JSON.parse(sessionStorage.getItem('yqcUserData')).id);
			date.append('promoterRelation',_this.formData.promoterRelation);
			if(_this.formData.promoterRelation == 1){
				if(_this.formData.promoterName == ''){
					Notify({ type: 'danger', message: '您还未填写发起人姓名' });
					return false
				}
				date.append('promoterName',_this.formData.promoterName);

				if(_this.formData.promoterCard == ''){
					Notify({ type: 'danger', message: '您还未填写发起人身份证号' });
					return false
				}
				date.append('promoterCard',_this.formData.promoterCard);
			}
			date.append('patientCardType',_this.formData.patientCardType);
			if(_this.formData.patientName == ''){
				Notify({ type: 'danger', message: '您还未填写患者姓名' });
				return false
			}
			date.append('patientName',_this.formData.patientName);
			if(_this.formData.patientCard == ''){
				Notify({ type: 'danger', message: '您还未填写患者身份证号' });
				return false
			}
			date.append('patientCard',_this.formData.patientCard);
			if(_this.formData.image == ''){
				Notify({ type: 'danger', message: '您还未上传医疗资料' });
				return false
			}
			date.append('image',_this.formData.image);
      date.append('fundraisingId',_this.$route.query.id);

      // alert(JSON.stringify(date))
			_this.$axios({
					method: 'post',
					url: '/yqc/fundraising/basicInformation',
					data:date,
					responseType: 'json'
				})
				.then(function(response) {
          // alert(JSON.stringify(response))
					if(response.data.ret){
						_this.$router.replace({ path:'/inAudit'})
					}else{
						Toast(response.data.msg);
					}
				})
				.catch(function(error) {
					console.log(error);
				});

		},
		// 删除预览图
		deleteRead(file,detail){
			this.formData.image = '';
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
						_this.formData.image = response.data.data;
            let obj = new Object(),ary = new Array();
            obj.url = response.data.data;
            ary.push(obj);
            _this.fileList = ary;
            // alert(JSON.stringify(response.data.data));
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
		onConfirm( value, index) {
			this.show = false;
			this.relationship = value;
			this.formData.promoterRelation = index;
		},
		onPapersConfirm(value, index){
			this.papersShow = false;
			this.formData.patientCardType = index;
			if(index == 0){
				this.papersLabel = '患者身份证号';
				this.papersPlace = '请输入身份证号';
			}else{
				this.papersLabel = '患者出生证号';
				this.papersPlace = '请输入出生证号';
			}
			this.papersType = value;
		},
	}
};
</script>

<style scoped lang="less">
.information {
  font-size: 16px;
	width: 100vw;
  padding: 60px 0;
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
	&-textRight{
		// text-align: right;
	}
	&-title {
		padding: 0 15px;
		height: 50px;
		line-height: 50px;
		font-size: 20px;
	}
	&-agreement {
		font-size: 12px;
		color: #666666;
		padding-left: 15px;
		&-red {
			color: #ff5a5a;
			text-decoration: underline;
		}
	}
	&-wide {
		height: 50px;
		line-height: 50px;
		padding: 0 15px;
		font-size: 20px;
		font-weight: 900;
	}
	&-text {
		font-size: 14px;
		color: #999999;
		padding: 5px 15px;
		line-height: 20px;
	}
	&-fill {
		padding: 15px 15px 50px 15px;
	}
}
</style>
