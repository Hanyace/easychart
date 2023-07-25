<template>
  <div id="ResultCell">
    <van-cell-group>
      <van-cell v-for="item in 10" :key="item">
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
                <van-tag type="primary" round>♂</van-tag>
                <!-- 年龄标签 -->
                <van-tag type="primary" round>18岁</van-tag>
              </div>
              <div class="username">{{ 'Han' }}</div>
            </div>
          </div>
        </template>
        <template #label>
          <div class="label">个性签名：很懒什么都没写</div>
        </template>
        <template #value>
          <div class="value">广东</div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import {} from "vue";
defineProps({
  active: {
    type: Number,
    default: 0,
  },
});
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
    transform: scale(0.9);
  }
  .value {
    color: #999;
    font-size: 12px;
  }
}
</style>
