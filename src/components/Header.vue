<template>
  <div id="header-compoment">
    <img src="../assets/img/logo-horizontal.png" class="logo" alt="coinment logo">
    <img src="../assets/img/menu.png" class="menu" alt="coinment menu">
  </div>
</template>
<script>
export default {
  name: "header-compoment",
  data: () => ({

  })
}
</script>
<style lang="scss" scoped>
#header-compoment{
  height: 44px;
  background-color: #555;
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  .logo{
    height: 22px;
    position: absolute;
    top:11px;
    left:10px;
    cursor: pointer;
  }
  .menu{
    height: 16px;
    position: absolute;
    top:14px;
    right: 10px;
    cursor: pointer;
  }
}
</style>
