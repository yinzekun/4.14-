<template>
	<div class="report">
		<consultHeader></consultHeader>
    <tipsCom message="欢迎社会各界爱心人士监督举报，让每一份善意都能到达真正需要的地方。"></tipsCom>
		<p class="report-title">
			选择举报类型
			<span class="report-title-leb">(至少选择一项)</span>
		</p>
    <van-cell-group>
      <van-radio-group v-model="radio" class="report-radio">
        <van-cell v-for="(item,index) in reportList" :key="index"><van-radio icon-size="18px" checked-color="#FF5A5A" :name="index">{{item}}</van-radio></van-cell>
      </van-radio-group>
      <van-cell>
        <p class="report-text">举报原因</p>
        <van-field class="fieldCell" v-model="reason" rows="1" autosize type="textarea" maxlength="20" placeholder="请输入..." show-word-limit />
      </van-cell>

      <van-cell>
        <p class="report-text">上传证据图片</p>
        <van-uploader class="report-nav" v-model="fileList" preview-size="100px" :accept="'image/*'" :preview-full-image='true' :before-delete="deleteRead" :before-read="beforeRead"    :max-count="1" >
        	<div class="report-nav-fill">
        		<img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/上传图片.png" alt="" />
        		<div>上传照片</div>
        	</div>
        </van-uploader>
      </van-cell>
    </van-cell-group>
		<p class="report-tips">暂时无法提供资料怎么办？拨打400电话咨询：<a href="tel:400 609 9595">400 609 9595</a></p>
		<div class="report-button-bottom" @click="submitFun">提交</div>
	</div>
</template>

<script>
import { Row, Col, Cell, CellGroup, RadioGroup, Radio, Field, uploader, Toast } from 'vant';
import consultHeader from './../components/consultHeader.vue';
import tipsCom from './../components/tipsCom.vue';
export default {
	name: 'report',
	data() {
		return {
			radio: 0,
			fileList:[],
			reason:'',
			image:'',
			reportList:[]
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
		[Toast.name]: Toast,
	},
	mounted() {
		this.$wx.hideOptionMenu();
		this.onType();
	},
	methods: {
		submitFun(){
			let _this = this,formData = new FormData();
			if(_this.reason == ''){
				Toast('您还未填写举报原因！！');
				return false
			}
			formData.append('userId',_this.$route.query.currentUserId);
			formData.append('fundraisingId',_this.$route.query.id);
			formData.append('reportConfigId',_this.reportList[_this.radio]);
			formData.append('reason',_this.reason);
			formData.append('image',_this.image);
			_this.$axios({
				method: 'post',
				url: '/yqc/user/report',
				data:formData,
				responseType: 'json'
			}).then(function(response) {
				console.log(response);
				if(response.data.ret){
					Toast.success('发布成功');
					if(_this.$route.query.several == 1){
						_this.$router.go(-1);
					}else{
						_this.$router.go(-2);
					}
				}else{
					Toast.fail(response.data.msg);
				}
			}).catch(function (error) {
				Toast.fail('服务器异常！！');
				console.log(error);
			});
		},
		onType(){
			let _this = this;
			_this.$axios({
				method: 'post',
				url: '/yqc/donation/getThankConfig',
				responseType: 'json'
			}).then(function(response) {
				if(response.data.ret){
					_this.reportList = response.data.data.report;
				}
			}).catch(function (error) {
				console.log(error);
			});
		},
		// 删除预览图
		deleteRead(file,detail){
			this.image = '';
			return true
		},
		// 图片上传
		beforeRead(file) {
			Toast.loading({
				message: '上传中...',
				forbidClick: false
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
					if(response.data.ret){
            let obj = new Object(),ary = new Array();
            obj.url = response.data.data;
            ary.push(obj);
            _this.fileList = ary;
						_this.image = response.data.data;
						Toast.success('上传成功');
					}else{
						Toast.fail('上传失败');
					}
				})
				.catch(function(error) {
					Toast.fail('服务器异常！！');
				});
				return true
		},
	}
};
</script>

<style scoped lang="less">
.report {
  font-size: 16px;
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
	&-tips{
		font-size: 12px;
		color: #666;
		text-align: center;
		margin-top: 25px;
		a{
			color: #ff5a5a;
			text-decoration: underline;
		}
	}
	&-text{
		font-size: 16px;
	}
	&-nav {
		margin: 0 auto;
		&-title {
			margin-bottom: 15px;
		}
		&-fill {
			width: 100px;
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
	&-radio {
		font-size: 16px;
    border-bottom: 1px solid #ebedf0;
	}
	&-title {
		font-size: 20px;
		padding: 0 15px;
		&-leb {
			font-size: 15px;
			color: #666;
		}
	}
}
</style>
<style>
  .report .van-cell:not(:last-child):after{
    left: 0;
  }
  .report .fieldCell{
    padding: 5px 0;
  }
</style>
