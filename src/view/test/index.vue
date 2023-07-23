<template>
  <div>
    <van-button type="primary" @click="sendMsg">test</van-button>
    <van-cell-group inset>
      <van-field v-model="value" label="好友id" placeholder="请输入好友id" />
    </van-cell-group>
    <van-button type="primary" @click="addFriend">addFriend</van-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useStore from '@/store'
import { socket } from '@/socket'

const { user } = useStore()
const value = ref('')
const sendMsg = () => {
  socket.emit('singleChart', {
    userId: '5aceedd0-26de-11ee-be75-cd861896048c',
    friendId: 'f83441b0-26e3-11ee-a08f-2fd1ed0d87c2',
    message: 'hello',
    messageType: 0
  })
}

const addFriend = () => {
  console.log(user.userInfo)
  socket.emit('addFriend', {
    // userId: '5aceedd0-26de-11ee-be75-cd861896048c',
    userId: user.userInfo.userId,
    friendId: value.value,
    addMessage: '快加我吧，我等你很久了',
  })
}

onMounted(() => {
  socket.on('singleChart', (data: any) => {
    console.log('singleChart')

    console.log(data)
  })

  socket.on('chartList', (data: any) => {
    console.log('chartList')

    console.log(data)
  })

  socket.on('addFriend', (data: any) => {
    console.log('addFriend')

    console.log(data)
  })

    socket.on('friendControl', (data: any) => {
    console.log('friendControl')

    console.log(data)
  })
})
</script>

<style scoped lang="less"></style>
