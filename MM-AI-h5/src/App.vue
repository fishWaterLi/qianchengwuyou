<template>
  <div id="app">
    <el-container style="height:100%;border: 1px solid #eee">
      <!-- <el-aside width="200px" style="background-color: #fff">
        <div id="logoDiv" style="height: 60px"></div>
        <LeftMenu></LeftMenu>
      </el-aside>-->

      <el-container>
        <router-view class="mian-container" v-if="!$route.meta.keepAlive"></router-view>
        <el-header
          v-show="$route.meta.navShow"
          style="text-align: right; font-size: 12px;line-height: 60px;background-color: #fff;"
        >
          <div class="headerDiv header-logo"></div>
          <div class="headerDiv" style="width: 75%">
            <el-menu
              :default-active="currentMenu" 
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
            >
              <el-menu-item index="/">语料库</el-menu-item>
              <el-menu-item index="/taskManagement">任务管理</el-menu-item>
              <el-menu-item index="/userManagement">用户管理</el-menu-item>
            </el-menu>
          </div>
          <div class="headerDiv" style="width: 8%">
            <span>admin</span>
            <el-dropdown trigger="click" @command="handleCommand">
              <i class="el-icon-setting" style="margin-right: 15px;margin-left:15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="/login">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <router-view class="mian-container" v-if="$route.meta.keepAlive"></router-view>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// import LeftMenu from '@/components/leftMenu/index';
export default {
  data() {
    return {
      activeIndex: "1",
      currentMenu:'/'
    };
  },
  components: {
    // LeftMenu
  },
  methods: {
    getUrl() {
      let self = this;
      let currentUrl = window.location.href;
      self.currentMenu = currentUrl.split("#")[1];
    },
    handleSelect(key) {
      this.currentMenu = key;
      this.$router.push({ path: key });    
    },
    handleCommand(command) {
      this.$router.push({ path: command });
    }
  },
  created() {
   this.getUrl();
  }
};
</script>
<style lang="less" scoped>
#app {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.el-header {
  padding: 0;
}
.headerDiv {
  display: inline-block;
  vertical-align: top;
  background-color: rgb(238, 241, 246);
}
.headerDiv .el-menu {
  background-color: #fff;
}
.header-logo {
  background-image: url("./assets/images/logo.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 145px;
  height: 58px;
  float: left;
}
.mian-container {
  padding: 20px;
}
</style>



