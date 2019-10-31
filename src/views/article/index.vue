<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态:">
          <el-radio-group v-model="queryArt.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <el-select v-model="queryArt.channel_id" placeholder="请选择" clearable>
            <el-option
              v-for="item in channelsOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="checkDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="queryResults">
      <div slot="header">
        <span>根据筛选条件共查询到 {{total}} 条结果：</span>
      </div>
      <el-table :data="articles" style="width: 100%">
        <el-table-column label="封面" width="280">
          <template slot-scope="scope">
            <el-image
              style="width: 150px; height: 100px"
              :src="scope.row.cover.images[0]"
              fit="fill"
            >
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" alt width="150" height="100" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column label="状态" width="150">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-show="scope.row.status === 1">待审核</el-tag>
            <el-tag v-show="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-show="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-show="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              @click="toEdit(scope.row.id)"
              type="primary"
              icon="el-icon-edit"
              circle
              plain
            ></el-button>
            <el-button
              @click="delArticle(scope.row.id)"
              type="danger"
              icon="el-icon-delete"
              circle
              plain
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="queryArt.page"
        :page-size="queryArt.per_page"
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
      queryArt: {
        status: null,
        channel_id: null,
        // 当前页码
        page: 1,
        // 每页的条数
        per_page: 20,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 文章频道选项
      channelsOptions: [],
      value1: '',
      // 文章列表数据
      articles: [],
      // 文章总条数
      total: 0
    }
  },
  watch: {
    value1 (newValue, oldValue) {
      // console.log(newValue[0])
    }
  },
  methods: {
    // 获取文章频道
    async getChannelsOptions () {
      const {
        data: { data }
      } = await this.$http.get('/channels')
      this.channelsOptions = data.channels
    },
    // 获取文章
    async getArticle () {
      const {
        data: { data }
      } = await this.$http.get('/articles', { params: this.queryArt })
      // 赋值文章依赖数据
      this.articles = data.results
      // 获取文章总条数
      this.total = data.total_count
    },
    // 跳转到发布文章
    toEdit (id) {
      this.$router.push({
        path: '/publish',
        query: { id }
      })
    },
    // 删除
    async delArticle (id) {
      try {
        await this.$confirm('确定要删除么？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        try {
          await this.$http.delete(`/articles/${id}`)
          this.$message('删除成功')
          this.getArticle()
        } catch (error) {
          this.$message('删除失败!!')
        }
      } catch (error) {
        this.$message('已取消删除')
      }
    },
    pageChange (newPage) {
      this.queryArt.page = newPage
      this.getArticle()
    },
    // 筛选
    search () {
      if (this.queryArt.channel_id === '') this.queryArt.channel_id = null
      this.queryArt.page = 1
      this.getArticle()
    },
    // 时间筛选条件
    checkDate (date) {
      if (date) {
        this.queryArt.begin_pubdate = date[0]
        this.queryArt.end_pubdate = date[1]
      } else {
        this.queryArt.begin_pubdate = null
        this.queryArt.end_pubdate = null
      }
    }
  },
  created () {
    this.getChannelsOptions()
    this.getArticle()
  }
}
</script>

<style lang="less" scoped>
.queryResults {
  margin-top: 20px;
}
</style>>
