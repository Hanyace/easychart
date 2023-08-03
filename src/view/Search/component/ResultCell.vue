<template>
  <div id="ResultCell">
    <van-cell-group>
      <van-cell v-for="(item, index) in dataList" :key="index" @click="toUser(item._id)">
        <template #title>
          <div class="left">
            <!-- 头像 -->
            <van-image
              round
              class="avatar"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <div class="right">
              <div class="tag">
                <!-- 性别标签 -->
                <van-tag type="primary" v-if="item.sex" round>{{ item.sex }}</van-tag>
                <!-- 年龄标签 -->
                <van-tag type="primary" round>{{ item.age || 0 }}岁</van-tag>
              </div>
              <div class="username">{{ item.userName }}</div>
            </div>
          </div>
        </template>
        <template #label>
          <div class="label">个性签名：{{ item.discription }}</div>
        </template>
        <template #value>
          <div class="value">{{ item.city || '未知' }}</div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import {} from "vue";
import { useRouter } from "vue-router";
import type { UserInfo } from "@/types/user";

withDefaults(defineProps<{
  active: number;
  dataList: UserInfo[];
}>(),{
  active: 0,
  dataList: () => [],
})

const router = useRouter();

const toUser = (id: String) => {
  router.push(`/user/${id}`);
};
</script>

<style scoped lang="less">
#ResultCell {
  max-height: calc(100vh - 98px);
  overflow: auto;
  .left {
    display: flex;
    align-items: flex-start;
    gap: 5px;
    .avatar {
      width: 45px;
      height: 45px;
    }
    .right {
      display: flex;
      justify-content: space-between;
      flex: 1;
      flex-direction: column;
      gap: 5px;
      .username {
        font-size: 16px;
        font-weight: bold;
        margin-left: 3px;
      }
      .tag {
        display: flex;
        gap: 5px;
      }
    }
  }
  .label {
    color: #999;
    font-size: 12px;
    font-style: italic;
    width: 80vw;
    transform: scale(0.9);
  }
  .value {
    color: #999;
    font-size: 12px;
  }
}
</style>
