import myBread from '@/components/my-bread'

import myChannel from '@/components/my-channel'
import myImage from '@/components/my-image'
export default {
  install (Vue) {
    // 面包屑组件
    Vue.component('my-bread', myBread)
    // 频道组件
    Vue.component('my-channel', myChannel)
    Vue.component('my-image', myImage)
  }
}
