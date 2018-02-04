<template>
  <div id="post">
    <p class="header">当前实时奖励数额</p>
    <div class="num-wrap">
      <p class="num">2.000</p>
      <img src="../../assets/img/icon.png" class="icon" alt="icon">
    </div>
    <p class="tip">发布一个有效点评，即获得2.000个COM</p>
    <div class="button-wrap">
      <span class="button no-select" v-on:click="f_open_post_mask">立即发布点评</span>
    </div>
    <p class="bottom-tip">前往“开荒”一些网站，获得高额奖励</p>

    <div class="post-mask" v-if="m_post_mask">
      <div class="post-page">
        <div class="page-header">
          <img src="../../assets/img/logo-vertical.png" class="site-logo" alt="logo">
          <p class="site-address">Coinment.org</p>
          <p class="site-intro ellipsis">网站的title、description和favicon…</p>
        </div>
        <div class="page-content">
          <p>
            这个站点是我目前见过最靠谱的基于ETH的ERC20协议发布Token的应用，他可以帮我分辨一个网站是否优质、是否是钓鱼网站等等。同时我还可以将我的感受分享给其他人，防止他们上当受骗。<br>
            说实话，如果Coinment去ICO，一定会有一个好价钱的，我也愿意投资他。
          </p>
        </div>
        <div class="page-bottom">
          <p class="comment-tab good">
            <span class="tab-circle good"></span>
            <span class="tab-name">很好</span>
          </p>
          <p class="comment-tab common">
            <span class="tab-circle common"></span>
            <span class="tab-name">中等</span>
          </p>
          <p class="comment-tab bad">
            <span class="tab-circle bad"></span>
            <span class="tab-name">很差</span>
          </p>
        </div>
      </div>
      <div class="post-bottom">
        <span class="button cancel no-select" v-on:click="f_close_post_mask">取消</span>
        <span class="button release no-select" v-on:click="f_close_post_mask">发布</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "publish",
  data: () => ({
    m_post_mask: false
  }),
  methods: {
    f_open_post_mask() {
      this.m_post_mask = true
    },
    f_close_post_mask() {
      this.m_post_mask = false
    }
  }
}
</script>
<style lang="scss" scoped>
#post{
  color: #fff;
  height: 100%;
  padding-top: 50px;
  box-sizing: border-box;
  background-color: #555;
  text-align: center;
  position: relative;
  .header{
    font-size: 16px;
    font-weight: bold;
  }
  .num-wrap{
    width: 138px;
    height: 138px;
    margin-top: 20px;
    border-radius: 50%;
    background-color: #fff;
    display: inline-block;
    position: relative;
    .num{
      height: 138px;
      color: #42CB55;
      font-size: 36px;
      font-weight: bold;
      line-height: 138px;
    }
    .icon{
      left:0;
      right:0;
      margin: auto;
      bottom: 20px;
      height: 17px;
      position: absolute;
    }
  }
  .tip{
    margin-top: 20px;
  }
  .button-wrap{
    margin-top: 40px;
    .button{
      width: 220px;
      color: #42CB55;
      border-radius: 4px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      font-weight: bold;
      display: inline-block;
      background-color: #fff;
      cursor: pointer;
      &:hover{
        background-color: #f4f4f4;
      }
      &:active{
        background-color: darken(#f4f4f4, 5%);
      }
    }
  }
  .bottom-tip{
    bottom:20px;
    font-size: 12px;
    cursor: pointer;
    font-weight: bold;
    position: absolute;
    width: 100%;
    left:0;
  }
  .post-mask{
    background-color: #555;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 10;
    top:0;
    left:0;
    .post-page{
      width: 284px;
      height: 366px;
      margin: 0 auto;
      border-radius: 4px;
      box-sizing: border-box;
      background-color: #fff;
      padding-top: 60px;
      padding-bottom: 60px;
      position: relative;
      .page-header{
        height: 60px;
        padding:10px 10px 10px 60px;
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        text-align: left;
        .site-logo{
          height: 40px;
          width: 40px;
          top:10px;
          left:10px;
          position: absolute;
          border-radius: 50%;
          box-sizing: border-box;
          border: 1px solid #ddd;
        }
        .site-address{
          font-size: 14px;
          color: #333;
          height: 20px;
          line-height: 20px;
        }
        .site-intro{
          font-size: 12px;
          color: #bbb;
          height: 20px;
          line-height: 20px;
        }
      }
      .page-content{
        height: 100%;
        padding: 10px;
        overflow-y: scroll;
        color:#555;
        text-align: justify;
        box-sizing: border-box;
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
      .page-bottom{
        height: 60px;
        border-top: 1px solid #eee;
        position: absolute;
        bottom:0;
        left:0;
        width: 100%;
        .comment-tab{
          height: 60px;
          line-height: 60px;
          display: inline-block;
          color: #BBB;
          font-size: 17px;
          font-weight: bold;
          margin-right: 20px;
          cursor: pointer;
          &:last-child{
            margin-right: 0;
          }
          .tab-name{
            display: inline-block;
            vertical-align: middle;
          }
          .tab-circle{
            border: 3px solid #bbb;
            border-radius: 50%;
            box-sizing: border-box;
            height: 26px;
            width: 26px;
            display: inline-block;
            vertical-align: middle;
            &.good{
              border-color: #42CB55;
              background-color: #42CB55;
            }
            &.common{
              border-color: #FBBE46;
            }
            &.bad{
              border-color: #FD7975;
            }
          }
        }
      }
    }
    .post-bottom{
      margin-top: 20px;
      .button{
        width: 130px;
        color: #fff;
        border-radius: 4px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        font-weight: bold;
        display: inline-block;
        background-color: #fff;
        cursor: pointer;
      }
      .cancel{
        background-color: #bbb;
        margin-right: 20px;
        &:hover{
          background-color: darken(#bbb, 5%);
        }
        &:active{
          background-color: darken(#bbb, 10%);
        }
      }
      .release{
        background-color: #42CB55;
        &:hover{
          background-color: darken(#42CB55, 5%);
        }
        &:active{
          background-color: darken(#42CB55, 10%);
        }
      }
    }
  }
}
</style>
