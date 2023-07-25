<template>
  <div id="Search">
    <van-search
      class="search"
      shape="round"
      :placeholder="placeholder"
      input-align="left"
      ref="search"
    />
    <div class="searchCnt">
      <!-- 搜索类型 -->
      <van-tabs v-model:active="active" @change="changeTab">
        <van-tab>
          <template #title> <van-icon name="user-o" />用户 </template>
        </van-tab>
        <van-tab>
          <template #title> <van-icon name="friends-o" />好友 </template>
        </van-tab>
        <van-tab>
          <template #title> <van-icon name="chat-o" />消息 </template>
        </van-tab>
      </van-tabs>
      <ResultCell :active="active" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ResultCell from './component/ResultCell.vue'
import { ref, onMounted } from 'vue'

const search = ref()
const active = ref(0)
const placeholder = ref('请输入用户昵称或id')

const changeTab = (index:number) => {
  switch (index) {
    case 0:
      placeholder.value = '请输入用户昵称或id'
      break
    case 1:
      placeholder.value = '请输入好友昵称或id'
      break
    case 2:
      placeholder.value = '请输入消息记录'
      break
  }
}

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
