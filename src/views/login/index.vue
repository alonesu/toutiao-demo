<template>
  <div class="cantiner">
    <el-card>
      <img class="logo_img" src="../../assets/images/logo_index.png" alt />
      <el-form ref="formData" :model="formData" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="formData.code"
            style="width:240px;margin-right:5px"
            placeholder="请输入验证码"
          ></el-input>
          <el-button plain>发送验证码</el-button>
        </el-form-item>
        <el-checkbox :value="true">我已阅读并同意用户协议和隐私政策</el-checkbox>
        <el-button
          type="primary"
          style="display:block;width:100%;margin-top:20px"
          @click="login"
        >立即登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    // 校验手机号的函数
    const checkMobile = (rule, value, callback) => {
      // 通过校验逻辑判断成功失败
      // 手机号格式：1开头 第二位3-8 9个数字结尾
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      formData: {
        code: '',
        mobile: ''
      },
      checked: true,
      loginRules: {
        mobile: [
          { required: true, message: '请输入正确的手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入正确的验证码', trigger: 'blur' },
          { len: 6, message: '验证码6个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 获取表单组件shilling---调用校验函数
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          // 发请求
          this.$http.post('/authorizations', this.formData).then(res => {
            this.$router.push('/')
          }).catch(() => {})
        }
      })
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
.logo_img {
  display: block;
  width: 200px;
  margin: 0 auto 30px;
}
</style>
