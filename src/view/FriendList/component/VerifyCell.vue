<template>
  <van-cell
    style="position: relative"
    @click="
      router.push({
        name: 'Verify',
        params: {
          friendId:item.friendId
        },
        query: {
          username:item.username
        }
      })
    "
  >
    <template #title>
      <van-space>
        <!-- avatar -->
        <van-image class="avatarbox" fit="cover" round :src="item.avatar" />
        <van-space direction="vertical" :size="0" fill>
          <span class="username">{{ item.username }}</span>
          <span class="text">{{ item.time }}</span>
        </van-space>
        <div class="status">
          <van-icon v-if="!item.isMe" name="friends-o" />
          <van-icon v-else name="user-o" />
          {{ item.status }}
        </div>
      </van-space>
      <div class="text ellipsis-1">验证消息：{{ item.message }}</div>
    </template>
  </van-cell>
</template>

<script setup lang="ts">
import {} from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
withDefaults(
  defineProps<{
    item: {
      avatar?: string
      username?: string
      message?: string
      time?: number
      isMe?: boolean
      status?: string
      friendId?: string
    }
  }>(),
  {}
)
</script>

<style scoped lang="less">
.avatarbox {
  width: 55px;
  height: 55px;
}
.username {
  font-size: 16px;
  font-weight: 700;
}
.text {
  font-size: 12px;
  color: #999;
  width: 90vw;
}
.status {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 12px;
  color: #999;
}
</style>
