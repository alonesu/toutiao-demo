<template>
  <div class="publish">
    <el-card>
      <div slot="header">
        <my-bread>{{$route.query.id ? '修改' : '发布'}}文章</my-bread>
      </div>
      <el-form label-width="80px">
        <el-form-item label="标题:">
          <el-input style="width:300px" v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="articleForm.cover.type" @change="articleForm.cover.images=[]">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if="articleForm.cover.type === 1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type === 3">
            <my-image v-for="i in 3" :key="i" v-model="articleForm.cover.images[i-1]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道:">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item size="small" style="float:right" v-if="$route.query.id">
          <el-button type="primary" @click="update(false)">修改</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item size="small" style="float:right" v-else>
          <el-button type="primary" @click="create(false)">发表</el-button>
          <el-button @click="create(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 富文本样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 引入
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: '',
        content: '',
        channel_id: null,
        cover: {
          type: 1,
          images: []
        }
      },
      //   富文本配置对象
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  methods: {
    // 发布文章
    async create (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    // 获取文章
    async getArticle (id) {
      const {
        data: { data }
      } = await this.$http.get('articles/' + id)
      // 表单填充 面包屑文字 按钮文字
      this.articleForm = data
    },
    // 修改文章
    async update (draft) {
      await this.$http.put(
        `articles/${this.articleForm.id}?draft=${draft}`,
        this.articleForm
      )
      // 提示
      this.$message.success('修改成功')
      // 去内容管理
      this.$router.push('/article')
    },
    // 切换文章状态 发布。编辑
    toggleArticleStatus () {
      // 判断当前是否是编辑
      const articleId = this.$route.query.id
      if (articleId) {
        // 获取当前文章信息
        this.getArticle(articleId)
      } else {
        // 重置数据不能为空对象 模块中articleForm.cover.images
        this.articleForm = {
          title: '',
          content: '',
          channel_id: null,
          cover: {
            type: 1,
            images: []
          }
        }
      }
    }
  },
  created () {
    this.toggleArticleStatus()
  },
  watch: {
    '$route.query.id': function () {
      this.toggleArticleStatus()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
