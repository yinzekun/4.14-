<template>
  <div class="identityCertificate">
    <consultHeader></consultHeader>
    <tipsCom message="填写的内容会自动保存，请放心填写！"></tipsCom>
    <van-row class="identityCertificate-nav">
      <van-col span="24" class="identityCertificate-nav-title">照片上传</van-col>
      <van-col span="12">
        <van-uploader v-model="fileList1" :accept="'image/*'" :preview-full-image='true' :before-delete="deleteReadOne"
          :before-read="beforeReadOne" :max-count="1">
          <div class="identityCertificate-nav-fill">
            <img src="https://yiqunchou-1300633744.cos.ap-shanghai.myqcloud.com/web/static/上传图片.png" alt="" />
            <div>上传出生证照片</div>
          </div>
        </van-uploader>
      </van-col>
    </van-row>

    <div class="identityCertificate-button-bottom" @click="submitFun()">保存</div>
  </div>
</template>

<script>
  import {
    Row,
    Col,
    Field,
    Cell,
    CellGroup,
    Uploader,
    Toast
  } from 'vant';
  import tipsCom from './../../components/tipsCom.vue';
  import consultHeader from './../../components/consultHeader.vue';
  export default {
    name: 'identityCertificate',
    data() {
      return {
        value: '',
        fileList1: [],
        birthImg: '', //出生证照片
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
        this.birthImg = '';
        return true;
      },
      // 图片上传
      beforeReadOne(file) {
        let data = new FormData(),
          _this = this;
        data.append('image', file);
        _this.uploadImg(data, 0);
        return true;
      },
      uploadImg(data, num) {
        let _this = this;
        let toastUpload = Toast.loading({
          message: '上传中...',
          forbidClick: false,
          duration: 0
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
              let obj = new Object(),
                ary = new Array();
              obj.url = response.data.data;
              ary.push(obj);
                _this.birthImg = response.data.data;
                _this.fileList1 = ary;
              toastUpload.clear();
              Toast.success('上传成功');
            } else {
              toastUpload.clear();
              Toast.fail('上传失败');
            }
          })
          .catch(function(error) {
            Toast.fail('上传失败！！');
          });
      },
      submitFun() {
        let _this = this;
        if (_this.birthImg == '') {
          Toast('您还未上传出生证照片！');
          return false
        }
        _this.$axios({
            method: 'post',
            url: '/yqc/supplement/addIdCard?fundraisingId=' + _this.$route.query.id + '&birthImg=' + _this.birthImg,
            responseType: 'json'
          })
          .then(function(response) {
            console.log(response);

            if (response.data.ret) {
              Toast.success('保存成功！！');
              _this.$router.go(-2);
            } else {
              Toast.fail('保存失败!!');
            }
          })
          .catch(function(error) {
            Toast.fail('保存失败！！');
          });
      }
    }
  };
</script>

<style scoped lang="less">
  .identityCertificate {
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
  .identityCertificate .van-image {
    display: block;
    width: 160px;
    height: 100px;
  }
</style>
