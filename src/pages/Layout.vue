<template>
<div id="layout">
  <wk-header></wk-header>
  <!-- 侧边栏 -->
  <wk-sidebar></wk-sidebar>
  <!-- 内容区 -->
  <div id="content">
    <!-- 面包屑 -->
    <el-breadcrumb class="breadcrumb">
      <el-breadcrumb-item v-for="item in $route.matched" :to="item.path" :key="item.path">
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
  <!-- <wk-footer></wk-footer> -->
</div>
</template>
<script>
import WkHeader from '@/components/Header'
import WkSidebar from '@/components/Sidebar'
// import WkFooter from '@/components/Footer'

export default {
  name: 'layout',
  components: {
    // WkFooter,
    WkHeader,
    WkSidebar
  }
}
</script>
<style lang="scss" scoped>
#content {
    overflow: auto;
    height: calc(100vh - 104px);
    margin-left: 224px;
    padding: 20px;
    background-color: #f8f8f8;
    .breadcrumb {
        margin-bottom: 20px;
    }
}
</style>
