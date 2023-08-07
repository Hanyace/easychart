<template>
  <div id="Layout">
    <van-nav-bar :title="user.userInfo.userName">
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
                @click="touchAvatar"
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
    <div :class="'layoutCnt' + (route.name == 'ChatList' ? ' messageBg' : '')">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" /> 
        </keep-alive>
      </router-view>
    </div>
    <van-tabbar route>
      <van-tabbar-item replace icon="chat-o" to="/chatList"
        >消息</van-tabbar-item
      >
      <van-tabbar-item replace icon="friends-o" to="/friend"
        >朋友</van-tabbar-item
      >
      <van-tabbar-item replace icon="smile-o" to="/cc">社交</van-tabbar-item>
      <van-tabbar-item replace icon="contact" to="/dd">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts" setup name="Layout">
import { ref, onActivated, onDeactivated } from 'vue'
import { useRoute } from 'vue-router'
import socket from '@/socket'
import useStore from '@/store'
const { user } = useStore()
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
    text: '离线',
    value: 0,
    color: 'var(--leave-color)'
  }
])


const route = useRoute()

const touchAvatar = (e: TouchEvent) => {
  const pressTime = setTimeout(() => {
    showSatusBoader.value = !showSatusBoader.value
  }, 2000)
  e.target?.addEventListener('touchend', () => {
    clearTimeout(pressTime)
  })
}

const selectStatus = (item: any) => {
  if(item.value === user.stautes) return
  console.log(item)
  statusColor.value = item.color
  statusText.value = item.text

  if(item.value === 0) {
    console.log('离线');
    user.changeStautes(0)
    socket.disconnect()
  }else {
    socket.connect()
  }
}

onDeactivated(() => {
  showSatusBoader.value = false
})

onActivated(() => {
  if(user.stautes === 0) {
    statusColor.value = 'var(--leave-color)'
    statusText.value = '离线'
  }else {
    statusColor.value = 'var(--online-color)'
    statusText.value = '在线'
  }
})
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
