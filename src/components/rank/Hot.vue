<template>
  <div id="hot-rank">
    <div class="rank-item">
      <img src="../../assets/img/logo-vertical.png" class="logo" alt="logo">
      <div class="inner-wrap">
        <p class="rank-name">Coinment.org</p>
        <p class="rank-num">171,246 条有效点评</p>
      </div>
      <span class="tag good">很好！</span>
    </div>
    <div class="rank-item">
      <img src="../../assets/img/logo-vertical.png" class="logo" alt="logo">
      <div class="inner-wrap">
        <p class="rank-name">Coinment.org</p>
        <p class="rank-num">171,246 条有效点评</p>
      </div>
      <span class="tag good">很好！</span>
    </div>
    <div class="rank-item">
      <img src="../../assets/img/logo-vertical.png" class="logo" alt="logo">
      <div class="inner-wrap">
        <p class="rank-name">Coinment.org</p>
        <p class="rank-num">171,246 条有效点评</p>
      </div>
      <span class="tag common">中等</span>
    </div>
    <div class="rank-item">
      <img src="../../assets/img/logo-vertical.png" class="logo" alt="logo">
      <div class="inner-wrap">
        <p class="rank-name">Coinment.org</p>
        <p class="rank-num">171,246 条有效点评</p>
      </div>
      <span class="tag bad">很差！</span>
    </div>
    <div class="rank-item">
      <img src="../../assets/img/logo-vertical.png" class="logo" alt="logo">
      <div class="inner-wrap">
        <p class="rank-name">Coinment.org</p>
        <p class="rank-num">171,246 条有效点评</p>
      </div>
      <span class="tag bad">很差！</span>
    </div>
    <div class="rank-item">
      <img src="../../assets/img/logo-vertical.png" class="logo" alt="logo">
      <div class="inner-wrap">
        <p class="rank-name">Coinment.org</p>
        <p class="rank-num">171,246 条有效点评</p>
      </div>
      <span class="tag good">很好！</span>
    </div>
    <div class="rank-item">
      <img src="../../assets/img/logo-vertical.png" class="logo" alt="logo">
      <div class="inner-wrap">
        <p class="rank-name">Coinment.org</p>
        <p class="rank-num">171,246 条有效点评</p>
      </div>
      <span class="tag good">很好！</span>
    </div>
    <div class="rank-item">
      <img src="../../assets/img/logo-vertical.png" class="logo" alt="logo">
      <div class="inner-wrap">
        <p class="rank-name">Coinment.org</p>
        <p class="rank-num">171,246 条有效点评</p>
      </div>
      <span class="tag good">很好！</span>
    </div>
    <div class="rank-item">
      <img src="../../assets/img/logo-vertical.png" class="logo" alt="logo">
      <div class="inner-wrap">
        <p class="rank-name">Coinment.org</p>
        <p class="rank-num">171,246 条有效点评</p>
      </div>
      <span class="tag bad">很差！</span>
    </div>
    <div class="rank-item">
      <img src="../../assets/img/logo-vertical.png" class="logo" alt="logo">
      <div class="inner-wrap">
        <p class="rank-name">Coinment.org</p>
        <p class="rank-num">171,246 条有效点评</p>
      </div>
      <span class="tag good">很好！</span>
    </div>

  </div>
</template>
<script>
export default {
  name: "hot-rank",
  data: () => ({

  })
}
</script>
<style lang="scss" scoped>
#hot-rank{
  .rank-item{
    height: 60px;
    padding:0 60px;
    position: relative;
    cursor: pointer;
    border-bottom: 1px solid #ddd;
    &:hover{
      background-color: #f4f4f4;
    }
    &:active{
      background-color: darken(#f4f4f4, 5%);
    }
    .logo{
      height: 40px;
      width: 40px;
      top:10px;
      left:10px;
      position: absolute;
      border-radius: 50%;
      box-sizing: border-box;
      border: 1px solid #ddd;
    }
    .inner-wrap{
      padding: 10px 0;
      font-size: 12px;
      p{
        height: 20px;
        line-height: 20px;
        &.rank-name{
          color: #555;
        }
        &.rank-num{
          color: #bbb;
        }
      }
    }
    .tag{
      font-size: 15px;
      font-weight: bold;
      position: absolute;
      right: 0;
      top:0;
      width: 60px;
      line-height: 60px;
      &.good{
        color: #42CB55;
      }
      &.common{
        color: #FBBE46;
      }
      &.bad{
        color: #FD7975;
      }
    }
  }
}
</style>
