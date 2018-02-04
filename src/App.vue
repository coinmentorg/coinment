<template>
  <div id="app">
    <header-compoment></header-compoment>
    <router-view/>
  </div>
</template>

<script>
import HeaderCompoment from '@/components/Header'
export default {
  name: 'App',
  components: {
    HeaderCompoment
  }
}
</script>

<style lang="scss">
#app {
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 1px;
  color: #333;
  font-family:"PingFangSC-Regular","Helvetica Neue", Helvetica, "Microsoft YaHei", sans-serif;
  font-feature-settings: 'kern' 1;
  text-rendering: geometricPrecision;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin:50px auto;
  width:312px;
  height: 500px;
  box-sizing: border-box;
  box-shadow: 0 0 4px #ddd;
  padding-top: 44px;
  position: relative;
}
a{
  color: inherit;
}
.clearfix{
  &:before,
  &:after {
    content: " "; // 1
    display: table; // 2
  }
  &:after {
    clear: both;
  }
  *zoom:1;
}
.no-select{
  -moz-user-select:none;
  -webkit-user-select:none;
}
</style>
