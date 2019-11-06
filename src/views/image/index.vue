<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div>
        <el-radio-group @change="toggleList" v-model="images.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          style="float:right"
          type="success"
          size="small"
          @click="dialogVisible = true"
        >添加素材</el-button>
      </div>
      <!-- 素材列表 -->
      <div class="img_list">
        <div class="item" v-for="item in imagesList" :key="item.id">
          <img :src="item.url" />
          <div class="footer">
            <span
              @click="toggleStatus(item)"
              :class="{red:item.is_collected}"
              class="el-icon-star-off"
            ></span>
            <span @click="deleteImage(item.id)" class="el-icon-delete"></span>
          </div>
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
    </el-card>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="addSuccess"
        :on-preview="handlePictureCardPreview"
        :headers="headers"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      images: {
        page: 1,
        per_page: 10,
        collect: false
      },
      imagesList: [],
      total: 0,
      dialogVisible: false,
      // 图片地址
      imageUrl: '',
      dialogImageUrl: '',
      headers: {
        Authorization: `Bearer ${JSON.parse(window.sessionStorage.getItem('hm-toutiao-pc-user-key')).token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
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
    // 切换全部或收藏
    toggleList () {
      this.images.page = 1
      this.getImages()
    },
    // 添加收藏和取消收藏
    async toggleStatus (item) {
      // 修改请求
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      //   修改样式
      item.is_collected = data.collect
      console.log(item)
    },
    // 删除图片
    deleteImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 点击确认，发送请求
          await this.$http.delete(`user/images/${id}`)
          //   提示信息
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          //   重新获取数据
          this.getImages()
        })
        .catch(() => {})
    },
    // 上传图片成功后执行的函数
    addSuccess (res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw)
      this.imageUrl = res.data.url
      this.image = file
      //   await this.$http.post('user/images', { params: this.image })
      // 提示
      this.$message.success('上传成功')
      window.setTimeout(() => {
        this.dialogVisible = false
        this.imageUrl = ''
      }, 2000)
      this.getImages()
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  width: 180px;
  height: 180px;
  position: relative;
  display: inline-block;
  margin: 0 30px 0 0;
  padding-top: 20px;
  img {
    width: 100%;
    height: 100%;
  }
  .footer {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    text-align: center;
    span {
      margin-right: 30px;
      &.red {
        color: red;
      }
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>>
