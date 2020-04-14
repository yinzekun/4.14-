<template>
	<div>
		<van-cell-group>
		  <div class="room-title">患者家庭房屋财产状况</div>
		  <div class="room-text">是否有房产</div>
		  <span class="room-radio" @click="radio=0" :class="radio == 0 ? 'room-red':''">有</span>
		  <span class="room-radio" @click="radio=1" :class="radio == 1 ? 'room-red':''">没有</span>
		</van-cell-group>
		<van-cell-group v-if="radio == 0">
		  <span class="room-table">患者家庭房屋财产状况</span>
		  <div class="room-numNav">
			  <span class="room-numNav-btn" @click="reduce(1)">-</span>
			  <span class="room-numNav-num">{{num}}</span>
			  <span class="room-numNav-btn" @click="plus(1)">+</span>
		  </div>
		</van-cell-group>
		<van-cell-group v-if="radio == 0">
		  <van-field class="room-input" input-align="right" label="房产总价值" @input="houseValue = houseValue.replace(/[^\d]/g,'')" v-model="houseValue" placeholder="请输入房产总价值" />
		</van-cell-group>

		<van-cell-group v-if="radio == 0">
		  <div class="room-text">房产状态</div>
		  <span class="room-radio" @click="sellRadio = 1" :class="sellRadio == 1 ? 'room-red':''">已变卖</span>
		  <span class="room-radio" @click="sellRadio = 2" :class="sellRadio == 2 ? 'room-red':''">变卖中</span>
		  <span class="room-radio" @click="sellRadio = 3" :class="sellRadio == 3 ? 'room-red':''">未变卖</span>
		</van-cell-group>
		<van-cell-group v-if="radio == 0&&sellRadio != 3">
		  <span class="room-table">变卖数量</span>
		  <div class="room-numNav">
			  <span class="room-numNav-btn" @click="reduce(2)">-</span>
			  <span class="room-numNav-num">{{sellNum}}</span>
			  <span class="room-numNav-btn" @click="plus(2)">+</span>
		  </div>
		</van-cell-group>
		<van-cell-group v-if="radio == 0&&sellRadio != 3">
		  <van-field class="room-input" input-align="right" label="变卖价值" @input="houseSaleValue = houseSaleValue.replace(/[^\d]/g,'')" v-model="houseSaleValue" placeholder="变卖价值" />
		</van-cell-group>

		<div class="room-tips">可稍后去我的筹款-补充材料中补充完整</div>
		<div class="room-button-bottom" @click="nextStep()">下一步</div>
	</div>
</template>

<script>
import { Row, Col, Cell, CellGroup, Field, Toast } from 'vant';
export default {
	name: 'room',
	data() {
		return {
			num:1,
			sellNum:1,
			radio:0,
			sellRadio:1,
			houseValue:'',
			houseSaleValue:""
		};
	},
	components: {
		[Row.name]: Row,
		[Col.name]: Col,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		[Field.name]: Field,
		[Toast.name]: Toast,
	},
	mounted() {
		this.$wx.hideOptionMenu();
	},
	methods: {
		// 减
		reduce(num){
			let _this = this;
			if(num == 1 && _this.num > 1){
				_this.num -= 1;
			}else if(num == 2 && _this.sellNum > 1){
				_this.sellNum -= 1;
			}
		},
		// 加
		plus(num){
			let _this = this;
			if(num == 1){
				_this.num += 1;
			}else if( _this.sellNum < _this.num){
				 _this.sellNum +=1;
			}
		},
		nextStep(){
			// 判断有没有房产
			let _this = this,roomData = new Object();
			if(_this.radio == 1){
				// 没有
				roomData.housingSituation = 1;
			}else{
				// 有
				roomData.housingSituation = 0;
				roomData.houseNum = _this.num;
				if(_this.houseValue == ''){
					Toast('您还未填写房产总价值！！');
					return false
				}
				roomData.houseValue = _this.houseValue;

				if(_this.sellRadio == 3){
					roomData.houseStatus = _this.sellRadio;
				}else{
					roomData.houseStatus = _this.sellRadio;
					roomData.houseSaleNum = _this.sellNum;
					if(_this.houseSaleValue == ''){
						Toast('您还未填写变卖价值！！');
						return false
					}
					roomData.houseSaleValue = _this.houseSaleValue;
				}
			}
      localStorage.setItem('increaseData',JSON.stringify(roomData));
			_this.$router.push({
				path:'/supplement/increase/car',
				query:{
					id: _this.$route.query.id,
					userId:_this.$route.query.userId
				},
				replace:true
			})
		}
	}
};
</script>

<style scoped lang="less">
.room{
  font-size: 16px;
	&-input{
		font-size: 16px;
		padding: 15px 15px;
	}
	&-title{
		padding: 15px;
		font-size: 20px;
	}
	&-text{
		font-size: 17px;
		padding: 5px 15px;
	}
	&-table{
		display: inline-block;
		font-size: 16px;
		padding: 15px 15px;
	}
	&-tips{
		color: #FF5A5A;
		text-align: center;
		font-size: 13px;
		padding: 20px 0 60px 0;
	}
	&-numNav{
		float: right;
		margin-right:15px;
		&-num{
			display: inline-block;
			padding: 0 5px;
      font-size: 16px;
		}
		&-btn{
			display: inline-block;
			width: 19px;
			height: 19px;
			background: #FF5A5A;
			text-align: center;
			line-height: 19px;
			color: #fff;
			border-radius: 50%;
      font-size: 16px;
		}
	}
	&-radio{
		display: inline-block;
		width: 65px;
		height: 32px;
		color: #999999;
		font-size: 14px;
		text-align: center;
		background: #EDEDED;
		border-radius: 32px;
		line-height: 32px;
		margin: 15px 0 15px 15px;
	}
	&-red{
		color: #FF5A5A;
		background: #FFEEEE;
		border: 1px solid #FF5A5A;
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
}
</style>
