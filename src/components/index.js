import myBread from '@/components/my-bread'

import myChannel from '@/components/my-channel'
export default {
  install (Vue) {
    // 面包屑组件
    Vue.component('my-bread', myBread)
    // 频道组件
    Vue.component('my-channel', myChannel)
  }
}
