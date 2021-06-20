import PdfCanvas from './PdfCanvas.vue'
 
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('PdfCanvas', PdfCanvas)
}

PdfCanvas.install = function(Vue){
  Vue.component(PdfCanvas.name, PdfCanvas)
}

export default PdfCanvas