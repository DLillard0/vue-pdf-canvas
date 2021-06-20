import Vue from 'vue'
import App from './App.vue'

import './assets/index.scss'
import hljs from 'highlight.js'
import DemoBlock from './views/demo-block'
Vue.component('demo-block', DemoBlock)

import { Button, Table, TableColumn, Loading } from 'element-ui'
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading)

import PdfCanvas from './components/index'
// import PdfCanvas from 'vue-pdf-canvas/lib/pdfjs/index.common.js'
Vue.use(PdfCanvas)

Vue.nextTick(() => {
  const blocks = document.querySelectorAll('pre code:not(.hljs)')
  Array.prototype.forEach.call(blocks, hljs.highlightBlock)
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
