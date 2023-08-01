<template>
  <div id="AddUser" class="fadeIn">
    <van-nav-bar title="添加好友" left-arrow @click-left="back" />
    <van-cell center label="描述信息">
      <template #title>
        <van-space :size="20">
          <!-- avatar -->
          <van-image
            round
            class="avatarbox"
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <van-space direction="vertical" fill>
            <div class="username">{{ temp.tempUserInfo.userName }}</div>
            <div>
              {{ temp.tempUserInfo.city || '' }}
              <van-tag round type="primary">{{
                temp.tempUserInfo.sex ? '♀' : '♂'
              }}</van-tag>
            </div>
          </van-space>
        </van-space>
      </template>
    </van-cell>
    <van-cell-group inset>
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="留言"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <van-space direction="vertical" fill>
        <div></div>
        <van-button
          style="margin-top: 10px"
          type="primary"
          @click="sendVerify"
          block
          >发送验证</van-button
        >
        <van-button type="danger" block @click="router.back()">取消</van-button>
      </van-space>
    </van-cell-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showSuccessToast } from 'vant'
import useStore from '@/store'
import socket from '@/socket'
const router = useRouter()
const { user, temp } = useStore()

defineProps(['username', 'id'])

const message = ref('')
const back = () => {
  router.back()
}

const sendVerify = () => {
  socket.emit('addFriend', {
    userId: user.userInfo.userId,
    friendId: temp.tempUserInfo.userId,
    addMessage: message.value
  })
  showSuccessToast('发送成功')
  router.back()
}
</script>

<style scoped lang="less">
#AddUser {
  .avatarbox {
    width: 60px;
    height: 60px;
  }
  .username {
    font-size: 16px;
    font-weight: 700;
  }
}
</style>
