<template>
  <a-layout class="home">
    <LayoutSider />
    <a-layout class="home-right" :style="data.isCollapse ? 'left:80px' : ''">
      <LayoutHeader />
      <LayoutMain />
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import LayoutSider from "@/components/layout/layoutSider.vue";
import LayoutHeader from "@/components/layout/layoutHeader.vue";
import LayoutMain from "@/components/layout/layoutMain.vue";
import { reactive, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Home",
  components: {
    LayoutSider,
    LayoutHeader,
    LayoutMain,
  },
  setup() {
    const store = useStore();
    const data = reactive({
      isCollapse: store.state.app.isCollapse,
    });
    data.isCollapse = computed(
      () => (data.isCollapse = store.state.app.isCollapse)
    );
    return {
      data,
    };
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  width: 100%;
  // width: @ly_width;
  .home-right {
    position: absolute;
    top: 0;
    right: 0;
    left: 200px;
    bottom: 0;
  }
}
</style>
