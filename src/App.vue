<template>
  <div class="app">
    <usage></usage>
  </div>
</template>

<script>
import usage from '../demo/usage.md'
export default {
  name: 'App',
  components: {
    usage
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
.app {
  margin: 16px 60px 20px 60px;
}

.header-anchor {
  float: left;
  margin-left: -20px;
  opacity: 0;
  cursor: pointer;
}

.demo-content {
  > {
    h2 {
      margin: 40px 0 20px;
    }

    h3 {
      margin: 20px 0;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      background-color: #fff;
      font-size: 14px;
      margin-bottom: 45px;
      line-height: 1.3em;
      border: 1px solid #e9e9e9;

      strong {
        font-weight: normal;
      }

      td, th {
        border: 1px solid #e9e9e9;
        padding: 15px;
        max-width: 250px;
      }

      th {
        text-align: left;
        white-space: nowrap;
        color: #a1a3a8;
        font-weight: normal;
        background: #f7f7f7;
      }

      td {
        color: #606266;
      }

      th:first-child, td:first-child {
        padding-left: 10px;
      }
    }

    ul:not(.timeline) {
      margin: 10px 0;
      padding: 0 0 0 20px;
      font-size: 14px;
      color: #5e6d82;
      line-height: 2em;
    }
  }
}

.hljs {
  line-height: 1.8;
  font-family: Menlo, Monaco, Consolas, Courier, monospace;
  font-size: 12px;
  padding: 18px 24px;
  background-color: #fafafa;
  border: solid 1px #eaeefb;
  margin-bottom: 25px;
  border-radius: 4px;
  -webkit-font-smoothing: auto;
}

@media (max-width: 768px) {
  .app {
    margin: 0;
  }
  .content > table {
    overflow: auto;
    display: block;
  }
}
</style>
