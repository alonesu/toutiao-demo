<template>
  <div class="container-comment">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="articles">
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scoped">{{ scoped.row.comment_status ? '正常' : '关闭' }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scoped">
            <el-button size="small" type="danger" @click="toggleCommentStatus(scoped.row.id,false)" v-if="scoped.row.comment_status">关闭评论</el-button>
            <el-button size="small" type="success" @click="toggleCommentStatus(scoped.row.id,true)" v-else>打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        :total="total"
        @current-change="pageChange"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: [],
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      // 总条数
      total: 0
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    // 获取文章信息
    async getArticle () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    // 分页
    pageChange (newPage) {
      this.reqParams.page = newPage
      this.getArticle()
    },
    // 切换评论状态
    toggleCommentStatus (id, draft) {
      this.$confirm(draft ? '确定打开评论吗？' : '确定关闭评论吗, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.put(`comments/status?article_id=${id}`, { allow_comment: draft })
        this.$message({
          type: 'success',
          message: draft ? '打开评论成功!' : '关闭评论成功'
        })
        this.getArticle()
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
