<template>
  <div id="Chart">
    <!-- <div class="chartHeader">
      {{  }}
    </div> -->
    <van-nav-bar
      :title="friendInfo?.friendId.userName"
      left-arrow
      @click-left="() => router.push({
        name: 'ChatList',
        query: {
          friendId: friendInfo!.friendId._id,
          userId: user.userInfo._id
        }
      })"
    />
    <div class="chartContent" ref="chartContent" :style="{ marginBottom, paddingBottom: '10px' }">
      <ChartBubble
        v-for="(item, index) in messageList"
        :key="index"
        :avatar="friendInfo?.friendId.avatar"
        :message="item.message"
        :messageDirection="item.messageDirection"
        :status="item.status"
      />
    </div>
    <div class="chartFooter" ref="chartFooter">
      <van-button class="emoji" icon="smile-o" type="primary" />
      <van-field
        v-model="message"
        rows="1"
        :autosize="{
          maxHeight: 100
        }"
        type="textarea"
        placeholder="Enter you message"
        @update:model-value="onResize"
      />
      <van-button class="send" type="primary" size="small" @click="sendMsg"
        >发送</van-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onActivated, nextTick } from 'vue'
import ChartBubble from './component/ChartBubble.vue'
import useStore from '@/store'
import socket from '@/socket'
import { useRoute, useRouter } from 'vue-router'
import { Friend } from '@/types/user'
import { getRecentChatMessages, addChatMessage, Chat } from '@/db'

const { user, friendList } = useStore()
const route = useRoute()
const router = useRouter()

const message = ref('')
const chartFooter = ref<Element | null>(null)
const chartContent = ref<Element | null>(null)
const marginBottom = ref('')
const friendInfo = ref<Friend>()
const minTime = ref<undefined | number>()
const scollTop = ref(0)
friendInfo.value = friendList.getFriendInfoById(route.params.id as string)

const messageList = ref<
  {
    messageDirection: string
    message: string
    avatar?: string
    status?: number
    sendTime?: number
  }[]
>([])

const onResize = () => {
  const value = `${chartFooter.value!.clientHeight}px`
  if (value == marginBottom.value) return
  marginBottom.value = value
}

// 发送消息
const sendMsg = async () => {
  const sendTime = new Date().getTime()
  socket.emit('singleChart', {
    userId: user.userInfo._id,
    friendId: route.params.id,
    message: message.value,
    messageType: 0,
    sendTime
  })
  messageList.value.push({
    messageDirection: 'right',
    message: message.value,
    sendTime,
    status: 1
  })
  message.value = ''
  await nextTick()
  chartContent.value!.scrollTop = chartContent.value!.scrollHeight
}

// 接收消息
const singleChart = () => {
  socket.on('singleChart', (data: any) => {
    console.log('singleChart')
    console.log(data)
    if (!data.isMe) {
      messageList.value.push({
        messageDirection: 'left',
        message: data.message
      })
    }
    addChatMessage({
      userId: data.friendId,
      friendId: user.userInfo._id,
      message: data.message,
      time: data.messageTime,
      type: data.messageType || 0
    })
  })

  // 发送是否成功
  socket.on('singleChartRes', (data: any) => {
    console.log('singleChartRes')
    // console.log(data)
    if (data.fail) {
      messageList.value.find(v => v.sendTime == data.sendTime)!.status = 2
    } else {
      messageList.value.find(v => v.sendTime == data.sendTime)!.status = 0
    }
    addChatMessage({
      userId: user.userInfo._id,
      friendId: data.friendId,
      message: data.message,
      time: data.messageTime,
      type: data.messageType || 0
    })
  })
}

// 从idb获取聊天记录
const getMsgList = async () => {
  const msgList1 = (await getRecentChatMessages(
    user.userInfo._id,
    route.params.id as string
  )) as Chat[]
  const msgList2 = (await getRecentChatMessages(
    route.params.id as string,
    user.userInfo._id
  )) as Chat[]
  // 组合消息
  const res = msgList1.concat(msgList2)
  res.sort((a, b) => a!.time - b!.time)

  messageList.value = res.map(v => {
    return {
      messageDirection: v!.userId == user.userInfo._id ? 'right' : 'left',
      message: v!.message,
      sendTime: v!.time,
      avatar:
        v!.userId == user.userInfo._id
          ? user.userInfo.avatar
          : friendInfo.value!.friendId.avatar,
      status: 0
    }
  })
  minTime.value = res[0] ? res[0].time : undefined
}

onMounted(async () => {
  onResize()
  singleChart()
  await getMsgList()
  chartContent.value!.scrollTop = chartContent.value!.scrollHeight
  chartContent.value!.addEventListener('scroll', () => {
    scollTop.value = chartContent.value!.scrollTop
  })
})

onActivated(() => {
  chartContent.value!.scrollTop = scollTop.value
})
</script>

<style lang="less" scoped>
#Chart {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .chartHeader {
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: var(--header-color);
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .chartContent {
    width: 100%;
    flex: 1;
    background-color: var(--main-color);
    overflow-y: auto;
  }
  .chartFooter {
    width: 100%;
    min-height: 30px;
    position: fixed;
    bottom: 0;
    padding: 5px 0;
    background-color: var(--header-color);
    box-shadow: 0 -1px 2px 1px var(--sub-color);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .van-field {
      width: 70vw;
      padding: 5px 10px;
      border-radius: 5px;
    }
    .van-button.send {
      width: 15vw;
      height: auto;
      align-self: stretch;
      border-radius: 5px;
      // background: var(--sub-color);
    }
    .van-button.emoji {
      width: 5vw;
      height: 5vh;
      border-radius: 5px;
      background-color: transparent;
      color: var(--font-color-sub);
      border: none;
    }
  }
}
</style>
