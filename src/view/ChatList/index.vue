<template>
  <div id="ChatList">
    <van-search
      shape="round"
      placeholder="搜索"
      input-align="center"
      @touchstart="touchSearch"
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const messageList = ref<CellTemplateProps[]>([])
const router = useRouter()
messageList.value = [
  {
    message: '你好',
    time: '下午 14:00',
    badge: 1,
    username: '张三',
    friendId: '1'
  }
]

const delChatItem = (index: number) => {
  messageList.value.splice(index, 1)
}

const touchSearch = () => {
  router.push('/search')
}
</script>

<style lang="less" scoped>
#ChatList {
}
</style>
