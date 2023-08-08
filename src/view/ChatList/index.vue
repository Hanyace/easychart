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
import { ref, onBeforeMount, onActivated } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useStore from '@/store'
import socket from '@/socket'

const messageList = ref<CellTemplateProps[]>([])
const router = useRouter()
const route = useRoute()
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

onActivated( ()=> {
  // 从聊天页面返回时，重新获取聊天列表
  if (!route.query.friendId) return
  socket.emit('chatList', {
    userId: route.query.userId,
    type: 1,
    friendId: route.query.friendId
  })
})
</script>

<style lang="less" scoped>
#ChatList {
}
</style>
