<template>
  <div class="sider">
    <a-layout-sider :collapsed="data.isCollapse">
      <div class="logo" />
      <template v-for="(menu, index) in data.routes" :key="index">
        <a-menu
          mode="inline"
          :theme="data.theme"
          :inlineCollapsed="false"
          v-model:selectedKeys="data.selectedKeys"
          v-model:openKeys="data.openKeys"
        >
          <!-- 有子节点 -->
          <a-sub-menu v-if="menu.children" :key="menu.name">
            <template v-slot:title>
              <BorderOutlined class="icon" /> <span>{{ menu.meta.title }}</span>
            </template>
            <a-menu-item v-for="subMenu in menu.children" :key="subMenu.name">
              <router-link :to="subMenu.path">
                <span>{{ subMenu.meta.title }}</span>
              </router-link>
            </a-menu-item>
          </a-sub-menu>
          <!-- 无子节点 -->
          <a-menu-item v-else :key="menu.name">
            <router-link :to="menu.path">
              <BorderOutlined class="icon" /> <span>{{ menu.meta.title }}</span>
            </router-link>
          </a-menu-item>
        </a-menu>
      </template>
    </a-layout-sider>
  </div>
</template>
<script lang="ts">
import { reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { BorderOutlined } from "@ant-design/icons-vue";

export default {
  name: "layoutSider", //左侧菜单栏
  components: { BorderOutlined },
  setup() {
    interface DataType {
      theme: String;
      isCollapse: any;
      routes: any;
      selectedKeys: any;
      openKeys: any;
    }
    const store = useStore();
    const routers = useRouter();
    const route = useRoute();

    const data: DataType = reactive({
      theme: "dark",
      isCollapse: store.state.app.isCollapse,
      routes: [],
      selectedKeys: [],
      openKeys: [],
    });

    data.isCollapse = computed(() => store.state.app.isCollapse);
    onMounted(() => {
      // 获取路由信息
      data.routes = routers.options.routes[0].children;
      // 当前选中
      data.selectedKeys.push(route.name);
      //默认展开
      data.openKeys.push(route.matched[route.matched.length - 1].name);
      console.log("data:", data);
    });
    return { data };
  },
};
</script>
<style lang="less" scoped>
.sider {
  height: 100%;
  overflow-y: auto;
  aside {
    height: 100%;
  }
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
}
</style>