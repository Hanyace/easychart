<template>
  <van-cell
    style="position: relative"
    @click="
      router.push({
        name: 'Verify',
        params: {
          friendId
        },
        query: {
          username
        }
      })
    "
  >
    <template #title>
      <van-space>
        <!-- avatar -->
        <van-image class="avatarbox" fit="cover" round :src="avatar" />
        <van-space direction="vertical" :size="0" fill>
          <span class="username">{{ username }}</span>
          <span class="text">{{ time }}</span>
        </van-space>
        <div class="status">
          <van-icon v-if="!isMe" name="friends-o" />
          <van-icon v-else name="user-o" />
          {{ status }}
        </div>
      </van-space>
      <div class="text ellipsis-1">验证消息：{{ message }}</div>
    </template>
  </van-cell>
</template>

<script setup lang="ts">
import {} from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
withDefaults(
  defineProps<{
    item?: {
      avatar?: string
      username?: string
      message?: string
      time?: string
      isMe?: boolean
      status?: string
      friendId?: string
    }
  }>(),
  {
    item: {
      avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
      username: 'Han',
      message:'我是一条验证消息我是一条验证消息我是一条验证消息我是一条验证消息我是一条验证消息',
      time: '2021-01-01 12:00',
      isMe: false,
      status: '等待验证',
      friendId: '11'
    }
  }
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
