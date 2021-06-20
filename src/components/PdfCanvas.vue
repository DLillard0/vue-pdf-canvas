<template>
  <div id="pdf-canvas__warpper" :style="{[auto]:'100%'}">
    <canvas v-for="i in renderPageNum" :key="i" :style="{[auto]:'100%'}" :id="'pdf-canvas-' + i"></canvas>
  </div>
</template>

<script>
import PdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
PdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default {
  name: 'PdfCanvas',

  props: {
    src: {
      type: [String, Object, Uint8Array],
      default: null
    },
    page: {
      type: Number,
      default: 1
    },
    scale: {
      type: Number,
      default: 1.5
    },
    rotation: {
      type: Number,
      default: 0
    },
    auto: {
      type: String,
      default: 'width'
    },
    renderNum: {
      type: Number,
      default: 1
    },
    renderAll: Boolean
  },

  data() {
    return {
      now: 0,
      pdf: null,
      pageArr: [],
      numPages: 1,
      renderPageIndex: 1,
      rendering: false,
      renderList: 0
    }
  },

  methods: {
    getPdf() {
      if (!this.src || !PdfjsLib) {
        this.rendering = false
        return
      }
      this.pdf = null
      this.pageArr = []
      PdfjsLib.getDocument(this.src).promise.then((pdf) => {
        this.$emit('pdf-load', this.src)
        if (!this.renderAll) this.pdf = pdf
        this.numPages = pdf.numPages
        this.$emit('pages-num', pdf.numPages)
        this.$nextTick(() => {
          this.getPage(pdf)
        })
      }).catch((err) => {
        this.$emit('pdf-error', err)
      })
    },
    getPage(pdf) {
      const PDF = this.pdf || pdf
      if (!PDF || this.renderPageIndex > this.renderPageNum) {
        this.renderPageIndex = 1
        this.rendering = false
        return
      }
      let pageNum = this.renderAll ? this.renderPageIndex : this.page + this.renderPageIndex - 1
      if (pageNum > this.numPages) {
        this.renderPage(null, this.renderPageIndex, true)
        this.renderPageIndex++
        this.getPage(PDF)
        return
      }
      PDF.getPage(pageNum).then((page) => {
        this.pageArr[this.renderPageIndex] = page
        this.renderPage(page, this.renderPageIndex)
        this.$emit('page-load', pageNum)
        this.renderPageIndex++
        this.getPage(PDF)
      }).catch((err) => {
        this.$emit('page-error', pageNum, err)
        this.renderPageIndex++
        this.getPage(PDF)
      })
    },
    renderPage(page, i, hidden = false) {
      const canvas = document.getElementById('pdf-canvas-' + i)
      if (hidden) {
        canvas.style.display = 'none'
        return
      } else {
        canvas.style.display = 'inline'
      }
      const PAGE = this.pageArr[i] || page
      const viewport = PAGE.getViewport({
        scale: this.scale,
        rotation: this.rotation
      })
      const context = canvas.getContext('2d')
      canvas.height = viewport.height
      canvas.width = viewport.width
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      }
      this.renderList++
      PAGE.render(renderContext).promise.then(() => {
        this.renderList--
      }).catch((err) => {
        this.renderList--
        console.log(err)
      })
    },
    refresh(mode) {
      if (this.rendering || this.renderList !== 0) return
      this.rendering = true
      switch (mode) {
        case 'page':          
          for (let i = 1; i <= this.renderPageNum; i++) {
            this.renderPage(null, i)
          }
          this.rendering = false
          break
        case 'pdf':
          this.getPage()
          break
        default:
          this.getPdf()
      }
    }
  },

  computed: {
    renderPageNum() {
      return this.renderAll ? this.numPages : this.renderNum
    }
  },

  watch: {
    rotation() {
      this.refresh('page')
    },
    scale() {
      this.refresh('page')
    },
    page(val) {
      if (val < 1) return
      this.refresh('pdf')
    },
    renderNum() {
      this.$nextTick(() => {
        this.refresh('pdf')
      })
    },
    src() {
      this.refresh()
    }
  },

  mounted() {
    this.refresh()
  }
}
</script>

<style lang="scss">
#pdf-canvas__warpper {
  text-align: center;
}
</style>
