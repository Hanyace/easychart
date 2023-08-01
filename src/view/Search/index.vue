<template>
  <div id="Search">
    <van-search
      class="search"
      shape="round"
      :placeholder="placeholder"
      @update:model-value="onSearch"
      input-align="left"
      ref="search"
      v-model="value"
    >
      <template #right-icon>
        <van-icon name="arrow-left" @click="router.back()" />
      </template>
    </van-search>
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
      <ResultCell :dataList="dataList" :active="active" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ResultCell from './component/ResultCell.vue'
import type { UserInfo } from '@/types/user'
import { user_find_api } from '@/api/user'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { debounce } from 'u/others'
const router = useRouter()

const search = ref()
const active = ref(0)
const placeholder = ref('请输入用户昵称或id查找')
const value = ref('')
const dataList = ref<UserInfo[]>([])

const changeTab = (index: number) => {
  switch (index) {
    case 0:
      placeholder.value = '请输入用户昵称或邮箱查找'
      break
    case 1:
      placeholder.value = '请输入好友昵称或邮箱查找'
      break
    case 2:
      placeholder.value = '请输入消息记录查找'
      break
  }
}

const onSearch = debounce(async function () {
  if (value.value) {
    const { data: res } = await user_find_api(value.value)
    if (res.data) {
      dataList.value = res.data
    } else {
      dataList.value = []
    }
  } else {
    dataList.value = []
  }
}, 500)

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
