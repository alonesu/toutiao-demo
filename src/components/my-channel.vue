<template>
  <el-select :value="value" @change="fn" placeholder="请选择" clearable>
    <el-option v-for="item in channelsOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  data () {
    return {
      channelsOptions: []
    }
  },
  props: ['value'],
  created () {
    this.getChannelOptions()
  },
  methods: {
    fn (channelId) {
      if (channelId === '') channelId = null
      this.$emit('input', channelId)
    },
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelsOptions = data.channels
    }
  }

}
</script>

<style>
</style>
