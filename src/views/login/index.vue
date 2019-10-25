<template>
  <div class="cantiner">
    <el-card>
      <img src="../../assets/images/logo_index.png" alt />
      <el-form ref="form" :model="formData">
        <el-form-item>
          <el-input v-model="formData.name" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="formData.code"
            style="width:240px;margin-right:5px"
            placeholder="请输入验证码"
          ></el-input>
          <el-button plain>发送验证码</el-button>
        </el-form-item>
        <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私政策</el-checkbox>
        <el-button type="primary" @click="login" style="display:block;width:100%;margin-top:20px">立即登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
// <el-button :plain="true" @click="open2">成功</el-button>
export default {
  data () {
    return {
      formData: {
        name: '',
        code: ''
      },
      checked: true
    }
  },
  methods: {
    open3 () {
      this.$message({
        message: '警告哦，这是一条警告消息',
        type: 'warning'
      })
    },
    open2 () {
      this.$message({
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })
    },
    login () {
      if (this.formData.name && this.formData.code) {
        this.open2()
      } else {
        this.open3()
      }
    }
  }
}
</script>

<style>
.cantiner {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login_bg.jpg") no-repeat center / cover;
  position: absolute;
  left: 0;
  top: 0;
}
.el-card {
  width: 400px;
  height: 340px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
img {
  display: block;
  width: 200px;
  margin: 0 auto 30px;
}
</style>
