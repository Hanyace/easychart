<template>
  <div id="User" class="fadeIn">
    <!-- 用户信息页 -->
    <van-button
      icon="arrow-left"
      type="primary"
      class="returnBtn"
      @touchstart="router.back()"
    />
    <van-button
      icon="plus"
      type="primary"
      class="addBtn"
      @touchstart="addFriend"
    />
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
    <van-floating-panel
      :anchors="anchors"
      v-model:height="height"
      style="border-radius: 50px"
    >
      <div style="text-align: center; padding: 15px">
        <van-cell-group>
          <van-cell
            :border="false"
            v-for="(item, index) in userinfo"
            :key="index"
          >
            <template #title>
              <div class="infoTit">{{ item.title }}</div>
              <div class="infoCnt">{{ item.cnt }}</div>
            </template>
          </van-cell>
          <van-divider content-position="left">图集</van-divider>
          <van-grid :border="false" :column-num="3">
            <van-grid-item>
              <van-image
                src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
              />
            </van-grid-item>
            <van-grid-item>
              <van-image
                src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg"
              />
            </van-grid-item>
            <van-grid-item> </van-grid-item>
          </van-grid>
        </van-cell-group>
      </div>
    </van-floating-panel>
  </div>
  <div :style="userStyle" class="userbg"></div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import bg from '@/assets/images/bg.jpg'

const router = useRouter()
const height = ref(0)
const blur = ref(5)
const userStyle = ref({
  background: `url(${bg}) no-repeat center center fixed`,
  backgroundSize: 'cover',
  // 模糊
  filter: `blur(${blur.value}px)`
})
const userinfo = reactive([
  {
    title: '昵称',
    cnt: 'Han'
  },
  {
    title: '性别',
    cnt: '男'
  },
  {
    title: '年龄',
    cnt: '18岁'
  },
  {
    title: '地区',
    cnt: '广东'
  },
  {
    title: '个性签名',
    cnt: '很懒什么都没写'
  }
])

const anchors = reactive([
  100,
  Math.round(0.4 * window.innerHeight),
  Math.round(0.88 * window.innerHeight)
])

const addFriend = () => {
  router.push({
    name: 'AddUser',
    params: {
      id: 1,
      username: 'Han'
    }
  })
}
</script>

<style lang="less" scoped>
#User {
  // 圆形暗角黑色遮罩
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.9) 100%
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

.returnBtn,.addBtn {
  position: fixed;
  top: 20px;
  z-index: 3;
  width: 40px;
  height: 40px;
  border: 0;
  background: transparent;
  .van-icon {
    font-size: 20px;
    color: var(--font-color);
  }
}
.returnBtn {
  left: 20px;
}
.addBtn {
  right: 20px;
}
</style>
