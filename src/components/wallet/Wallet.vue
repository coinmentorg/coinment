<template>
  <div id="wallet">
    <div class="info-wrap">
      <img src="../../assets/img/avatar.png" class="avatar" alt="复制">
      <p class="username">子衿</p>
      <p class="code-wrap">
        <span class="code">0x5Fe4471…9f733A617</span>
        <img src="../../assets/img/copy.png" class="copy" alt="复制">
      </p>
    </div>
    <div class="coin-container">
      <div class="coins-wrap">
        <div class="coin-item">
          <img src="../../assets/img/logo-vertical.png" class="logo" alt="logo">
          <span class="coin-name">COM(Coinment)</span>
          <div class="coin-info">
            <p class="coin-num">6,700,623</p>
            <p class="coin-price">.8974</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "wallet",
  data: () => ({

  })
}
</script>
<style lang="scss" scoped>
#wallet{
  height: 100%;
  box-sizing: border-box;
  padding-top: 146px;
  position: relative;
  .info-wrap{
    top:0;
    left:0;
    width: 100%;
    color: #fff;
    height: 146px;
    padding: 20px 0;
    text-align: center;
    box-sizing: border-box;
    background-color: #555;
    position: absolute;
    .avatar{
      height: 50px;
      width: 50px;
      border-radius: 50%;
    }
    .username{
      font-size: 16px;
      font-weight: bold;
    }
    .code-wrap{
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      margin-top: 10px;
      .code{
        display: inline-block;
      }
      .copy{
        height: 12px;
        width: 12px;
        cursor: pointer;
        vertical-align: middle;
      }
    }
  }
  .coin-container{
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
  .coins-wrap{
    .coin-item{
      height: 60px;
      padding-left: 60px;
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
      .coin-name{
        display: inline-block;
        height: 60px;
        line-height: 60px;
        color: #555;
      }
      .coin-info{
        position: absolute;
        top:10px;
        right:0;
        text-align: right;
        height: 40px;
        .coin-num{
          font-size: 16px;
          font-weight: bold;
          color: #555;
        }
        .coin-price{
          font-size: 14px;
          color: #BBBBBB;
        }
      }
    }
  }
}

</style>
