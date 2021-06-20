# PdfCanvas

一个基于 pdf.js 的 PDF 渲染 Vue 组件（[github](https://github.com/DLillard0/vue-pdf-canvas)）

## 使用方式

### 1. 将 pdf.js 作为 cdn 引入

```
import PdfCanvas from 'vue-pdf-canvas'
Vue.use(PdfCanvas)
```

:::tip
### 注意：
1. 该组件依赖于 pdf.js@2.3x 版本。
2. 该组件默认导出的包不包含 pdf.js，需要全局引入 pdf.js@2.3x 的包，确保 window 下有 pdfjsLib 和 pdfjsWorker 这两个变量。
  ```
  <script src="https://unpkg.com/pdfjs-dist@2.3/build/pdf.js"></script>
  <script src="https://unpkg.com/pdfjs-dist@2.3/build/pdf.worker.js"></script>
  ```
3. 开发和打包时需要将 pdfjsLib 和 pdfjsWorker 进行依赖排除。
  ```
  config.externals = {
    'pdfjsLib': 'pdfjsLib',
    'pdfjsWorker': 'pdfjsWorker'
  }
  ```
:::

### 2. 全量引入，会默认包含 pdf.js 包

这种引入方式可以直接使用，不需要额外配置

```
import PdfCanvas from 'vue-pdf-canvas/lib/pdfjs/index.common.js'
Vue.use(PdfCanvas)
```

## 基础用法

:::demo

```html
<el-button @click='prevPage'>上一页</el-button>
<el-button @click='nextPage'>下一页</el-button>
<el-button @click='rotate'>旋转</el-button>
<el-button @click='increase'>提高清晰度</el-button>
<el-button @click='decrease'>降低清晰度</el-button>
<el-button @click='add'>增加展示页数</el-button>
<el-table :data="tableData" style="width: 650px">
  <el-table-column prop="page" label="当前页码"></el-table-column>
  <el-table-column prop="renderNum" label="展示页数"></el-table-column>
  <el-table-column prop="rotation" label="旋转角度"></el-table-column>
  <el-table-column prop="scale" label="清晰度"></el-table-column>
</el-table>
<div style="width:600px">
  <pdf-canvas
    :src="src"
    :scale="scale"
    :page="page"
    :rotation="rotation"
    :renderNum="renderNum"
  ></pdf-canvas>
</div>

<script>
  export default {
    data() {
      return {
        src: 'https://arxiv.org/pdf/2007.07156.pdf',
        rotation: 0,
        page: 1,
        scale: 1.5,
        renderNum: 1
      }
    },
    computed: {
      tableData() {
        return [{ rotation: this.rotation, page: this.page, scale: this.scale, renderNum: this.renderNum }]
      }
    },
    methods: {
      prevPage() {
        this.page -= 1
      },
      nextPage() {
        this.page += 1
      },
      rotate() {
        this.rotation += 90
      },
      increase() {
        this.scale += 0.25
      },
      decrease() {
        this.scale -= 0.25
      },
      add() {
        this.renderNum += 1
      }
    }
  }
</script>
```

:::

## API

### Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| src | pdf 文件的 url ，可能是 string / object / uint8Array ，详情可查看 [PDFJS.getDocument()](https://github.com/mozilla/pdf.js/blob/8ff1fbe7f819513e7d0023df961e3d223b35aefa/src/display/api.js#L117) | string / object / uint8Array | — | — |
| page | 显示的页数 | number | — | 1 |
| scale | 清晰度 | number | — | 1.5 |
| rotation | 旋转角度 | number | 必须为90的倍数 | 0 |
| auto | 确定 canvas 的默认尺寸是由外层盒子的宽度 100% 还是高度 100% 决定，多页模式下只能为 width | string | width / height | width |
| render-num | 一次性要渲染的页数，从 page 的值开始 | number | — | 1 |
| render-all | 一次性渲染全部页 | boolean | — | false |

### Events
| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| pages-num | 加载完成 pdf 得到总页数时触发 | 页数 |
| pdf-load | Pdf加载完成时触发 | pdf 文件路径 src |
| pdf-error | Pdf加载失败时触发 | 错误信息 error |
| page-load | 页面渲染完成时触发 | 渲染完成的页码 |
| page-error | 页面渲染失败时触发 | 1. 渲染失败的页码 2. 错误信息 error |
