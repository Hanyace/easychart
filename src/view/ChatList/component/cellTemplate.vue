<template>
  <div id="CellTemplate">
    <van-swipe-cell>
      <van-cell
        @click="
          router.push({
            name: 'Chart',
            params: {
              id: friendId._id
            }
          })
        "
      >
        <template #title>
          <div class="left">
            <!-- 头像 -->
            <van-image round class="avatar" :src="avatar" />
            <!-- 用户信息 -->
            <div class="userinfo">
              <div class="username">{{ friendId.userName }}</div>
              <div class="message ellipsis-1">{{ message }}</div>
            </div>
          </div>
        </template>
        <template #value>
          <div class="right">
            <!-- 时间 -->
            <div class="time">{{ formatFromNow(time) }}</div>
            <!-- 消息数 -->
            <div v-if="badge > 0" class="badge">{{ badge }}</div>
          </div>
        </template>
      </van-cell>
      <template #right>
        <van-button square style="height: 100%" type="primary" text="置顶" />
        <van-button
          square
          style="height: 100%"
          type="danger"
          @touchstart="del(friendId._id)"
          text="删除"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script lang="ts" setup>
import type { CellTemplateProps } from '@/types/cellTemplate'
import { useRouter } from 'vue-router'
import { formatFromNow } from '@/hook/timeFilter'

withDefaults(defineProps<CellTemplateProps>(), {
  badge: 0,
  avatar: 'https://img.yzcdn.cn/vant/cat.jpeg'
})

const emit = defineEmits(['delChatItem'])
const router = useRouter()
const del = (friendId: string) => {
  emit('delChatItem', friendId)
}
</script>

<style lang="less" scoped>
#CellTemplate {
  .left {
    display: flex;
    align-items: center;
    padding: 0;
    gap: 10px;
    height: 100%;
    .avatar {
      width: 45px;
      height: 45px;
    }
    .userinfo {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      .username {
        font-size: 13px;
      }
      .message {
        font-size: 12px;
        width: 200px;
        color: #999;
        line-height: 1.2;
        height: fit-content;
      }
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    height: 100%;
    .time {
      font-size: 12px;
      color: #999;
    }
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
}
</style>
