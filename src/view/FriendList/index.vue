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
      <van-cell
        center
        title="新的朋友"
        @click="router.push('NewFriend')"
        label="快来看看有谁吧"
      >
        <template #value>
          <span v-if="badge > 0" class="badge">{{ badge }}</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="好友分组">
      <van-collapse v-model="activeNames">
        <van-collapse-item
          v-for="(item, index) in friendList.groupList"
          :key="index"
          :title="item.name"
          :name="item.index"
        >
          代码是写出来给人看的，附带能在机器上运行。
        </van-collapse-item>
      </van-collapse>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useStore from '@/store'

const { friendList } = useStore()
const router = useRouter()

const badge = ref(friendList.getUnreadCount)
const activeNames = ref([0])
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
