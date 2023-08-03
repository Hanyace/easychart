<template>
  <div id="verifyDetail" class="fadeIn">
    <van-nav-bar title="验证" left-arrow @click-left="back" />
    <van-cell center label="描述信息">
      <template #title>
        <van-space :size="20">
          <!-- avatar -->
          <van-image
            round
            class="avatarbox"
            fit="cover"
            :src="friendInfo?.friendId.avatar"
          />
          <van-space direction="vertical" fill>
            <div class="username">{{ friendInfo?.friendId.userName }}</div>
            <div>
              {{ friendInfo?.friendId.city }}
              <van-tag
                round
                type="primary"
                :color="friendInfo?.friendId.sex ? '#ff99a7' : '#1989fa'"
                >{{ friendInfo?.friendId.sex ? '♀' : '♂' }}</van-tag
              >
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
          @click="passVerify(friendInfo!.userId, friendInfo!.friendId._id)!"
          block
          >通过验证</van-button
        >
        <van-button type="primary"
        @click="replyVerify(friendInfo!.userId, friendInfo!.friendId._id, message)!"
        block>回复</van-button>
        <van-button type="danger" 
        @click="refuseVerify(friendInfo!.userId, friendInfo!.friendId._id)!"
        block>拒绝</van-button>
      </van-space>
    </van-cell-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useStore from '@/store'
import type { Friend } from '@/types/user'
import { passVerify, replyVerify, refuseVerify } from '@/socket/friendControl'

const { friendList } = useStore()

const router = useRouter()
const route = useRoute()
const friendInfo = ref<Friend>()
friendInfo.value = friendList.getFriendInfoById(route.params.friendId as string)

const message = ref('')
const back = () => {
  router.back()
}

</script>

<style scoped lang="less">
#verifyDetail {
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
