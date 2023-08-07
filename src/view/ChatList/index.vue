<template>
  <div id="ChatList">
    <van-search
      shape="round"
      placeholder="搜索"
      input-align="center"
      @touchstart="touchSearch"
      @click="touchSearch"
    />
    <CellTemplate
      :message="item.message"
      :time="item.time"
      :badge="item.badge"
      :friendId="item.friendId"
      v-for="(item, index) in chatList.getCellList"
      :key="index"
      @delChatItem="delChatItem(index)"
    />
  </div>
</template>

<script lang="ts" setup>
import CellTemplate from './component/cellTemplate.vue'
import type { CellTemplateProps } from '@/types/cellTemplate'
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import useStore from '@/store'

const messageList = ref<CellTemplateProps[]>([])
const router = useRouter()
const { chatList } = useStore()

const delChatItem = (index: number) => {
  messageList.value.splice(index, 1)
}

const touchSearch = () => {
  router.push('/search')
}

onBeforeMount( async() => {
  await chatList.getChatList()
})
</script>

<style lang="less" scoped>
#ChatList {
}
</style>
