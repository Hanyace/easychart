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
            v-for="(item, index) in userInfoList"
            :key="index"
          >
            <template #title>
              <div class="infoTit">{{ item.title }}</div>
              <div class="infoCnt" v-if="index == 2">{{ item.cnt }}岁</div>
              <div class="infoCnt" v-else>{{ item.cnt }}</div>
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
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import bg from '@/assets/images/bg.jpg'
import { search_user_by_id_api } from '@/api/user'
import type { UserInfo } from '@/types/user'
import useStore from '@/store'

const router = useRouter()
const route = useRoute()
const { temp } = useStore()
const height = ref(0)
const blur = ref(5)
const findInfo = ref<UserInfo>()
const userStyle = ref({
  background: `url(${bg}) no-repeat center center fixed`,
  backgroundSize: 'cover',
  // 模糊
  filter: `blur(${blur.value}px)`
})
const userInfoList = reactive([
  {
    title: '昵称',
    cnt: '--'
  },
  {
    title: '性别',
    cnt: '?'
  },
  {
    title: '年龄',
    cnt: 0
  },
  {
    title: '地区',
    cnt: '--'
  },
  {
    title: '个性签名',
    cnt: '暂无'
  }
])

const anchors = reactive([
  100,
  Math.round(0.4 * window.innerHeight),
  Math.round(0.88 * window.innerHeight)
])

const addFriend = () => {
  temp.setTempUserInfo(findInfo.value!)
  router.push({
    name: 'AddUser',
    params: {
      id: route.params.id,
      username: userInfoList[0].cnt,
    }
  })
} 

onMounted( async() => {
 const { data: {data: userInfo} } =  await search_user_by_id_api(route.params.id as string)
  userInfoList[0].cnt = userInfo.userName
  userInfoList[1].cnt = userInfo.sex?'女':'男'
  userInfoList[2].cnt = userInfo.age
  userInfoList[3].cnt = userInfo.city || '未知'
  userInfoList[4].cnt = userInfo.discription
  findInfo.value = userInfo
})
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
