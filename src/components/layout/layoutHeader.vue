<template>
  <a-layout-header class="header">
    <div class="header-wrap">
      <div class="header-left" @click="toggleCollapse">
        <MenuUnfoldOutlined v-if="data.isCollapse" class="icon" />
        <MenuFoldOutlined v-else class="icon" />
      </div>
      <div class="header-right"></div>
    </div>
  </a-layout-header>
</template>
<script lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import { reactive, computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "layoutHeader", //头部
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  },
  /**
   * Vue3 的一大特性函数 ---- setup
   * 1、setup函数是处于 生命周期函数 beforeCreate 和 Created 两个钩子函数之间的函数 也就说在 setup函数中是无法 使用 data 和 methods 中的数据和方法的
   * 2、setup函数是 Composition API（组合API）的入口
   * 3、在setup函数中定义的变量和方法最后都是需要 return 出去的 不然无法再模板中使用
   */
  setup() {
    const store = useStore();
    // reactive()将数据变成响应式数据，当数据发生变化时UI也会自动更新
    const data = reactive({
      isCollapse: store.state.app.isCollapse,
    });
    const toggleCollapse = () => {
      store.commit("app/SET_COLLAPSE");
    };
    // 计算属性
    data.isCollapse = computed(
      () => (data.isCollapse = store.state.app.isCollapse)
    );
    // 返回值
    return { data, toggleCollapse };
  },
};
</script>
<style lang="less" scoped>
.header {
  background: #fff;
  padding: 0;
  .icon {
    font-size: 18px;
    padding: 0 20px 0 20px;
  }
  .header-wrap {
    .header-left,
    .header-right {
      display: inline-block;
      > * {
        display: inline-block;
      }
    }
  }
}
</style>