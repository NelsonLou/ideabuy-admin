<template>
<div id="sidebar">
  <el-menu :default-openeds="[menuOpened]" :default-active="menuActive" :unique-opened="true" :router="true" @open="handleOpenChildMenu" @close="handleCloseChildMenu" @select="handleActiveMenu">
    <template v-for="item in menu">
    <!-- 三级菜单 -->
    <el-submenu v-if="item.children" :index="item.path" :key="item.path">
    <template slot="title">{{ item.name }}</template>
    <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path">{{ child.name }}</el-menu-item>
    </el-submenu>
    <!-- 二级菜单 -->
    <el-menu-item v-else :index="item.path" :key="item.path">{{ item.name }}</el-menu-item>
    </template>
  </el-menu>
</div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: 'sidebar',
  computed: {
    ...mapGetters({
      'menu': 'getMenu',
      'menuOpened': 'getMenuOpened',
      'menuActive': 'getMenuActive'
    })
  },
  mounted() {
    const menu = JSON.parse(localStorage.getItem('menu'))
    if (!menu) {
      this.$store.dispatch('handleMenu')
    }
  },
  methods: {
    ...mapActions(['handleOpenChildMenu', 'handleCloseChildMenu', 'handleActiveMenu'])
  }
}
</script>
<style lang="scss" scoped>
#sidebar {
    float: left;
    overflow: auto;
    width: 224px;
    height: calc(100vh - 64px);
    background-color: #eef1f6;
}
</style>
