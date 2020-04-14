<template>
	<div id="publicgood" style="padding-bottom: 60px;">
    <van-cell-group>
      <van-cell class="vanCell"><van-field input-align="right" label="组织名称" v-model="organizationName" placeholder="请输入组织名称" /></van-cell>
      <van-cell class="vanCell"><van-field input-align="right" label="组织电话" v-model="organizationPhone" placeholder="请输入组织电话" /></van-cell>
      <van-cell class="vanCell"><van-field input-align="right" label="开户银行" v-model="bankName" placeholder="请输入开户银行" /></van-cell>
      <van-cell v-model="bankRegion" title="开户支行" @click="show = true"></van-cell>
      <van-popup v-model="show" position="bottom">
      	<van-area ref="area" value="110000" :area-list="areaList" @change="onChange" @confirm="show = false" @cancel="show = false" />
      </van-popup>
      <van-cell class="vanCell"><van-field input-align="right" label="支行名称" v-model="bankSubName" placeholder="请输入支行名称" /></van-cell>
      <van-cell class="vanCell"><van-field input-align="right" label="银行卡号" v-model="bankNo" placeholder="请输入银行卡号" /></van-cell>
    </van-cell-group>


    <van-row class="publicgood-nav">
    	<van-col span="24" class="publicgood-nav-title">
    		照片上传
    	</van-col>
    	<van-col span="12">
    		<van-uploader class="publicgood-fill"
    			v-model="fileList1"
    			:accept="'image/*'"
    			:preview-full-image='true'
    			:before-delete="deleteReadOne"
    			:before-read="beforeReadOne"
    			:max-count="1" >
    		  <div class="publicgood-nav-fill">
    			  <img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/上传图片.png" alt="">
    			  <div>银行卡照片</div>
    		  </div>
    		</van-uploader>
    	</van-col>

    </van-row>

		<div class="publicgood-button-bottom" @click="submitFun()">保存</div>
	</div>
</template>

<script>
import { Row, Col, Field, Cell, CellGroup, Area, Popup, Toast, Uploader } from 'vant';
import AreaList from './area';
export default {
	name: 'publicgood',
	data() {
		return {
			organizationName:'',
			organizationPhone:'',
			bankName:'',
			bankRegion:'北京市 北京市 东城区',
			bankSubName:'',
			bankNo:'',
			show:false,
			areaList:AreaList,
      fileList1:[],
      cardImg:''
		};
	},
	components: {
		[Row.name]: Row,
		[Col.name]: Col,
		[Field.name]: Field,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		[Area.name]: Area,
    [Uploader.name]: Uploader,
		[Popup.name]: Popup,
		[Toast.name]: Toast,
	},
	mounted() {
		this.$wx.hideOptionMenu();
	},
	methods: {
    beforeReadOne(file) {
    	let toastUpload = Toast.loading({
    		message: '上传中...',
    		forbidClick: false,
    	  duration:0
    	});
      let _this = this,data = new FormData();
      data.append('image', file);
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
            _this.fileList1 = ary;
            _this.cardImg = response.data.data;
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
    	return true;
    },
    deleteReadOne(file, detail) {
    	this.cardImg = '';
    	return true;
    },
		submitFun(){
			let _this = this,formData = new FormData();
			if(_this.organizationName == ''){
				Toast("您还未填写组织名称！");
				return false
			}
			formData.append('organizationName',_this.organizationName);

			if(_this.organizationPhone == ''){
				Toast("您还未填写组织电话！");
				return false
			}
			formData.append('organizationPhone',_this.organizationPhone);

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

      if(_this.cardImg == ''){
        Toast("您还未上传银行卡照片！");
        return false
      }
      formData.append('cardImg',_this.cardImg);

			formData.append('fundraisingId',_this.$route.query.id);
			formData.append('relation',5);
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
.publicgood{
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
  #publicgood .vanCell{
    padding: 0;
  }
  #publicgood .van-cell:not(:last-child):after{
    left: 0;
  }
</style>
