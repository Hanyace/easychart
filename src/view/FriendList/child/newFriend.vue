<template>
  <div id="newFriend" class="fadeIn">
    <van-nav-bar title="新朋友" left-arrow @click-left="router.back()" />
    <div class="list">
      <van-cell-group title="新的验证">
        <VerifyCell />
        <VerifyCell :isMe="true" />
      </van-cell-group>
      <van-cell-group title="待处理">
        <VerifyCell status="待通过" />
      </van-cell-group>
      <van-cell-group title="已处理">
        <VerifyCell status="已添加" />
        <VerifyCell status="已拒绝" />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from 'vue'
import VerifyCell from 'v/FriendList/component/VerifyCell.vue'
import { useRouter } from 'vue-router'

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
