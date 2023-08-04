<template>
  <van-cell id="FriendCell" @click="toChat(data!.friendId._id)">
    <template #title>
      <van-space>
        <!-- avatar -->
        <van-image
          class="avatarbox"
          fit="cover"
          round
          :src="data?.friendId.avatar"
        />
        <van-space direction="vertical" :size="0" fill>
          <span class="username">{{ data?.friendId.userName }}</span>
          <span class="text">{{ data?.friendId.discription }}</span>
        </van-space>
      </van-space>
    </template>
  </van-cell>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import type { Friend } from '@/types/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const { data } = defineProps({
  data: {
    type: Object as PropType<Friend>
  }
})

const toChat = (id: string) => {
  router.push({
    name: 'Chart',
    params: { id }
  })
}
</script>

<style scoped lang="less">
#FriendCell {
  padding: 0;
  .avatarbox {
    width: 50px;
    height: 50px;
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
}
</style>
