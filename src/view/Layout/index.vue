<template>
  <div id="Layout">
    <van-nav-bar title="EasyChart" />
    <div :class="'layoutCnt' + (active == 0 ? ' messageBg' : '')">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="chat-o" to="/ChatList">消息</van-tabbar-item>
      <van-tabbar-item icon="friends-o">朋友</van-tabbar-item>
      <van-tabbar-item icon="smile-o">社交</van-tabbar-item>
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const active = ref(0);
</script>

<style lang="less" scoped>
#Layout {
  width: 100%;
  height: 100%;

  .layoutCnt {
    position: fixed;
    width: 100vw;
    top: 46px;
    bottom: 50px;
    left: 0;
    overflow: auto;
    &.messageBg {
      background: url("@/assets/images/消息.png");
      background-repeat: no-repeat;
      background-size: 20%;
      background-position: center center;
    }
  }
}
</style>
