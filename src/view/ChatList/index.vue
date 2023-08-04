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
import type { ChatList } from '@/types/user'
import { ref, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useStore from '@/store'

const messageList = ref<CellTemplateProps[]>([])
const router = useRouter()
const route = useRoute()
const { chatList, user } = useStore()

const delChatItem = (index: number) => {
  messageList.value.splice(index, 1)
}

const touchSearch = () => {
  router.push('/search')
}

const formatToChatList = (data: ChatList[]) => {
  return data.map((item: ChatList) => {
    return {
      message: item.lastMessage,
      time: item.lastTime,
      badge: item.messageNum,
      username: user.userInfo.userName,
      friendId: route.params.id
    } as CellTemplateProps
  })
}

onBeforeMount( async() => {
  await chatList.getChatList()
  messageList.value = formatToChatList(chatList.chatList)
})
</script>

<style lang="less" scoped>
#ChatList {
}
</style>
