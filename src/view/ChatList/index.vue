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
      :username="item.username"
      :friendId="item.friendId"
      v-for="(item, index) in messageList"
      :key="item.friendId"
      @delChatItem="delChatItem(index)"
    />
  </div>
</template>

<script lang="ts" setup>
import CellTemplate from './component/cellTemplate.vue'
import type { CellTemplateProps } from '@/types/cellTemplate'
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import socket from '@/socket'

const messageList = ref<CellTemplateProps[]>([
  {
    message: '你好',
    time: '下午 14:00',
    badge: 1,
    username: '张三',
    friendId: '1'
  }
])
const router = useRouter()

const delChatItem = (index: number) => {
  messageList.value.splice(index, 1)
}

const touchSearch = () => {
  router.push('/search')
}

const listenMessage = () => {
  socket.on('chatList', (data: any) => {
    console.log(data)
  })
}

onBeforeMount(() => {
  listenMessage()
})
</script>

<style lang="less" scoped>
#ChatList {
}
</style>
