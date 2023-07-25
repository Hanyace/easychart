<template>
  <div id="Search">
    <van-search
      class="search"
      shape="round"
      placeholder="搜索"
      input-align="center"
      ref="search"
    />

    <div class="searchCnt">
      <!-- 搜索类型 -->
      <van-tabs v-model:active="active">
        <van-tab v-for="index in 3">
          <template #title> <van-icon name="more-o" />选项 </template>
          内容 {{ index }}
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const search = ref()
const active = ref(0)

onMounted(() => {
  search.value.focus()
})
</script>

<style scoped lang="less">
#Search {
  animation: toTop ease-in 0.5s;
  .searchCnt {
    animation: fadeIn ease-in 0.5s;
  }
}
</style>
