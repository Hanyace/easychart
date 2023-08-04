<template>
  <van-config-provider theme="dark">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </van-config-provider>
</template>

<script setup lang="ts">
import useStroe from '@/store'
const { user, friendList, chatList } = useStroe()

// 获取初始信息
if (user.token) {
  if (!user.userInfo._id) {
    user.getUserInfo()
  }
  if (!chatList.chatList.length) {
    chatList.getChatList()
  }
  if (!friendList.friendList.length) {
    friendList.getFriendList()
  }
  if (!friendList.groupList.length) {
    friendList.getGroupList()
  }
}

document.documentElement.classList.add('dark')
</script>

<style scoped lang="less"></style>
