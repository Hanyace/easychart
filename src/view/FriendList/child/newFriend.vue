<template>
  <div id="newFriend" class="fadeIn">
    <van-nav-bar title="新朋友" left-arrow @click-left="router.back()" />
    <div class="list">
      <van-cell-group title="新的验证">
        <VerifyCell
          :item="item"
          v-for="(item, index) in newApply"
          :key="index"
          :title="item.status"
        />
      </van-cell-group>
      <van-cell-group title="待处理">
        <!-- <VerifyCell status="待通过" /> -->
        <VerifyCell
          :item="item"
          v-for="(item, index) in pendingProcess"
          :key="index"
          :title="item.status"
        />
      </van-cell-group>
      <van-cell-group title="已处理">
        <VerifyCell
          :item="item"
          v-for="(item, index) in haveProcess"
          :key="index"
          :title="item.status"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VerifyCell from 'v/FriendList/component/VerifyCell.vue'
import { useRouter } from 'vue-router'
import useStore from '@/store'

const { friendList, user } = useStore()

const newApply = computed(() => {
  return friendList.getBeApplyFriendList
    .filter(v => v.isView === false)
    .map(v => {
      return {
        username: v.friendId.userName,
        message: v.addMessage[v.addMessage.length - 1].message,
        time: v.addMessage[v.addMessage.length - 1].time,
        isMe: v.userId === user.userInfo._id,
        status: '等待验证',
        friendId: v.friendId._id,
        avatar: v.friendId.avatar,
      }
    })
})

const pendingProcess = computed(() => {
  return friendList.friendList
    .filter(v => v.isView === true && v.friendType != 1)
    .map(v => {
      return {
        username: v.friendId.userName,
        message: v.addMessage[v.addMessage.length - 1].message,
        time: v.addMessage[v.addMessage.length - 1].time,
        isMe: v.userId === user.userInfo._id,
        status: '待通过',
        friendId: v.friendId._id,
        avatar: v.friendId.avatar,
      }
    })
})

const haveProcess = computed(() => {
  return friendList.friendList
    .filter(v => v.isView === true && (v.friendType == 1 || v.friendType == 4))
    .map(v => {
      return {
        username: v.friendId.userName,
        message: v.addMessage[v.addMessage.length - 1].message,
        time: v.addMessage[v.addMessage.length - 1].time,
        isMe: v.userId === user.userInfo._id,
        status: v.friendType == 1?'已通过':'已拒绝',
        friendId: v.friendId._id,
        avatar: v.friendId.avatar,
      }
    })
})

const router = useRouter()
</script>

<style scoped lang="less">
#newFriend {
  .list {
    height: calc(100vh - 46px);
    overflow-y: auto;
  }
}
</style>
