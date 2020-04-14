<template>
	<div style="padding-bottom: 60px;">
		<div class="releasePromise-tips">
			告诉大家您的履行承诺的最新动态，同时感谢您的帮助者。告诉大家您已经持续的把大家的爱心传递下去！您的每一次献血，每一次参加义工活动都将是一份正能量，带给大家公益的温暖！
		</div>
		<div class="releasePromise-clear"></div>

		<van-cell-group>
			<p class="releasePromise-title">献血地址</p>
			<van-field v-model="bloodDonationAddress" rows="2" autosize type="textarea" maxlength="20" placeholder="请输入..." show-word-limit />
		</van-cell-group>
		<van-cell-group><van-cell @click="show = !show" title="献血时间" v-model="bloodDonationTime" /></van-cell-group>
		<van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
			<van-datetime-picker @cancel="show = false" v-model="currentDate" type="date" :formatter="formatter" :min-date="minDate" :max-date="maxDate" @confirm="getValues" />
		</van-popup>

		<van-cell-group><van-field input-align="right" label="献血量(cc)" v-model="bloodDonationNum" @keyup="bloodDonationNum = bloodDonationNum.replace(/[^\d]/g,'')" placeholder="请输入献血量" /></van-cell-group>
		<van-cell-group>
			<p class="releasePromise-title">上传图片</p>
			<van-uploader class="releasePromise-nav" v-model="fileList" preview-size="100px" :accept="'image/*'" :preview-full-image='true' :before-delete="deleteRead" :before-read="beforeRead" :m="1" >
				<div class="releasePromise-nav-fill">
					<img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/上传图片.png" alt="" />
					<div>上传照片</div>
				</div>
			</van-uploader>

		</van-cell-group>
		<div class="releasePromise-clear"></div>

		<van-cell-group><van-cell @click="showTop = !showTop" title="参加义工时间" v-model="volunteerTime" /></van-cell-group>
		<van-popup v-model="showTop" position="bottom" :style="{ height: '40%' }">
			<van-datetime-picker @cancel="showTop = false" v-model="currentDate" type="date" :formatter="formatter" :min-date="minDate" :max-date="maxDate" @confirm="getValuesTop" />
		</van-popup>
		<van-cell-group>
			<p class="releasePromise-title">参加义工地点</p>
			<van-field v-model="volunteerAddress" rows="2" autosize type="textarea" maxlength="20" placeholder="请输入..." show-word-limit />
		</van-cell-group>

		<van-cell-group>
			<p class="releasePromise-title">义工内容</p>
			<van-field v-model="volunteerContent" rows="3" autosize type="textarea" maxlength="100" placeholder="请输入..." show-word-limit />
		</van-cell-group>
		<van-cell-group>
			<p class="releasePromise-title">上传图片</p>

			<van-uploader class="releasePromise-nav" v-model="fileListBottom" preview-size="100px" :accept="'image/*'" :preview-full-image='true' :before-delete="deleteReadBottom" :before-read="beforeReadBottom" :m="1" >
				<div class="releasePromise-nav-fill">
					<img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/上传图片.png" alt="" />
					<div>上传照片</div>
				</div>
			</van-uploader>
		</van-cell-group>

		<div class="releasePromise-button-bottom" @click="submitFun()">提交</div>
	</div>
</template>

<script>
import { Row, Col, Cell, CellGroup, Field, uploader, DatetimePicker, Popup, Toast } from 'vant';
export default {
	name: 'releasePromise',
	data() {
		return {
			message: '',
			value: '',
			fileList: [],
			fileListBottom:[],
			minDate: new Date(2017, 0, 1),
			maxDate: new Date(),
			currentDate: new Date(),
			show: false,
			showTop:false,
			bloodDonationStatus:1, //献血状态
			bloodDonationAddress:'',
			bloodDonationTime:'请选择',
			bloodDonationNum:'',
			bloodDonationImg:'',
			volunteerStatus:1, //义工状态
			volunteerAddress:'',
			volunteerTime:'请选择',
			volunteerContent:'',
			volunteerImg:'',
		};
	},
	components: {
		[Row.name]: Row,
		[Col.name]: Col,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		[Field.name]: Field,
		[uploader.name]: uploader,
		[DatetimePicker.name]: DatetimePicker,
		[Popup.name]: Popup,
		[Toast.name]: Toast,
	},
	mounted() {
		this.$wx.hideOptionMenu();
	},
	methods: {
		submitFun(){
			let _this = this;
			_this.volunteerStatus = 1 ;
			_this.bloodDonationStatus = 1;
			if(_this.bloodDonationAddress != ''||_this.bloodDonationTime!='请选择'||_this.bloodDonationNum!=''){
				// 献血有输入
				if(_this.bloodDonationAddress == ''){
					Toast('您还未填写献血地址！');
					return false
				}

				if(_this.bloodDonationTime == '请选择'){
					Toast('您还未选择献血时间！');
					return false
				}

				if(_this.bloodDonationNum == ''){
					Toast('您还未填写献血量！');
					return false
				}
				_this.bloodDonationStatus = 0;
			}

			if(_this.volunteerAddress != ''||_this.volunteerTime!='请选择'||_this.volunteerContent!=''){
				// 义工有输入
				if(_this.volunteerTime == '请选择'){
					Toast('您还未选择参加义工时间！');
					return false
				}

				if(_this.volunteerAddress == ''){
					Toast('您还未填写义工地点！');
					return false
				}

				if(_this.volunteerContent == ''){
					Toast('您还未填写义工内容！');
					return false
				}
				_this.volunteerStatus = 0;
			}

			if(_this.volunteerStatus == 1 && _this.bloodDonationStatus == 1 ){
				Toast('您还未填写献血信息和义工任意信息！');
			}else{
				let formData = new FormData();
				formData.append('fundraisingId',_this.$route.query.id);
				// 献血
				formData.append('bloodDonationStatus',_this.bloodDonationStatus);
				formData.append('bloodDonationAddress',_this.bloodDonationAddress);
				formData.append('bloodDonationTime',_this.bloodDonationTime);
				formData.append('bloodDonationNum',_this.bloodDonationNum);
				formData.append('bloodDonationImg',_this.bloodDonationImg);
				// 义工
				formData.append('volunteerStatus',_this.volunteerStatus);
				formData.append('volunteerAddress',_this.volunteerAddress);
				formData.append('volunteerTime',_this.volunteerTime);
				formData.append('volunteerContent',_this.volunteerContent);
				formData.append('volunteerImg',_this.volunteerImg);
				_this.$axios({
						method: 'post',
						url: '/yqc/user/addPromise',
						data:formData,
						responseType: 'json'
					})
					.then(function(response) {
						console.log(response);
						if(response.data.ret){
							Toast.success('发布成功');
							_this.$router.go(-1);
						}else{
							Toast.fail(response.data.msg);
						}
					})
					.catch(function(error) {
						Toast.fail('服务器异常！！');
					});
			}

		},
		getValues(time) {
			this.bloodDonationTime = this.timeText(time);
			this.show = false;
		},
		getValuesTop(time){
			this.volunteerTime = this.timeText(time)
			this.showTop = false;
		},
		timeText(time){
			return time.getFullYear()+'-'+(Number(time.getMonth())+1)+'-'+time.getDate()
		},
		formatter(type, value) {
			if (type === 'year') {
				return `${value}年`;
			} else if (type === 'month') {
				return `${value}月`;
			}
			return value;
		},
		// 删除预览图
		deleteRead(file,detail){
			this.bloodDonationImg = '';
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
					console.log(response);
					if(response.data.ret){
            let obj = new Object(),ary = new Array();
            obj.url = response.data.data;
            ary.push(obj);
            _this.fileList = ary;
						_this.bloodDonationImg = response.data.data;
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

		// 删除预览图
		deleteReadBottom(file,detail){
			this.volunteerImg = '';
			return true
		},
		// 图片上传
		beforeReadBottom(file) {
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
            _this.fileListBottom = ary;
						_this.volunteerImg = response.data.data;
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
.releasePromise {
  font-size: 16px;
	&-tips {
		padding: 15px;
		font-size: 13px;
		color: #ff5a5a;
		text-align: justify;
		line-height: 20px;
	}
	&-clear {
		height: 10px;
		background: #f7f7f7;
	}
	&-title {
		padding: 0 15px;
		font-size: 14px;
	}
	&-nav {
		margin: 0 auto;
		padding: 0 15px;
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
}
</style>
