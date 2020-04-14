<template>
	<div id="relative" class="relative" style="padding-bottom: 60px;">
    <van-cell-group id="relative">
      <van-cell class="vanCell"><van-field input-align="right" label="收款人姓名" v-model="name" placeholder="请输入收款人姓名" /></van-cell>
      <van-cell class="vanCell"><van-field input-align="right" label="收款人电话" v-model="phone" placeholder="请输入收款人电话" /></van-cell>
      <van-cell class="vanCell"><van-field input-align="right" label="开户银行" v-model="bankName" placeholder="请输入开户银行" /></van-cell>
      <van-cell v-model="bankRegion" title="开户支行" @click="show = true"></van-cell>
      <van-popup v-model="show" position="bottom">
      	<van-area ref="area" value="110000" :area-list="areaList" @change="onChange" @confirm="show = false" @cancel="show = false" />
      </van-popup>
      <van-cell class="vanCell"><van-field input-align="right" label="支行名称" v-model="bankSubName" placeholder="请输入支行名称" /></van-cell>
      <van-cell class="vanCell"><van-field input-align="right" label="银行卡号" v-model="bankNo" placeholder="请输入银行卡号" /></van-cell>
      <van-cell class="vanCell"><van-field input-align="right" label="银行预留电话" v-model="bankPhone" placeholder="请输入银行预留电话" /></van-cell>
    </van-cell-group>

		<van-row class="relative-nav">
			<van-col span="24" class="relative-nav-title">
				照片上传
			</van-col>
			<van-col span="12">
				<van-uploader class="relative-fill"
					v-model="fileList1"
					:accept="'image/*'"
					:preview-full-image='true'
					:before-delete="deleteReadOne"
					:before-read="beforeReadOne"
					:max-count="1" >
				  <div class="relative-nav-fill">
					  <img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/上传图片.png" alt="">
					  <div>村委会盖章证明照片</div>
				  </div>
				</van-uploader>
			</van-col>
			<van-col span="12">
				<van-uploader
					v-model="fileList2"
					:accept="'image/*'"
					:preview-full-image='true'
					:before-delete="deleteReadTwo"
					:before-read="beforeReadTwo"
					:max-count="1">
				  <div class="relative-nav-fill">
					  <img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/上传图片.png" alt="">
					  <div>户口本首页照片</div>
				  </div>
				</van-uploader>
			</van-col>
			<van-col span="12">
				<van-uploader
					v-model="fileList3"
					:accept="'image/*'"
					:preview-full-image='true'
					:before-delete="deleteReadThree"
					:before-read="beforeReadThree"
					:max-count="1" >
				  <div class="relative-nav-fill">
					  <img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/上传图片.png" alt="">
					  <div>患者户口本首页照片</div>
				  </div>
				</van-uploader>
			</van-col>
			<van-col span="12">
				<van-uploader
					v-model="fileList4"
					:accept="'image/*'"
					:preview-full-image='true'
					:before-delete="deleteReadFour"
					:before-read="beforeReadFour"
					:max-count="1">
				  <div class="relative-nav-fill">
					  <img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/上传图片.png" alt="">
					  <div>收款人户口本首页照片</div>
				  </div>
				</van-uploader>
			</van-col>
			<van-col span="12">
				<van-uploader
					v-model="fileList5"
					:accept="'image/*'"
					:preview-full-image='true'
					:before-delete="deleteReadFive"
					:before-read="beforeReadFive"
					:max-count="1">
				  <div class="relative-nav-fill">
					  <img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/上传图片.png" alt="">
					  <div>收款人手持身份证照片</div>
				  </div>
				</van-uploader>
			</van-col>
      <van-col span="12">
      	<van-uploader
      		v-model="fileList6"
      		:accept="'image/*'"
      		:preview-full-image='true'
      		:before-delete="deleteReadSix"
      		:before-read="beforeReadSix"
      		:max-count="1">
      	  <div class="relative-nav-fill">
      		  <img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/上传图片.png" alt="">
      		  <div>银行卡照片</div>
      	  </div>
      	</van-uploader>
      </van-col>
		</van-row>
		<div class="relative-button-bottom" @click="submitFun()">保存</div>
	</div>
</template>

<script>
import { Row, Col, Field, Cell, CellGroup, Uploader, Area, Popup, Toast  } from 'vant';
import AreaList from './area';
export default {
	name: 'relative',
	data() {
		return {
			name:'',
			phone:'',
			bankName:'',
			bankNo:'',
			bankRegion:'北京市 北京市 东城区',
			bankSubName:'',
			bankPhone:'',
			show:false,
			areaList:AreaList,
			fileList1:[],
			villageCommitteeImg:'',
			fileList2:[],
			accountFirstImg:'',
			fileList3:[],
			patientAccountImg:'',
			fileList4:[],
			payeeAccountFirstImg:'',
			fileList5:[],
			payeeIdcardImg:'',
      fileList6:[],
      cardImg:''
		};
	},
	components: {
		[Row.name]: Row,
		[Col.name]: Col,
		[Field.name]: Field,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		[Uploader.name]: Uploader,
		[Area.name]: Area,
		[Popup.name]: Popup,
		[Toast.name]: Toast,
	},
	mounted() {
		this.$wx.hideOptionMenu();
	},
	methods: {
		submitFun(){
			let _this = this,formData = new FormData();
			if(_this.name == ''){
				Toast("您还未填写收款人姓名！");
				return false
			}
			formData.append('name',_this.name);

			if(_this.phone == ''){
				Toast("您还未填写收款人电话！");
				return false
			}
			formData.append('phone',_this.phone);

			if(_this.bankName == ''){
				Toast("您还未填写开户银行！");
				return false
			}
			formData.append('bankName',_this.bankName);

			if(_this.bankRegion == '请选择'){
				Toast("您还未选择开户行地区！");
				return false
			}
			formData.append('bankRegion',_this.bankRegion);

			if(_this.bankSubName == ''){
				Toast("您还未填写支行名称！");
				return false
			}
			formData.append('bankSubName',_this.bankSubName);

			if(_this.bankNo == ''){
				Toast("您还未填写银行卡号！");
				return false
			}
			formData.append('bankNo',_this.bankNo);

			if(_this.bankPhone == ''){
				Toast("您还未填写银行预留电话！");
				return false
			}
			formData.append('bankPhone',_this.bankPhone);


			// villageCommitteeImg 村委会盖章证明照片  accountFirstImg 户口本首页   patientAccountImg 患者户口本照片
			if(_this.villageCommitteeImg == ''){
				Toast("您还未上传村委会盖章证明照片！");
				return false
			}
			formData.append('villageCommitteeImg',_this.villageCommitteeImg);

			if(_this.accountFirstImg == ''){
				Toast("您还未上传户口本首页照片！");
				return false
			}
			formData.append('accountFirstImg',_this.accountFirstImg);

			if(_this.patientAccountImg == ''){
				Toast("您还未上传患者户口本照片！");
				return false
			}
			formData.append('patientAccountImg',_this.patientAccountImg);
			// payeeAccountFirstImg 收款人户口本首页照片  payeeIdcardImg 收款人手持身份证照片
			if(_this.payeeAccountFirstImg == ''){
				Toast("您还未上传收款人户口本首页照片！");
				return false
			}
			formData.append('payeeAccountFirstImg',_this.payeeAccountFirstImg);

			if(_this.payeeIdcardImg == ''){
				Toast("您还未上传收款人手持身份证照片！");
				return false
			}
			formData.append('payeeIdcardImg',_this.payeeIdcardImg);

      if(_this.cardImg == ''){
      	Toast("您还未上传银行卡照片！");
      	return false
      }
      formData.append('cardImg',_this.cardImg);

			formData.append('fundraisingId',_this.$route.query.id);
			formData.append('relation',3);

			_this.$axios({
				method: 'post',
				url: '/yqc/supplement/addPayee',
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
		// 上传结婚证照片
		beforeReadOne(file) {
			let data = new FormData(),
				_this = this;
			data.append('image', file);
			_this.uploadImg(data,0);
			return true;
		},
		deleteReadOne(file, detail) {
			this.villageCommitteeImg = '';
			return true;
		},
		// 上传户口本首页
		beforeReadTwo(file) {
			let data = new FormData(),
				_this = this;
			data.append('image', file);
			_this.uploadImg(data,1);
			return true;
		},
		deleteReadTwo(file, detail) {
			this.accountFirstImg = '';
			return true;
		},
		// 上传患者户口本照片
		beforeReadThree(file) {
			let data = new FormData(),
				_this = this;
			data.append('image', file);
			_this.uploadImg(data,2);
			return true;
		},
		deleteReadThree(file, detail) {
			this.patientAccountImg = '';
			return true;
		},
		// 上传收款人户口本首页
		beforeReadFour(file) {
			let data = new FormData(),
				_this = this;
			data.append('image', file);
			_this.uploadImg(data,3);
			return true;
		},
		deleteReadFour(file, detail) {
			this.payeeAccountFirstImg = '';
			return true;
		},
		// 上传收款人手持身份证
		beforeReadFive(file) {
			let data = new FormData(),
				_this = this;
			data.append('image', file);
			_this.uploadImg(data,4);
			return true;
		},
		deleteReadFive(file, detail) {
			this.payeeIdcardImg = '';
			return true;
		},
    // 上传银行卡照片
    beforeReadSix(file) {
    	let data = new FormData(),
    		_this = this;
    	data.append('image', file);
    	_this.uploadImg(data,5);
    	return true;
    },
    deleteReadSix(file, detail) {
    	this.cardImg = '';
    	return true;
    },
		uploadImg(data,num) {
			let _this = this;
      let toastUpload = Toast.loading({
      	message: '上传中...',
      	forbidClick: false,
        duration:0
      });
			_this.$axios({
					method: 'post',
					url: '/yqc/image/imageUpload',
					data: data,
					responseType: 'json'
				})
				.then(function(response) {
					console.log(response);
					if (response.data.ret) {
            let obj = new Object(),ary = new Array();
            obj.url = response.data.data;
            ary.push(obj);
						if(num == 0){
              _this.fileList1 = ary;
							_this.villageCommitteeImg = response.data.data;
						}else if(num == 1){
               _this.fileList2 = ary;
							_this.accountFirstImg = response.data.data;
						}else if(num == 2){
               _this.fileList3 = ary;
							_this.patientAccountImg = response.data.data;
						}else if(num == 3){
               _this.fileList4 = ary;
							_this.payeeAccountFirstImg = response.data.data;
						}else if(num == 4){
               _this.fileList5 = ary;
							_this.payeeIdcardImg = response.data.data;
						}else if(num == 5){
               _this.fileList6 = ary;
              _this.cardImg = response.data.data;
            }
            toastUpload.clear();
						Toast.success('上传成功');
					} else {
            toastUpload.clear();
						Toast.fail('上传失败');
					}
				})
				.catch(function(error) {
          toastUpload.clear();
					Toast.fail('服务器异常！！');
				});
		},
		onChange(picker, value, index) {
			let areaName = '';
			for (var i = 0; i < value.length; i++) {
				areaName = areaName + value[i].name + ' ';
			}
			this.bankRegion = areaName;
		}
	}
};
</script>

<style scoped lang="less">
.relative{
  font-size: 16px;
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
	&-fill{
		margin: 0 auto;
	}
	&-nav{
		margin: 0 auto;
		padding: 15px;
		&-title{
			margin-bottom: 15px;
		}
		&-fill{
			width: 160px;
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
}
</style>
<style>
.relative .van-image{
	display: block;
	    width: 160px;
	    height: 100px;
}
#relative .vanCell{
  padding: 0;
}
#relative .van-cell:not(:last-child):after{
    left: 0;
  }
</style>
