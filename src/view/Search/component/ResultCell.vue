<template>
  <div id="ResultCell">
    <van-cell-group>
      <van-cell value="内容">
        <template #title>
          <!-- 头像 -->
          <van-image
            round
            class="avatar"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </template>
        <template #label>
            <!-- 性别标签 -->
            <van-tag type="primary" round>♂</van-tag>
            <!-- 年龄标签 -->
            <van-tag type="primary" round>18岁</van-tag>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import {} from 'vue'
defineProps({
  active: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped lang="less">
#ResultCell {
    .avatar {
        width: 45px;
        height: 45px;
    }
}
</style>
