<template>
  <div class="my-image">
    <div class="btn_box" @click="open">
      <img :src="value || btnImage" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <div>
            <el-radio-group @change="toggleList" v-model="images.collect" size="small">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <div class="img_list">
            <div
              class="item"
              :class="{selected: selectedImageUrl === item.url}"
              v-for="item in imagesList"
              :key="item.id"
              @click="selected(item.url)"
            >
              <img :src="item.url" />
            </div>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="images.page"
            :page-size="images.per_page"
            @current-change="pager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="addSuccess"
            :headers="headers"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImage from '../assets/images/default.png'
export default {
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      images: {
        page: 1,
        per_page: 8,
        collect: false
      },
      //   素材列表内容
      imagesList: [],
      //   总条数
      total: 0,
      // 确认是素材库还是上传图片
      activeName: 'image',
      //  请求头
      headers: {
        Authorization: `Bearer ${
          JSON.parse(window.sessionStorage.getItem('hm-toutiao-pc-user-key'))
            .token
        }`
      },
      // 上传的图片地址
      uploadImageUrl: '',
      // 选中图片地址
      selectedImageUrl: '',
      // 按钮图片
      btnImage: defaultImage
    }
  },
  methods: {
    // 打开对话框
    open () {
      this.dialogVisible = true
      this.getImages()
    },
    // 切换全部、收藏
    toggleList () {
      this.images.page = 1
      this.getImages()
    },
    //   获取图片信息
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.images })
      this.imagesList = data.results
      this.total = data.total_count
    },
    // 分页功能
    pager (newPage) {
      this.images.page = newPage
      this.getImages()
    },
    // 上传成功后执行的函数
    addSuccess (res) {
      this.uploadImageUrl = res.data.url
      // 提示
      this.$message.success('上传成功')
    },
    // 选中图片
    selected (url) {
      this.selectedImageUrl = url
    },
    // 确认图片
    confirmImage () {
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) {
          return this.$message.warning('请选择一张图片')
        }
        // this.btnImage = this.selectedImageUrl
        // 提交给父组件
        this.$emit('input', this.selectedImageUrl)
        this.dialogVisible = false
      } else {
        if (!this.uploadImageUrl) {
          return this.$message.warning('请上传一张图片')
        }
        // this.btnImage = this.uploadImageUrl
        // 提交给父组件
        this.$emit('input', this.uploadImageUrl)
        this.dialogVisible = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-image {
  display: inline-block;
  margin-right: 20px;
  .btn_box {
    width: 150px;
    height: 150px;
    border: 1px dashed #ddd;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .item {
    width: 150px;
    height: 120px;
    position: relative;
    display: inline-block;
    margin: 0 20px 10px 0;
    img {
      width: 100%;
      height: 100%;
    }
    &.selected::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/images/selected.png)
        no-repeat center / 50px;
    }
  }
}
</style>
