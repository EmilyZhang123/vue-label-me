<template>
  <div id="app">
    <div id="nav">
      <b>自动化标注网站</b>
    </div>
    <div style="padding: 20px">
      <router-view/>
    </div>
  </div>
</template>
<script>
</script>
<style>
  @import "assets/css/initCss.css";
  @import "font/iconfont.css";
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  #nav {
    padding: 10px 20px;
    -webkit-box-shadow: 10px 0 10px 10px #92bbe6;
    background: #0052a5;
    color: #fff;
    font-size: 16px;
  }

  #nav b{
    cursor: pointer;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
