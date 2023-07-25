<template>
  <div id="Layout">
    <van-nav-bar title="Han">
      <template #left>
        <div class="left">
          <van-popover
            :show="showSatusBoader"
            :actions="statusList"
            position="top-start"
            @select="selectStatus"
          >
            <template #reference>
              <!-- avatar -->
              <van-image
                round
                class="avatar"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
                :style="{ borderColor: statusColor }"
                @touchstart="touchAvatar"
              />
            </template>
          </van-popover>
          <!-- 状态描述 -->
          <div class="statusDesc">{{ statusText }}</div>
        </div>
      </template>
      <template #right>
        <van-icon name="plus" color="var(--font-color)" />
      </template>
    </van-nav-bar>
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
import { ref } from 'vue'

const active = ref(0)
const showSatusBoader = ref(false)
const statusColor = ref('var(--online-color)')
const statusText = ref('在线')
const statusList = ref([
  {
    text: '在线',
    value: 1,
    color: 'var(--online-color)'
  },
  {
    text: '离开',
    value: 2,
    color: 'var(--leave-color)'
  }
])

const touchAvatar = (e: TouchEvent) => {
  const pressTime = setTimeout(() => {
    showSatusBoader.value = !showSatusBoader.value
  }, 2000)
  e.target?.addEventListener('touchend', () => {
    clearTimeout(pressTime)
  })
}

const selectStatus = (item: any) => {
  console.log(item)
  statusColor.value = item.color
  statusText.value = item.text
}
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
      background: url('@/assets/images/消息.png');
      background-repeat: no-repeat;
      background-size: 20%;
      background-position: center center;
    }
  }
  .left {
    display: flex;
    align-items: flex-end;
    height: 100%;
    .avatar {
      width: 30px;
      height: 30px;
      border: 2px solid #fff;
    }
    .statusDesc {
      font-size: 12px;
      color: #999;
      margin-left: 4px;
      margin-bottom: 3px;
      transform: scale(0.8);
    }
  }
}
</style>
