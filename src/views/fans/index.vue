<template>
  <div class="container-fans">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="true">
          <div class="fans_list" v-for="item in fansList" :key="item.id.toString()">
            <div class="fans_item">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>item.name</p>
              <el-button size="small" type="primary" plain>+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="reqParams.page"
            :page-size="reqParams.per_page"
            @current-change="pager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="false">
            <div ref="dom" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// 获取默认头像
import defaultImage from '../../assets/images/avatar.jpg'
import echarts from 'echarts'
export default {
  data () {
    return {
      defaultImage,
      activeName: 'true',
      total: 0,
      reqParams: {
        page: 1,
        per_page: 21
      },
      fansList: []
    }
  },
  methods: {
    pager (newPage) {
      this.reqParams.page = newPage
      this.getFansList()
    },
    async getFansList () {
      const {
        data: { data }
      } = await this.$http.get('followers', { params: this.reqParams })
      this.fansList = data.results
      this.total = data.total_count
    }
  },
  created () {
    this.getFansList()
  },
  mounted () {
    const dom = this.$refs.dom
    // 基于已经准备好的dom，初始化echarts实例
    const myEcharts = echarts.init(dom)
    // 指定图表的配置项和数据
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    // 使用指定的配置项和数据显示图表
    myEcharts.setOption(option)
  }
}
</script>

<style scoped lang="less">
.fans_list {
  width: 130px;
  height: 190px;
  text-align: center;
  margin-right: 20px;
  margin-bottom: 20px;
  border: 1px dashed #ddd;
  padding-top: 20px;
  display: inline-block;
}
</style>
