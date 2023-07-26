<template>
  <div id="User">
    <!-- 用户信息页 -->
    <div class="avatar">
      <van-image
        round
        fit="cover"
        class="avatarbox"
        :style="{
          top: 300 - height + 'px',
          transform: `translateX(-50%) scale(${
            (300 - height) / 200 < 0 ? 0 : (300 - height) / 150
          })`
        }"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
    </div>
    <van-floating-panel v-model:height="height" style="border-radius: 50px;">
      <div style="text-align: center; padding: 15px">
        <van-cell-group>
          <van-cell :border="false">
            <template #title>
              <div class="infoTit">昵称</div>
              <div class="infoCnt">Han</div>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </van-floating-panel>
  </div>
  <div :style="userStyle" class="userbg">
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import bg from '@/assets/images/bg.jpg'

const height = ref(0)
const blur = ref(5)
const userStyle = ref({
  background: `url(${bg}) no-repeat center center fixed`,
  backgroundSize: 'cover',
  // 模糊
  filter: `blur(${blur.value}px)`,
})
</script>

<style lang="less" scoped>
#User {
  // 圆形暗角黑色遮罩
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, .9) 100%
  );
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 2;
  width: 100vw;
  .avatarbox {
    position: absolute;
    left: 50%;
    width: 120px;
    height: 120px;
    .van-image {
      // border: 1px solid var(--border-color);
      // box-shadow: 1px 1px 10px var(--border-color);
      vertical-align: middle;
    }
  }
  .van-cell {
    text-align: left;
    .infoTit {
      font-size: 12px;
      color: var(--font-color-sub2);
    }
    .infoCnt {
      font-size: 18px;
      font-weight: bold;
      color: var(--font-color);
    }
  }
}
.userbg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
</style>
