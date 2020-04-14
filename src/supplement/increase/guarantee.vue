<template>
	<div>
		<van-cell-group>
			<div class="guarantee-title">患者个人保障状况</div>
			<div class="guarantee-text">患者是否按时缴纳医保</div>
			<span class="guarantee-radio" @click="medicalInsurance = 0" :class="medicalInsurance == 0 ? 'guarantee-red' : ''">有</span>
			<span class="guarantee-radio" @click="medicalInsurance = 1" :class="medicalInsurance == 1 ? 'guarantee-red' : ''">没有</span>
		</van-cell-group>

		<van-cell-group>
			<div class="guarantee-text">患者是否购买商业重大疾病保险</div>
			<span class="guarantee-radio" @click="sicknessInsurance = 0" :class="sicknessInsurance == 0 ? 'guarantee-red' : ''">有</span>
			<span class="guarantee-radio" @click="sicknessInsurance = 1" :class="sicknessInsurance == 1 ? 'guarantee-red' : ''">没有</span>
		</van-cell-group>

		<van-cell-group>
			<div class="guarantee-text">患者是否登记低保证明或其他证明</div>
			<span class="guarantee-radio" @click="subsistenceAllowances = 0" :class="subsistenceAllowances == 0 ? 'guarantee-red' : ''">有</span>
			<span class="guarantee-radio" @click="subsistenceAllowances = 1" :class="subsistenceAllowances == 1 ? 'guarantee-red' : ''">没有</span>
		</van-cell-group>

		<van-cell-group v-if="subsistenceAllowances == 0">
			<div class="guarantee-text">享有低保或其他证明情况</div>
			<van-field v-model="subsistenceAllowancesExplain" rows="3" autosize type="textarea" placeholder="请说明..." />
		</van-cell-group>

		<van-cell-group  v-if="subsistenceAllowances == 0">
			<div class="guarantee-text">上传图片<span class="guarantee-text-small">(低保证或者乡、村两级证明)</span></div>
			<van-uploader class="guarantee-nav" v-model="fileList" preview-size="100px" :accept="'image/*'" :preview-full-image='true' :before-delete="deleteRead" :before-read="beforeRead"    :max-count="1" >
				<div class="guarantee-nav-fill">
					<img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/上传图片.png" alt="" />
					<div>上传照片</div>
				</div>
			</van-uploader>
		</van-cell-group>

		<van-cell-group>
			<div class="guarantee-text">患者是否享有政府补助</div>
			<span class="guarantee-radio" @click="bailout = 0" :class="bailout == 0 ? 'guarantee-red' : ''">有</span>
			<span class="guarantee-radio" @click="bailout = 1" :class="bailout == 1 ? 'guarantee-red' : ''">没有</span>
		</van-cell-group>

		<van-cell-group v-if="bailout == 0">
			<div class="guarantee-text">政府救助情况</div>
			<van-field v-model="bailoutExplain" rows="3" autosize type="textarea" placeholder="请说明..." />
		</van-cell-group>

		<van-cell-group v-if="bailout == 0">
			<div class="guarantee-text">上传图片<span class="guarantee-text-small">(建档立卡贫困户或者乡、村两级低保户证明)</span></div>
			<van-uploader class="guarantee-nav" v-model="fileListBottom" preview-size="100px" :accept="'image/*'" :preview-full-image='true' :before-delete="deleteReadBottom" :before-read="beforeReadBottom"    :max-count="1" >
				<div class="guarantee-nav-fill">
					<img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/上传图片.png" alt="" />
					<div>上传照片</div>
				</div>
			</van-uploader>
		</van-cell-group>

		<van-cell-group>
			<div class="guarantee-text">患者家庭经济状态</div>
			<van-field label-width="150px" input-align="right" label="患者家庭年收入" v-model="income" @input="income = income.replace(/[^\d]/g,'')" placeholder="元" />
		</van-cell-group>
		<van-cell-group>
			<van-field label-width="250px" input-align="right" label="患者家庭金融资产总价值" v-model="financialAssets" @input="financialAssets = financialAssets.replace(/[^\d]/g,'')" placeholder="元" />
		</van-cell-group>

		<div class="guarantee-tips">可稍后去我的筹款-补充材料中补充完整</div>
		<div class="guarantee-button-bottom" @click="submit()">保存</div>
	</div>
</template>

<script>
import { Row, Col, Cell, CellGroup, Field, uploader, Toast } from 'vant';
export default {
	name: 'guarantee',
	data() {
		return {
			medicalInsurance: 0,
			sicknessInsurance: 0,
			subsistenceAllowances: 0,
			subsistenceAllowancesExplain:'',
			subsistenceAllowancesProve:'',
			bailout:0,
			bailoutExplain:'',
			bailoutProve:'',
			income:'',
			financialAssets:'',
			fileList:[],
			fileListBottom:[],
		};
	},
	components: {
		[Row.name]: Row,
		[Col.name]: Col,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		[Field.name]: Field,
		[uploader.name]: uploader,
		[Toast.name]: Toast,
	},
	mounted() {
		this.$wx.hideOptionMenu();
	},
	methods: {
		// 保存
		submit(){
			let _this = this,data = JSON.parse(localStorage.getItem("increaseData"));
			data.medicalInsurance = _this.medicalInsurance;
			data.sicknessInsurance = _this.sicknessInsurance;
			data.subsistenceAllowances = _this.subsistenceAllowances;
			if(_this.subsistenceAllowances == 0){
				if(_this.subsistenceAllowancesExplain == ""){
					Toast('您还未填写享有低保情况！！');
					return false
				}
				data.subsistenceAllowancesExplain = _this.subsistenceAllowancesExplain;
				if(_this.subsistenceAllowancesProve == ""){
					Toast('您还未上传低保证明照片！！');
					return false
				}
				data.subsistenceAllowancesProve = _this.subsistenceAllowancesProve;
			}
			data.bailout = _this.bailout;
			if(_this.bailout == 0){
				if(_this.bailoutExplain == ""){
					Toast('您还未填写政府救助情况！！');
					return false
				}
				data.bailoutExplain = _this.bailoutExplain;
				if(_this.bailoutProve == ""){
					Toast('您还未填写政府救助证明照片！！');
					return false
				}
				data.bailoutProve = _this.bailoutProve;
			}
			if(_this.income == ""){
				Toast('您还未填写患者家庭年收入！！');
				return false
			}
			data.income = _this.income;
			if(_this.financialAssets == ""){
				Toast('您还未填写患者家庭金融资产总价值！！');
				return false
			}
			data.financialAssets = _this.financialAssets;
			data.fundraisingId = _this.$route.query.id;
			console.log(data);
			let formData = new FormData();
			for(let index in data){
				formData.append(index,data[index]);
			}

			_this.$axios({
					method: 'post',
					url: '/yqc/supplement/addCreditMaterial',
					data:formData,
					responseType: 'json'
				})
				.then(function(response) {
					console.log(response);
					if(response.data.ret){
						Toast.success('保存成功');
            _this.$router.go(-3);
					}else{
						Toast.fail(response.data.msg);
					}
				})
				.catch(function(error) {
					Toast.fail('服务器异常！！');
				});
		},

		// 删除预览图
		deleteRead(file,detail){
			this.subsistenceAllowancesProve = '';
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
						_this.subsistenceAllowancesProve = response.data.data;
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
		// 删除预览图
		deleteReadBottom(file,detail){
			this.bailoutProve = '';
			return true
		},
		// 图片上传
		beforeReadBottom(file) {
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
            _this.fileListBottom = ary;
						_this.bailoutProve = response.data.data;
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
.guarantee {
  font-size: 16px;
	&-input {
		font-size: 16px;
		padding: 15px 15px;
	}
	&-title {
		padding: 15px;
		font-size: 20px;
	}
	&-text {
		font-size: 17px;
		padding: 15px 0 0 15px;
		&-small{
			font-size: 14px;
			color: #999;
		}
	}
	&-table {
		display: inline-block;
		font-size: 16px;
		padding: 15px 15px;
	}
	&-tips {
		color: #ff5a5a;
		text-align: center;
		font-size: 13px;
		padding: 20px 0 80px 0;
	}
	&-nav {
		margin: 0 auto;
		padding: 15px;
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
	&-numNav {
		float: right;
		margin-right:15px;
		&-num {
			display: inline-block;
			padding: 0 5px;
      font-size: 16px;
		}
		&-btn {
			display: inline-block;
			width: 19px;
			height: 19px;
			background: #ff5a5a;
			text-align: center;
			line-height: 19px;
			color: #fff;
			border-radius: 50%;
      font-size: 16px;
		}
	}
	&-radio {
		display: inline-block;
		width: 65px;
		height: 32px;
		color: #999999;
		font-size: 14px;
		text-align: center;
		background: #ededed;
		border-radius: 32px;
		line-height: 32px;
		margin: 15px 0 15px 15px;
	}
	&-red {
		color: #ff5a5a;
		background: #ffeeee;
		border: 1px solid #ff5a5a;
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
