<template>
	<div class="tipsCom">
    <van-row class="tipsCom-remind">
    			<van-col span="2"><img class="tipsCom-remind-icon" src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/launch/感叹(1).png" alt="" /></van-col>
    			<van-col span="22">
    				<span class="tipsCom-remind-text">{{message}}</span>
    			</van-col>
    		</van-row>
	</div>
</template>

<script>
import { Row, Col } from 'vant';
export default {
	name: 'tipsCom',
	data() {
		return {
    };
	},
  props:['message'],
	components: {
		[Row.name]: Row,
		[Col.name]: Col,
	},
	mounted() {},
	methods: {
  }
};
</script>

<style scoped lang="less">
  .tipsCom{
    &-remind {
    		background: #fff3de;
    		line-height: 20px;
    		padding: 7px 10px 5px 10px;
    		// margin-bottom: 15px;
    		&-icon {
    			width: 18px;
    			height: 18px;
    			margin-left: 5px;
    			display: inline-block;
    			vertical-align: top;
    		}
    		&-text {
          display: inline-block;
    			font-size: 13px;
    			color: #d98422;
          vertical-align: top;
    		}
    	}
  }
</style>
