<template>
  <div class="container-setting">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form label-width="80px">
              <el-form-item label="编号:" v-model="userInfo.id">{{userInfo.id}}</el-form-item>
              <el-form-item label="手机号:" v-model="userInfo.mobile">{{userInfo.mobile}}</el-form-item>
              <el-form-item label="媒体名称:">
                  <el-input v-model="userInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍:">
                  <el-input type="textarea" rows="3" v-model="userInfo.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱:">
                  <el-input v-model="userInfo.email"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="saveSetting">保存设置</el-button>
              </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
           <el-upload
            class="avatar-uploader"
            action=""
            :http-request="updatePhoto"
            :show-file-list="false"
            name="image"
          >
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      userInfo: {
        name: '',
        intro: '',
        email: '',
        photo: '',
        mobile: '',
        id: ''
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.userInfo = data
    //   this.uploadImageUrl = data.photo
    },
    // 保存设置
    async saveSetting () {
      const { name, intro, email } = this.userInfo
      const { data: { data } } = await this.$http.patch('user/profile', { name, intro, email })
      // 提示
      this.$message.success('保存成功')
      // 修改本地信息
      const user = local.getUser()
      user.name = data.name
      local.setUser(user)
      // 修改home组件
      eventBus.$emit('changeName', data.name)
    },
    // 保存头像
    async updatePhoto ({ file }) {
      const formdata = new FormData()
      formdata.append('photo', file)
      const { data: { data } } = await this.$http.patch('user/photo', formdata)
      this.userInfo.photo = data.photo
      // 提示
      this.$message.success('上传成功')
      // 修改本地信息
      const user = local.getUser()
      user.photo = data.photo
      local.setUser(user)
      // 修改home组件
      eventBus.$emit('changePhoto', data.photo)
    }
  }
}
</script>

<style scoped lang="less">
</style>
