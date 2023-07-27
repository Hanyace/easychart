<template>
  <div id="FriendList">
    <van-search
      shape="round"
      placeholder="搜索"
      input-align="center"
      @touchstart="touchSearch"
      @click="touchSearch"
    />
    <van-cell-group title="新朋友">
      <van-cell center title="新的朋友" @click="router.push('NewFriend')" label="快来看看有谁吧">
        <template #value>
          <span v-if="badge > 0" class="badge">1</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="好友分组">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="我的好友" name="1">
          代码是写出来给人看的，附带能在机器上运行。
        </van-collapse-item>
        <van-collapse-item title="朋友" name="2">
          技术无非就是那些开发它的人的共同灵魂。
        </van-collapse-item>
        <van-collapse-item title="家人" name="3">
          在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
        </van-collapse-item>
      </van-collapse>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const badge = ref(1)
const activeNames = ref(['1'])
const touchSearch = () => {
  router.push('/search')
}
</script>

<style scoped lang="less">
#FriendList {
  .badge {
    background-color: var(--warning-color);
    color: #fff;
    line-height: 1.2;
    height: fit-content;
    font-size: 12px;
    padding: 0 4px;
    border-radius: 8px;
  }
}
</style>
