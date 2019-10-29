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
          <el-select v-model="queryArt.channel_id" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
            @onPick="checkTime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="queryResults">
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryArt: {
        status: null,
        channel_id: null
      },
      options: [{ value: 1, label: 'java' }, { value: 2, label: 'H5' }],
      /* pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }, */
      // value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value1: ''
    }
  },
  watch: {
    value1 (newValue, oldValue) {
      // console.log(newValue[0])
    }
  },
  methods: {
    checkTime ({ maxDate, minDate }) {
      console.log({ maxDate, minDate })
    }
  }
}
</script>

<style lang="less" scoped>
.queryResults{
  margin-top: 20px;
}
</style>>
