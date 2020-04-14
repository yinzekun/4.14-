<template>
	<div class="fundraising" v-if="data != null">
		<consultHeader></consultHeader>
    <tipsCom message="请您不要向任何人支付任何形式的费用，医群筹平台不收取任何费用！筹2000打款2000给求助人，医群筹不收取任何费用！"></tipsCom>
    <shareGuide ref="mychild"></shareGuide>

		<div class="fundraising-title">求助说明</div>
		<div class="fundraising-explain" v-html="data.helpNote.replace(/\n/g,'<br>').replace(/\ /g,'&nbsp;')" :style="{ height: height }"></div>
		<div v-if="moreShow" class="fundraising-more" @click="height = 'auto', moreShow = false">
			<span>展开更多<img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/share/箭头-下.png" alt="" /></span>
		</div>
		<div v-else class="fundraising-more" @click="height = '100px', moreShow = true">
			<span>收起<img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/share/箭头-上.png" alt="" /></span>
		</div>
		<div class="fundraising-division"></div>

		<div class="fundraising-title">我的照片</div>
		<van-row class="fundraising-phone">
      <van-uploader :deletable='false' :max-count="8" preview-size="75px" :accept="'image/*'" :preview-full-image='true' v-model="data.seekHelpImage" :before-read="beforeReadList" />
			<!-- <van-col span="6" v-for="(item, index) in data.seekHelpImage" :key="index">
				<van-image class="fundraising-phone-img" fit="cover" :src="item.url">
					<template v-slot:error>
						加载失败
					</template>
				</van-image>
			</van-col> -->
		</van-row>

		<div class="fundraising-division"></div>

		<div class="fundraising-title">材料证明</div>
		<van-cell-group class="fundraising-material">
			<!-- <van-cell title="大病救助" is-link /> -->
			<van-cell v-if="data.credentialModel.name != null" title="患者姓名">
				<span class="fundraising-material-right">{{ data.credentialModel.name }}</span>
			</van-cell>
			<van-cell v-if="data.credentialModel.payee != null" title="收款人姓名">
				<span class="fundraising-material-right">{{ data.credentialModel.payee }}</span>
			</van-cell>
			<van-cell v-if="data.credentialModel.relation == 1" title="患者与收款人关系"><span class="fundraising-material-right">患者本人</span></van-cell>
			<van-cell v-else-if="data.credentialModel.relation == 2" title="患者与收款人关系"><span class="fundraising-material-right">患者配偶</span></van-cell>
			<van-cell v-else-if="data.credentialModel.relation == 3" title="患者与收款人关系"><span class="fundraising-material-right">直系亲属</span></van-cell>
			<van-cell v-else-if="data.credentialModel.relation == 4" title="患者与收款人关系"><span class="fundraising-material-right">医院账户</span></van-cell>
			<van-cell v-else="data.credentialModel.relation == 5" title="患者与收款人关系"><span class="fundraising-material-right">公益组织</span></van-cell>
			<van-cell v-if="data.credentialModel.disease != null" title="所患疾病名称">
				<span class="fundraising-material-right">{{ data.credentialModel.disease }}</span>
			</van-cell>
			<van-cell title="诊断证明"></van-cell>
			<div>
				<van-image class="fundraising-material-img" fit="cover" :src="data.credentialModel.medicalImage">
					<template v-slot:error>
						加载失败
					</template>
				</van-image>
			</div>
			<van-cell v-if="data.credentialModel.housingSituation == 0" title="是否有房"><span class="fundraising-material-right">有</span></van-cell>
			<van-cell v-else="data.credentialModel.housingSituation == 1" title="是否有房"><span class="fundraising-material-right">无</span></van-cell>

			<van-cell v-if="data.credentialModel.vehicleSituation == 0" title="是否有汽车"><span class="fundraising-material-right">有</span></van-cell>
			<van-cell v-else="data.credentialModel.vehicleSituation == 1" title="是否有汽车"><span class="fundraising-material-right">无</span></van-cell>

			<van-cell v-if="data.credentialModel.subsistenceAllowances == 0" title="是否有低保"><span class="fundraising-material-right">有</span></van-cell>
			<van-cell v-else="data.credentialModel.subsistenceAllowances == 1" title="是否有低保"><span class="fundraising-material-right">无</span></van-cell>

			<van-cell v-if="data.credentialModel.bailout == 0" title="是否由政府救助"><span class="fundraising-material-right">有</span></van-cell>
			<van-cell v-else="data.credentialModel.bailout == 1" title="是否由政府救助"><span class="fundraising-material-right">无</span></van-cell>
		</van-cell-group>

		<div class="fundraising-division"></div>

		<van-collapse v-model="activeNames">
			<van-collapse-item name="1">
				<div slot="title" class="fundraising-guarantee">
					爱心保障
				</div>
				<p class="fundraising-guaranteeText">1.医群筹对每一项大病救助项目提交资料进行审核。</p>
				<p class="fundraising-guaranteeText">2.发起的大病救助项目如果经过举报，被判定为不真实项目，医群筹会将该项目已筹基金退还给对应的爱心人士。</p>
				<p class="fundraising-guaranteeText">3.医群筹坚持公益初心，保障每一份爱心持续传递。</p>
			</van-collapse-item>
		</van-collapse>

		<div class="fundraising-division"></div>
		<div class="fundraising-title">承诺声明</div>
		<div class="fundraising-promise">
			<p class="fundraising-promise-title">1.发起承诺信息</p>
			<p class="fundraising-promise-text">
				项目发起人已承诺，涉及发起个人求助项目的全部图 片、文字等全部信息不存在虚构事实的情况，若有与事 实不符的情况，发起人承诺承担全部的法律责任。
			</p>
			<p class="fundraising-promise-title">2.平台声明</p>
			<p class="fundraising-promise-text">项目信息不属于慈善公开募捐，真实性由信息发布者个 人负责，医群筹提示您了解详情后再进行帮助。</p>
		</div>

		<div class="fundraising-division"></div>

		<van-cell-group>
			<van-row class="fundraising-summary">
				<van-col class="fundraising-summary-title" span="24">实名认证情况属实情况</van-col>
				<van-col class="fundraising-summary-text" span="18">邀请好友帮你实名认证情况属实，陌生的爱心人士看到后会增加帮助你的意愿</van-col>
				<van-col span="6"><span class="fundraising-summary-btn" @click="shareGuideShowFun">立即邀请</span></van-col>
			</van-row>
		</van-cell-group>
		<van-cell-group>
			<van-row class="fundraising-summary">
				<van-col class="fundraising-summary-title" span="24">筹款动态情况</van-col>
				<van-col class="fundraising-summary-text" span="18">
					<div>
						项目发起时间:
						<span class="fundraising-summary-text-red">{{ getLocalTime(data.createTime) }}</span>
					</div>
					<div>
						患者:
						<span class="fundraising-summary-text-red">{{ data.leal_name }}</span>
					</div>
					<div>向为您捐助的社会各界爱心人士告知最新的治疗情况，让大家多多帮你转发筹款</div>
				</van-col>

				<van-col span="6"><span class="fundraising-summary-btn" @click="showDynamic = true">立即发布</span></van-col>
			</van-row>
		</van-cell-group>
		<van-cell-group>
			<van-row class="fundraising-summary">
				<van-col class="fundraising-summary-title" span="24">
					爱心捐助情况
					<span class="fundraising-summary-btnS" @click="showThank = true">一键感谢</span>
				</van-col>
				<van-col span="24">
					<div class="fundraising-summary-btnT">{{ data.forwardNum }}次转发/{{ data.helpNum }}次帮助</div>
				</van-col>
				<van-col class="fundraising-summary-text" span="18">请多多转发获得更多的爱心人士帮助，邀请好友帮忙转发会加快筹款速度，快邀请好友 帮忙转发吧！</van-col>

				<van-col span="6"><span class="fundraising-summary-btn" @click="shareGuideShowFun">现在转发</span></van-col>
			</van-row>
		</van-cell-group>

		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<van-cell-group v-if="thankArray != undefined" v-for="(item, index) in thankArray" :key="index">
				<van-row class="fundraising-help">
					<van-col span="4">
						<van-image v-if="item.is_anonymity == 0" class="fundraising-help-imgIs" fit="cover" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/mine/logo.png">
							<template v-slot:error>
								加载失败
							</template>
						</van-image>
						<van-image v-else class="fundraising-help-img" fit="cover" :src="item.head_url">
							<template v-slot:error>
								加载失败
							</template>
						</van-image>
					</van-col>
					<van-col span="20">
						<div class="fundraising-help-text">
							<span class="fundraising-help-text-org">{{ item.nickname }}</span>
							帮助了
							<span class="fundraising-help-text-red">{{ item.money }}</span>
							元
						</div>
						<p class="fundraising-help-texts">{{ item.leaving_msg }}</p>
						<div class="fundraising-help-reply" v-if="item.thank != '' && item.thank != undefined">
							<span class="fundraising-help-reply-name">{{data.nickname}}：</span>
							<span class="fundraising-help-reply-text">{{ item.thank }}</span>
						</div>

						<div class="fundraising-help-reply" v-if="item.reply.length != 0" v-for="(itemLi, i) in item.reply" :key="i">
							<span class="fundraising-help-reply-name">{{data.nickname}}：</span>
							<span class="fundraising-help-reply-text">{{ itemLi }}</span>
						</div>
						<div class="fundraising-help-textb">
							{{ item.love_value }}爱心值 {{ timeData(item.create_time.time) }}前
							<span @click="(showReply = true), (replyId = item.id)">回复</span>
						</div>
					</van-col>
				</van-row>
			</van-cell-group>
		</van-list>

		<van-row class="fundraising-bottom">
			<van-col span="12" @click="linkWithdraw" class="fundraising-bottom-btn fundraising-bottom-left">管理我的筹款</van-col>
			<van-col span="12" class="fundraising-bottom-btn fundraising-bottom-right" @click="shareGuideShowFun">立即转发</van-col>
		</van-row>

		<!-- 回复 -->
		<van-popup v-model="showReply" round>
			<div class="fundraising-reply">
				<div class="fundraising-reply-radio">
					<van-radio-group v-model="radio">
						<van-cell-group>
							<van-cell v-for="(item, index) in commonlyData" :key="index">
								<van-radio @click="reply = ''" checked-color="#FF5A5A" slot="right-icon" :name="index">{{ item }}</van-radio>
							</van-cell>
						</van-cell-group>
					</van-radio-group>
				</div>

				<van-cell-group class="fundraising-reply-fill">
					<van-field v-model="reply" rows="2" autosize type="textarea" maxlength="30" placeholder="请填写回复内容" show-word-limit @click="radio = null" />
				</van-cell-group>

				<van-row class="fundraising-reply-bottom">
					<van-col span="12"><span class="fundraising-reply-bottom-btn fundraising-reply-bottom-red" @click="replySubmit">确认</span></van-col>
					<van-col span="12"><span class="fundraising-reply-bottom-btn fundraising-reply-bottom-white" @click="showReply = false">取消</span></van-col>
				</van-row>
			</div>
		</van-popup>

		<!-- 感谢 -->
		<van-popup v-model="showThank" round>
			<div class="fundraising-reply">
				<div class="fundraising-reply-radio">
					<van-radio-group v-model="radioThank">
						<van-cell-group>
							<van-cell v-for="(item, index) in leavingMsgData" :key="index">
								<van-radio @click="thank = ''" checked-color="#FF5A5A" slot="right-icon" :name="index">{{ item }}</van-radio>
							</van-cell>
						</van-cell-group>
					</van-radio-group>
				</div>

				<van-cell-group class="fundraising-reply-fill">
					<van-field v-model="thank" rows="2" autosize type="textarea" maxlength="30" placeholder="请填写感谢内容" show-word-limit @click="radioThank = null" />
				</van-cell-group>

				<van-row class="fundraising-reply-bottom">
					<van-col span="12"><span class="fundraising-reply-bottom-btn fundraising-reply-bottom-red" @click="thankSubmit">确认</span></van-col>
					<van-col span="12"><span class="fundraising-reply-bottom-btn fundraising-reply-bottom-white" @click="showThank = false">取消</span></van-col>
				</van-row>
			</div>
		</van-popup>

		<!-- 筹款动态情况 -->

		<van-popup v-model="showDynamic" round>
			<div class="fundraising-dynamic">
				<div class="fundraising-dynamic-title">筹款动态情况</div>
				<van-cell-group class="fundraising-dynamic-fill"><van-field v-model="situation" rows="4" type="textarea" placeholder="请填写最新治疗情况" /></van-cell-group>
				<div class="fundraising-dynamic-title">请上传医疗材料</div>
				<van-uploader class="fundraising-dynamic-nav" v-model="fileList" preview-size="75px" :accept="'image/*'" :preview-full-image='true' :before-delete="deleteRead" :before-read="beforeRead"    :max-count="1" >
					<div class="fundraising-dynamic-nav-fill">
						<img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/上传图片.png" alt="" />
						<div>上传照片</div>
					</div>
				</van-uploader>
				<van-row class="fundraising-dynamic-bottom">
					<van-col span="12"><span class="fundraising-dynamic-bottom-btn fundraising-dynamic-bottom-red" @click="addFundraisingTrends">确认</span></van-col>
					<van-col span="12"><span class="fundraising-dynamic-bottom-btn fundraising-dynamic-bottom-white" @click="showDynamic = false">取消</span></van-col>
				</van-row>
			</div>
		</van-popup>
	</div>
</template>

<script>
import { Row, Col, Cell, CellGroup, Image, Collapse, CollapseItem, Popup, Icon, RadioGroup, Radio, Field, uploader, Toast, List } from 'vant';
import tipsCom from './../../components/tipsCom.vue';
import consultHeader from './../../components/consultHeader.vue';
import shareGuide from './../../components/shareGuide.vue';
export default {
	name: 'fundraising',
	data() {
		return {
			data: null,
			activeNames: ['1'],
			showReply: false,
			result: [],
			message: '',
			reply: '',
			showDynamic: false,
			fileList: [],
			radio: null,
			commonlyData: [],
			height: '100px',
			moreShow: true,
			thankArray: [],
			replyId: 0,
			leavingMsgData: [],
			showThank: false,
			radioThank: null,
			thank: '',
			loading: false,
			finished: false,
			numData: 0,
			medicalImg:'', //筹款动态图片
			situation:'', //筹款动态内容
      seekHelpImage:[]
		};
	},
	components: {
    tipsCom,
    consultHeader,
    shareGuide,
		[Row.name]: Row,
		[Col.name]: Col,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		[Image.name]: Image,
		[Collapse.name]: Collapse,
		[CollapseItem.name]: CollapseItem,
		[Popup.name]: Popup,
		[Icon.name]: Icon,
		[RadioGroup.name]: RadioGroup,
		[Radio.name]: Radio,
		[Field.name]: Field,
		[uploader.name]: uploader,
		[Toast.name]: Toast,
		[List.name]: List
	},
	mounted() {
    this.$wx.hideOptionMenu();
		this.oneKeyThanks();
		this.getMyFundraising();
	},
	methods: {
    // 图片上传
    beforeReadList(file) {
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
    			if(response.data.ret){
    				let newData = new Object();
    				newData.url = response.data.data;
            console.log(newData)
    				_this.seekHelpImage.push(newData);
            _this.data.seekHelpImage = _this.seekHelpImage;
            console.log(_this.seekHelpImage)
            let date = new FormData();
            date.append('fundraisingId',_this.$route.query.id);
            date.append('seekHelpImage',JSON.stringify(_this.seekHelpImage));
            _this.$axios({
            		method: 'post',
            		url: '/yqc/fundraising/updateSeekHelpImage',
            		data:date,
            		responseType: 'json'
            	})
            	.then(function(response) {
            		console.log(response);
            		if(response.data.ret){
            			// _this.medicalImg = response.data.data;
            			toastUpload.clear();
            			Toast.success('上传成功');
            		}else{
            			toastUpload.clear();
            			Toast.success(response.data.msg);
            		}
            	})
            	.catch(function(error) {
            		toastUpload.clear();
            		Toast.success('上传失败');
            	});
    			}else{
            toastUpload.clear();
            Toast.fail('上传失败');
          }
    		})
    		.catch(function(error) {
    			console.log(error);
          toastUpload.clear();
          Toast.fail('上传失败');
    		});
    		return true
    },
    shareGuideShowFun(){
      this.$refs.mychild.shareGuideShowFun();
    },
		addFundraisingTrends(){
			// 筹款动态发布
			let _this = this,data = new FormData();
			if(_this.situation == ''){
				Toast('您还未填写最新治疗情况！！');
				return false
			}
			data.append('fundraisingId',_this.$route.query.id);
			data.append('situation',_this.situation);
			data.append('medicalImg',_this.medicalImg);
			_this.$axios({
					method: 'post',
					url: '/yqc/fundraising/addFundraisingTrends',
					data:data,
					responseType: 'json'
				})
				.then(function(response) {
					console.log(response);
					if(response.data.ret){
						// _this.medicalImg = response.data.data;
						Toast.success('发布成功');
						_this.showDynamic = false;
					}else{
						Toast.fail('发布失败');
					}
				})
				.catch(function(error) {
					Toast.fail('发布失败！！');
				});

		},
		// 删除预览图
		deleteRead(file,detail){
			this.medicalImg = '';
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
						_this.medicalImg = response.data.data;
            toastUpload.clear();
						Toast.success('上传成功');
					}else{
            toastUpload.clear();
						Toast.fail('上传失败');
					}
				})
				.catch(function(error) {
          toastUpload.clear();
					Toast.fail('上传失败！！');
				});
				return true
		},
		getLocalTime(timestamp) {
			let date = new Date(timestamp);
			let Y = date.getFullYear() + '-';
			let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
			let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
			let strDate = Y + M + D + h + m + s;
			return strDate;
		},
		// 一键感谢
		thankSubmit() {
			let _this = this,
				content = '';
			if (_this.radioThank == null && _this.thank == '') {
				Toast('请选择快捷感谢或填写感谢内容！！');
				return false;
			}
			if (_this.radioThank != null) {
				content = _this.leavingMsgData[_this.radioThank];
			} else {
				content = _this.thank;
			}
			_this
				.$axios({
					method: 'post',
					url: '/yqc/donation/oneKeyThanks?fundraisingId=' + _this.$route.query.id + '&content=' + content,
					responseType: 'json'
				})
				.then(function(response) {
					console.log(response);
					if (response.data.ret) {
						Toast.success('感谢成功');
						_this.showThank = false;
						_this.onLoad(0);
					} else {
						_this.showThank = false;
						Toast.fail(response.data.msg);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		// 回复
		replySubmit() {
			let _this = this,
				content = '';
			if (_this.radio == null && _this.reply == '') {
				Toast('请选择快捷回复或填写回复内容！！');
				return false;
			}
			if (_this.radio != null) {
				content = _this.commonlyData[_this.radio];
			} else {
				content = _this.reply;
			}

			_this
				.$axios({
					method: 'post',
					url: '/yqc/donation/replyMessage?donationId=' + _this.replyId + '&content=' + content,
					responseType: 'json'
				})
				.then(function(response) {
					console.log(response);
					if (response.data.ret) {
						Toast.success('回复成功');
						_this.showReply = false;
						_this.onLoad(0);
					} else {
						Toast.fail(response.data.msg);
					}
				})
				.catch(function(error) {
					console.log(error);
				});

			console.log(content);
		},
		onLoad(num) {
			// 异步更新数据
			let _this = this;
			if (num == 0) {
				_this.numData = 0;
				_this.thankArray = [];
				_this.finished = false;
			}
			setTimeout(() => {
				_this.$axios({
						method: 'post',
						url: '/yqc/fundraising/getMoreDonation?fundraisingId=' + _this.$route.query.id + '&pageSize=25&pageNum=' + _this.numData,
						responseType: 'json'
					})
					.then(function(response) {
						if (response.data.ret) {
							_this.numData += 1;
							for (let i = 0; i < response.data.data.list.length; i++) {
                if (_this.thankArray.length >= response.data.data.size) {
                  _this.loading = false;
                	_this.finished = true;
                }else{
                  _this.thankArray.push(response.data.data.list[i]);
                }
							}
							// 加载状态结束
							console.log(_this.thankArray);
							_this.loading = false;

							// 数据全部加载完成
							if (_this.thankArray.length >= response.data.data.size) {
								_this.finished = true;
							}
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			}, 500);
		},
		timeData(time) {
			let cha = Math.ceil((new Date().getTime() - time) / 60000);
			if (parseInt(cha / (60 * 24)) > 0) {
				return parseInt(cha / (60 * 24)) + '天';
			} else {
				if (parseInt((cha % (24 * 60)) / 60) > 0) {
					return parseInt((cha % (24 * 60)) / 60) + '小时';
				} else {
					return ((cha % (24 * 60)) % 60) + '分钟';
				}
			}
		},
		linkWithdraw() {
			//  /fundraising/withdraw
			let _this = this;
			_this.$router.push({
				path: '/fundraising/withdraw',
				query: {
					id: _this.$route.query.id,
					userId: _this.$route.query.userId
				}
			});
		},
		// 获取我的筹款信息
		getMyFundraising() {
			let _this = this;
			const toast = Toast.loading({
				forbidClick: false
			});
			_this
				.$axios({
					method: 'post',
					url: '/yqc/fundraising/getMyFundraising?fundraisingId=' + _this.$route.query.id,
					responseType: 'json'
				})
				.then(function(response) {
					console.log(response);
					if (response.data.ret) {
						let data = response.data.data;
            console.log(response.data.data.seekHelpImage)
						data.seekHelpImage = JSON.parse(response.data.data.seekHelpImage);
            _this.seekHelpImage = data.seekHelpImage;
						_this.data = data;
            if(_this.$route.query.code != 10.88667){
              if(data.userId != JSON.parse(sessionStorage.getItem('yqcUserData')).id){
                _this.$router.replace({
                  path: '/share',
                  query: {
                    id: _this.$route.query.id
                  }
                })
              }
            }
						console.log(data);
						_this.wxShareFun(window.location.href,data.fundraisingTitle,data.helpNote,data.seekHelpImage[data.seekHelpImage.length-1].url,_this.$route.query.id);
						_this.$wx.showOptionMenu();
            toast.clear();
					} else {
						Toast.fail(response.data.msg);
					}
				})
				.catch(function(error) {
					Toast.fail('筹款不存在！！');
					console.log(error);
				});
		},
		// 获取常用留言信息
		oneKeyThanks() {
			let _this = this;
			_this
				.$axios({
					method: 'post',
					url: '/yqc/donation/getThankConfig',
					responseType: 'json'
				})
				.then(function(response) {
					if (response.data.ret) {
						// reply回复  leavingMsg留言
						_this.commonlyData = response.data.data.reply;
						_this.leavingMsgData = response.data.data.reply;
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	}
};
</script>

<style scoped lang="less">
.fundraising {
  font-size: 16px;
  padding: 60px 0;
	&-more {
		// width: 375px;
    padding: 10px 0;
		height: auto;
    clear: both;
		text-align: center;
		span {
			font-size: 14px;
			color: #ff5a5a;
			display: inline-block;
			margin: 0 auto;
      img {
      	display: inline-block;
      	width: 10px;
      	height: 6px;
      	margin-left: 5px;
      }
		}
	}
	&-dynamic {
		width: 290px;
		height: 350px;
		background: #fff;
		border-radius: 5px;
		overflow: hidden;
		padding: 15px 15px;
		font-size: 14px;
		position: relative;
		&-nav {
			margin: 0 auto;
			padding-top: 15px;
			&-title {
				margin-bottom: 15px;
			}
			&-fill {
				width: 75px;
				background: #f7f7f7;
				height: 75px;
				padding: 0.1px;
				margin-bottom: 10px;
				img {
					display: block;
					width: 24px;
					height: 24px;
					margin: 13px auto 10px;
				}
				div {
					text-align: center;
					color: #666666;
					font-size: 10px;
				}
			}
		}
		&-fill {
			background: #f7f7f7;
			margin: 15px 0;
			border-radius: 5px;
		}
		&-title {
			font-size: 16px;
		}
		&-bottom {
			width: 290px;
			position: absolute;
			bottom: 15px;
			&-btn {
				display: block;
				width: 100px;
				height: 37px;
				text-align: center;
				margin: 0 auto;
				line-height: 37px;
				border: 1px solid #ff5a5a;
				border-radius: 37px;
				overflow: hidden;
				font-size: 16px;
			}
			&-red {
				background: #ff5a5a;
				color: #fff;
			}
			&-white {
				background: #fff;
				color: #ff5a5a;
			}
		}
	}
	&-reply {
		width: 320px;
		height: 400px;
		background: #fff;
		border-radius: 5px;
		overflow: hidden;
		padding: 15px 0;
		font-size: 14px;
		position: relative;
		&-radio {
			height: 240px;
			overflow-x: hidden;
			overflow-y: scroll;
		}
		&-fill {
			width: 290px;
			margin: 10px auto;
			background: #f7f7f7;
		}
		&-bottom {
			width: 320px;
			position: absolute;
			bottom: 15px;
			&-btn {
				display: block;
				width: 100px;
				height: 37px;
				text-align: center;
				margin: 0 auto;
				line-height: 37px;
				border: 1px solid #ff5a5a;
				border-radius: 37px;
				overflow: hidden;
				font-size: 16px;
			}
			&-red {
				background: #ff5a5a;
				color: #fff;
			}
			&-white {
				background: #fff;
				color: #ff5a5a;
			}
		}
	}
	&-bottom {
		position: fixed;
		width: 375px;
		bottom: 0;
		height: 50px;
		background: #fff;
		z-index: 1000;
    box-shadow:0px -1px 12px 1px rgba(34,23,20,0.22);
		&-btn {
			text-align: center;
			line-height: 50px;
			font-size: 18px;
		}
		&-left {
			background: #ff5a5a;
			color: #fff;
		}
		&-right {
			background: #fff;
			color: #ff5a5a;
		}
	}
	&-help {
		padding: 15px;
		&-img {
			width: 50px;
			height: 50px;
			border-radius: 5px;
			overflow: hidden;
			vertical-align: top;
			margin-top: 12px;
		}
		&-imgIs {
			border-radius: 5px;
			overflow: hidden;
			vertical-align: top;
			margin-top: 12px;
		}
		&-text {
			font-size: 14px;
			margin-left: 5px;
			&-org {
				color: #fe672e;
			}
			&-red {
				display: inline-block;
				color: #ff5a5a;
			}
		}
		&-texts {
			margin-left: 5px;
			font-size: 13px;
			margin-block-start: 0.5em;
			margin-block-end: 0.5em;
		}
		&-textb {
			margin-left: 5px;
			font-size: 13px;
			color: #999999;
			span {
				float: right;
				font-size: 15px;
			}
		}
		&-reply {
			background: #f7f7f7;
			padding: 15px 45px 15px 15px;
			font-size: 13px;
			margin-bottom: 10px;
			line-height: 20px;
			&-name {
				color: #ff5a5a;
			}
		}
	}
	&-summary {
		padding: 15px;
		&-title {
			font-size: 16px;
		}
		&-text {
			font-size: 13px;
			color: #666;
			&-red {
				color: #ff5a5a;
			}
		}
		&-btn {
			display: block;
			width: 85px;
			text-align: center;
			font-size: 15px;
			color: #fff;
			height: 31px;
			line-height: 31px;
			border-radius: 31px;
			background: #ff5a5a;
		}
		&-btnT {
			display: block;
			width: 100%;
			text-align: center;
			font-size: 16px;
			color: #ff5a5a;
			height: 50px;
			line-height: 50px;
			border-radius: 5px;
			background: #f7f7f7;
			margin: 10px 0;
		}
		&-btnS {
			display: inline-block;
			width: 60px;
			text-align: center;
			font-size: 12px;
			color: #fff;
			height: 22px;
			line-height: 22px;
			border-radius: 5px;
			background: #ff5a5a;
			margin-left: 15px;
		}
	}
	&-promise {
		padding: 0 15px;
		&-title {
			font-size: 15px;
			margin-block-start: 0;
			margin-block-end: 0;
		}
		&-text {
			font-size: 14px;
			margin-block-start: 0.5em;
			text-align: justify;
		}
	}
	&-guarantee {
		font-size: 20px;
		font-weight: 800;
	}
	&-guaranteeText {
		font-size: 14px;
		color: #666666;
		margin-block-start: 0;
	}
	&-material {
		font-size: 16px;
		&-right {
			color: #000;
		}
		&-img {
			width: 125px;
			height: 125px;
			border-radius: 5px;
			overflow: hidden;
			margin-left: 15px;
		}
	}
	&-phone {
		padding: 15px;
		&-img {
			width: 80px;
			height: 80px;
			border-radius: 5px;
			overflow: hidden;
		}
	}
	&-division {
		height: 10px;
		background: #f7f7f7;
	}
	&-explain {
		padding: 0 15px 15px 15px;
		font-size: 14px;
		line-height: 23px;
		overflow: hidden;
		text-align: justify;
		min-height: 100px;
	}
	&-title {
		font-size: 20px;
		font-weight: 800;
		padding: 15px;
	}
}
</style>
<style>
.fundraising .van-cell {
	background: rgba(0, 0, 0, 0);
}
.fundraising .van-popup--center.van-popup--round {
	border-radius: 5px;
}
</style>
