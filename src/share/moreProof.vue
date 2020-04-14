<template>
	<div style="padding-top: 60px;">
		<van-cell-group class="moreProof-header">
			<van-row>
				<van-col span="12"><img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/launch/logo.png" alt="" /></van-col>
				<van-col span="12"><div class="moreProof-header-btn" @click="linkLaunch">我也要筹款</div></van-col>
			</van-row>
		</van-cell-group>
		<div class="moreProof-hide">
			<van-image v-if="headUrl != ''" round width="50px" height="50px" :src="headUrl" />
			<span>{{nickname}}</span>
		</div>
		<van-row class="moreProof-title">
			<van-col span="16">
				<div>
					全部证明（
					<span class="moreProof-title-num">{{size}}</span>
					）人
				</div>
			</van-col>
			<van-col span="8"><span class="moreProof-title-btn" @click="linkProve">我也来证明</span></van-col>
		</van-row>

		<div class="moreProof-clear"></div>
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<van-cell-group class="moreProof-prove-people-list" v-for="(item,index) in proveArray" :key="index">
				<van-row class='moreProof-prove-people-list-li'>
					<van-col class='moreProof-prove-people-list-li-img' span="5"><van-image round width="60px" height="60px" :src="item.head_url" /></van-col>
					<van-col span="19">
						<div>
							<span class="moreProof-prove-people-list-li-name">{{item.nickname}}</span>
							<b class="moreProof-prove-people-list-li-icon">{{item.relation}}</b>
							<span class="moreProof-prove-people-list-li-time">{{getLocalTime(item.create_time.time)}}</span>
						</div>
						<div class="moreProof-prove-people-list-li-cont">{{item.content}}</div>
					</van-col>
				</van-row>
			</van-cell-group>
		</van-list>
	</div>
</template>

<script>
import { Row, Col, Cell, CellGroup, Image, List } from 'vant';
export default {
	name: 'moreProof',
	data() {
		return {
			proveArray: [],
			loading: false,
			finished: false,
			numData:0,
			size:0,
			userAdopt:false,
			currentUserId:80,
      headUrl:'',
      nickname:''
		};
	},
	components: {
		[Row.name]: Row,
		[Col.name]: Col,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		[Image.name]: Image,
		[List.name]: List
	},
	mounted() {
		this.$wx.hideOptionMenu();
		this.userAdopt = this.$route.query.userAdopt;
    this.headUrl = this.$route.query.headUrl;
    this.nickname = this.$route.query.nickname;
	},
	methods: {
		linkLaunch(){
			this.$router.push({
				path: '/launch'
			});
		},
		linkProve(){
			let _this = this;
			if(_this.userAdopt){
				_this.$router.push({
					path: '/share/proveTwo',
					query: {
						id: _this.$route.query.id,
						currentUserId:_this.$route.query.currentUserId,
						patientName:_this.$route.query.patientName,
						userId: _this.$route.query.userId,
						several:1
					}
				});
			}else{
				_this.$router.push({
					path: '/share/proveOne',
					query: {
						id: _this.$route.query.id,
						userId: _this.$route.query.userId,
						currentUserId:_this.$route.query.currentUserId,
						patientName:_this.$route.query.patientName,
						source:1,
						several:2
					}
				});
			}
		},
		getLocalTime(timestamp) {
			let date = new Date(timestamp);
			let Y = date.getFullYear() + '-';
			let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
			let strDate = Y + M + D ;
			return strDate;
		},
		onLoad(num) {
			// 异步更新数据
			let _this = this;
			setTimeout(() => {
				_this
					.$axios({
						method: 'post',
						url: '/yqc/user/getMoreProve?fundraisingId=' + _this.$route.query.id + '&pageSize=10&pageNum=' + _this.numData,
						responseType: 'json'
					})
					.then(function(response) {
						console.log(response)
						if (response.data.ret) {
							_this.numData += 1;
							_this.size = response.data.data.size;
							for (let i = 0; i < response.data.data.list.length; i++) {
								_this.proveArray.push(response.data.data.list[i]);
							}
							// 加载状态结束
							console.log(_this.proveArray);
							_this.loading = false;

							// 数据全部加载完成
							if (_this.proveArray.length >= response.data.data.size) {
								_this.finished = true;
							}
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			}, 500);
		}
	}
};
</script>

<style scoped lang="less">
.moreProof {
  font-size: 16px;
	&-title {
		padding: 0 15px 15px 15px;
		font-size: 20px;
		font-weight: 800;
		&-num {
			color: #ff5a5a;
			font-weight: 800;
		}
		&-btn {
			background: #ff5a5a;
			font-size: 14px;
			color: #fff;
			float: right;
			border-radius: 5px;
			padding: 5px 5px;
			display: block;
			font-weight: 400;
		}
	}
	&-hide {
		padding: 15px;
		span {
			display: inline-block;
			vertical-align: top;
			margin: 15px 0 0 5px;
			font-size: 18px;
		}
	}
	&-header {
		padding: 15px;
		position: fixed;
		top: 0;
		width: 100vw;
		background: #fff;
		z-index: 1000;
		box-sizing: border-box;
		img {
			width: 105px;
			height: 30px;
		}
		&-btn {
			float: right;
			width: 100px;
			height: 35px;
			border-radius: 35px;
			text-align: center;
			line-height: 35px;
			background: #ff5a5a;
			color: #fff;
			font-size: 14px;
		}
	}
	&-clear {
		height: 10px;
		background: #f7f7f7;
	}
	&-prove {
		&-people {
			padding: 0 15px;
			font-size: 17px;
			&-red {
				color: #ff5a5a;
			}
			&-btn {
				width: 70px;
				height: 22px;
				text-align: center;
				line-height: 22px;
				font-size: 12px;
				background: #ff5a5a;
				color: #fff;
				border-radius: 5px;
				float: right;
			}
			&-list {
				padding: 15px;
				&-li{
					clear: both;
          &-img{
            vertical-align: middle;
            margin-top: 5px;
          }
					&-name {
						font-size: 15px;
						color: #666666;
            display: inline-block;
            vertical-align: middle;
            max-width: 120px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
					}
					&-icon {
						font-size: 12px;
						display: inline-block;
						padding: 1px 7.5px;
						background: #ff5a5a;
						color: #fff;
						font-weight: 400;
						border-radius: 5px;
						margin-left: 5px;
            vertical-align: middle;
					}
					&-cont {
						font-size: 16px;
            margin-top: 5px;
					}
					&-time {
						float: right;
						color: #666666;
						font-size: 12px;
            margin-top: 15px;
            vertical-align: middle;
					}
				}
			}
		}
	}
}
</style>
