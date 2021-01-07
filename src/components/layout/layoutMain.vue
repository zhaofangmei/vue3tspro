<template>
  <div class="main-wrap">
    <a-layout-content>
      <router-view>
        <router-view />
      </router-view>
    </a-layout-content>
  </div>
</template>
<script lang="ts">
export default {
  name: "layoutMain", //内容区域
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>
<style lang="less" scoped>
.main-wrap {
  padding: 10px;
}
</style>