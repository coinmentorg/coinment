<template>
  <div class="rank-wrap">
    <div class="rank-nav clearfix">
      <router-link class="left" :to="{ name: 'NewRank'}">最新点评</router-link>
      <router-link class="center" :to="{ name: 'HotRank'}">热门站点</router-link>
      <router-link class="right" :to="{ name: 'HighRank'}">高额奖励</router-link>
    </div>
    <div class="rank-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rank',
  data () {
    return {
    }
  }
}
</script>
<style scoped lang="scss">
.rank-wrap{
  padding-top: 38px;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  .rank-nav{
    top:0;
    left:0;
    height: 38px;
    width: 100%;
    text-align: center;
    line-height: 38px;
    background-color: #555;
    position: absolute;
    color:#fff;
    font-size: 12px;
    a{
      text-decoration: none;
      &.router-link-active{
        font-size: 14px;
        font-weight: bolder;
      }
      &.left{
        float: left;
        padding-left: 10px;
      }
      &.right{
        float: right;
        padding-right: 10px;
      }
    }
  }
  .rank-content{
    height: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ddd;
      border-radius: 2px;
    }
    &::-webkit-scrollbar-track {
      border:1px solid #eee;
    }
  }
}
</style>
