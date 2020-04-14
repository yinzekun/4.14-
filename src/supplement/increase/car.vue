<template>
	<div>
		<van-cell-group>
		  <div class="car-title">患者家庭车辆财产状况</div>
		  <div class="car-text">是否有汽车</div>
		  <span class="car-radio" @click="radio=0" :class="radio == 0 ? 'car-red':''">有</span>
		  <span class="car-radio" @click="radio=1" :class="radio == 1 ? 'car-red':''">没有</span>
		</van-cell-group>
		<van-cell-group v-if="radio == 0">
		  <span class="car-table">汽车数量</span>
		  <div class="car-numNav">
			  <span class="car-numNav-btn" @click="reduce(1)">-</span>
			  <span class="car-numNav-num">{{num}}</span>
			  <span class="car-numNav-btn" @click="plus(1)">+</span>
		  </div>
		</van-cell-group>
		<van-cell-group v-if="radio == 0">
		  <van-field class="car-input" input-align="right" label="汽车总价值" @input="vehicleValue = vehicleValue.replace(/[^\d]/g,'')" v-model="vehicleValue" placeholder="请输入汽车总价值" />
		</van-cell-group>

		<van-cell-group v-if="radio == 0">
		  <div class="car-text">汽车状态</div>
		  <span class="car-radio" @click="sellRadio = 1" :class="sellRadio == 1 ? 'car-red':''">已变卖</span>
		  <span class="car-radio" @click="sellRadio = 2" :class="sellRadio == 2 ? 'car-red':''">变卖中</span>
		  <span class="car-radio" @click="sellRadio = 3" :class="sellRadio == 3 ? 'car-red':''">未变卖</span>
		</van-cell-group>
		<van-cell-group v-if="radio == 0&&sellRadio != 3">
		  <span class="car-table">变卖数量</span>
		  <div class="car-numNav">
			  <span class="car-numNav-btn" @click="reduce(2)">-</span>
			  <span class="car-numNav-num">{{sellNum}}</span>
			  <span class="car-numNav-btn" @click="plus(2)">+</span>
		  </div>
		</van-cell-group>
		<van-cell-group v-if="radio == 0&&sellRadio != 3">
		  <van-field class="car-input" input-align="right" label="变卖价值" @input="vehicleSaleValue = vehicleSaleValue.replace(/[^\d]/g,'')" v-model="vehicleSaleValue" placeholder="变卖价值" />
		</van-cell-group>

		<div class="car-tips">可稍后去我的筹款-补充材料中补充完整</div>
		<div class="car-button-bottom" @click="nextStep()">下一步</div>
	</div>
</template>

<script>
import { Row, Col, Cell, CellGroup, Field } from 'vant';
export default {
	name: 'car',
	data() {
		return {
			num:1,
			sellNum:1,
			radio:0,
			sellRadio:1,
			vehicleValue:"",
			vehicleSaleValue:'',
			increaseData:{},
		};
	},
	components: {
		[Row.name]: Row,
		[Col.name]: Col,
		[Cell.name]: Cell,
		[CellGroup.name]: CellGroup,
		[Field.name]: Field,
	},
	mounted() {
		this.$wx.hideOptionMenu();
		this.increaseData = JSON.parse(localStorage.getItem("increaseData"));
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
			let _this = this,carData = _this.increaseData;
			if(_this.radio == 1){
				// 没有
				carData.vehicleSituation = 1;
			}else{
				// 有
				console.log("...........")
				carData.vehicleSituation = 0;
				carData.vehicleNum = _this.num;
				if(_this.vehicleValue == ''){
					Toast('您还未填写汽车总价值！！');
					return false
				}
				carData.vehicleValue = _this.vehicleValue;

				if(_this.sellRadio == 3){
					carData.vehicleStatus = _this.sellRadio;
				}else{
					carData.vehicleStatus = _this.sellRadio;
					carData.vehicleSaleNum = _this.sellNum;
					if(_this.vehicleSaleValue == ''){
						Toast('您还未填写变卖价值！！');
						return false
					}
					carData.vehicleSaleValue = _this.vehicleSaleValue;
				}
			}
      localStorage.setItem('increaseData',JSON.stringify(carData));
			_this.$router.push({
				path:'/supplement/increase/guarantee',
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
.car{
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
      font-size: 16px;
			border-radius: 50%;
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
