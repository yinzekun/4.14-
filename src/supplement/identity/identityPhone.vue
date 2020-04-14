<template>
	<div class="identityPhone">
		<consultHeader></consultHeader>
    <tipsCom message="填写的内容会自动保存，请放心填写！"></tipsCom>
		<van-row class="identityPhone-nav">
			<van-col span="24" class="identityPhone-nav-title">照片上传</van-col>
			<van-col span="12">
				<van-uploader
					v-model="fileList1"
					:accept="'image/*'"
					:preview-full-image='true'
					:before-delete="deleteReadOne"
					:before-read="beforeReadOne"
					:max-count="1"
				>
					<div class="identityPhone-nav-fill">
						<img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/上传图片.png" alt="" />
						<div>上传身份证正面照片</div>
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

					:max-count="1"
				>
					<div class="identityPhone-nav-fill">
						<img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/上传图片.png" alt="" />
						<div>上传身份证反面照片</div>
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

					:max-count="1"
				>
					<div class="identityPhone-nav-fill">
						<img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/上传图片.png" alt="" />
						<div>患者手持身份证照片</div>
					</div>
				</van-uploader>
			</van-col>
		</van-row>
		<div class="identityPhone-remind identityPhone-back">
			<img class="identityPhone-remind-icon" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/identity/red.png" alt="" />
			<span class="identityPhone-remind-text identityPhone-back-text">错误示例</span>
		</div>
		<van-row class="identityPhone-list">
			<van-col span="6">
				<img @click="show = true" class="identityPhone-list-img" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/identity/no1.png" alt="" />
				<p>边框缺失</p>
			</van-col>
			<van-col span="6">
				<img class="identityPhone-list-img" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/identity/no1.png" alt="" />
				<p>照片模糊</p>
			</van-col>
			<van-col span="6">
				<img class="identityPhone-list-img" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/identity/no1.png" alt="" />
				<p>闪光强烈</p>
			</van-col>
			<van-col span="6">
				<img class="identityPhone-list-img" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/identity/no1.png" alt="" />
				<p>部分遮挡</p>
			</van-col>
		</van-row>

		<div class="identityPhone-remind identityPhone-back">
			<img class="identityPhone-remind-icon" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/identity/green.png" alt="" />
			<span class="identityPhone-remind-text identityPhone-back-text">正确示例</span>
		</div>
		<van-row class="identityPhone-list">
			<van-col span="6"><img class="identityPhone-list-img" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/supplement/identity/yes.png" alt="" /></van-col>
		</van-row>
		<div class="identityPhone-button-bottom" @click="submitFun()">保存</div>
	</div>
</template>

<script>
import { Row, Col, Field, Cell, CellGroup, Uploader, Toast } from 'vant';
import tipsCom from './../../components/tipsCom.vue';
import consultHeader from './../../components/consultHeader.vue';
export default {
	name: 'identityPhone',
	data() {
		return {
			value: '',
			fileList1: [],
			fileList2: [],
			fileList3: [],
			cardPositiveImg: '', //正面
			cardBackImg: '', //反面
			cardHoldImg: '' //手持身份证
		};
	},
	components: {
    tipsCom,
    consultHeader,
		[Row.name]: Row,
		[Col.name]: Col,
		[Field.name]: Field,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		[Uploader.name]: Uploader,
		[Toast.name]: Toast
	},
	mounted() {
		this.$wx.hideOptionMenu();
	},
	methods: {
		// 删除预览图
		deleteReadOne(file, detail) {
			this.cardPositiveImg = '';
			return true;
		},
		// 图片上传
		beforeReadOne(file) {
			let data = new FormData(),
				_this = this;
			data.append('image', file);
			_this.uploadImg(data,0);
			return true;
		},
		deleteReadTwo(file, detail) {
			this.cardBackImg = '';
			return true;
		},
		// 图片上传
		beforeReadTwo(file) {
			let data = new FormData(),
				_this = this;
			data.append('image', file);
			_this.uploadImg(data,1);
			return true;
		},
		deleteReadThree(file, detail) {
			this.cardHoldImg = '';
			return true;
		},
		// 图片上传
		beforeReadThree(file) {
			let data = new FormData(),
				_this = this;
			data.append('image', file);
			_this.uploadImg(data,2);
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
							_this.cardPositiveImg = response.data.data;
              _this.fileList1 = ary;
						}else if(num == 1){
							_this.cardBackImg = response.data.data;
              _this.fileList2 = ary;
						}else{
							_this.cardHoldImg = response.data.data;
              _this.fileList3 = ary;
						}
            toastUpload.clear();
						Toast.success('上传成功');
					} else {
            toastUpload.clear();
						Toast.fail('上传失败');
					}
				})
				.catch(function(error) {
					Toast.fail('服务器异常！！');
				});
		},
		submitFun(){
			let _this = this;
			if(_this.cardPositiveImg == ''){
				Toast('您还未上传身份证正面照片！');
				return false
			}
			if(_this.cardBackImg == ''){
				Toast('您还未上传身份证反面照片！');
				return false
			}
			if(_this.cardHoldImg == ''){
				Toast('您还未上传收款人手持身份证照片！');
				return false
			}
			_this.$axios({
					method: 'post',
					url: '/yqc/supplement/addIdCard?fundraisingId='+_this.$route.query.id+'&cardPositiveImg='+_this.cardPositiveImg+'&cardBackImg='+_this.cardBackImg+'&cardHoldImg='+_this.cardHoldImg,
					responseType: 'json'
				})
				.then(function(response) {
					console.log(response);

					if (response.data.ret) {
						Toast.success('保存成功！！');
            _this.$router.go(-2);
						// _this.$router.push({
						// 	path:'/supplement',
						// 	query:{
						// 		id: _this.$route.query.id,
						// 		userId:_this.$route.query.userId
						// 	},
						// 	replace:true
						// })
					} else {
						Toast.fail('保存失败!!');
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
.identityPhone {
  font-size: 15px;
  padding: 60px 0;
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
	&-list {
		padding: 15px;
		&-img {
			display: block;
			width: 95%;
			margin: 0 auto;
			border-radius: 5px;
		}
		p {
			font-size: 13px;
			text-align: center;
		}
	}
	&-header {
		width: 375px;
		position: fixed;
		top: 0;
		background: #fff;
		z-index: 1000;
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
		height: 32px;
		line-height: 32px;
		&-icon {
			width: 18px;
			height: 18px;
			margin: 7px 5px 7px 15px;
			display: inline-table;
			vertical-align: middle;
		}
		&-text {
			font-size: 13px;
			color: #d98422;
		}
	}
	&-back {
		background: #fff;
		&-text {
			color: #000;
		}
	}
	&-fill {
		margin: 0 auto;
	}
	&-nav {
		margin: 0 auto;
		padding: 15px;
		&-title {
			margin-bottom: 15px;
		}
		&-fill {
			width: 160px;
			background: #f7f7f7;
			height: 100px;
			padding: 0.1px;
			margin-bottom: 10px;
			img {
				display: block;
				width: 32px;
				height: 31px;
				margin: 23px auto 10px;
			}
			div {
				text-align: center;
				color: #666666;
				font-size: 14px;
			}
		}
	}
}
</style>
<style>
.identityPhone .van-image {
	display: block;
	width: 160px;
	height: 100px;
}
</style>
