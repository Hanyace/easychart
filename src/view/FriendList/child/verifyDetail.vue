<template>
    <div id="verifyDetail" class="fadeIn">
      <van-nav-bar title="验证" left-arrow @click-left="back" />
      <van-cell center label="描述信息">
        <template #title>
          <van-space :size="20">
            <!-- avatar -->
            <van-image
              round
              class="avatarbox"
              fit="cover"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <van-space direction="vertical" fill>
              <div class="username">{{ route.query.username }}</div>
              <div>广东 <van-tag round type="primary">♂</van-tag></div>
            </van-space>
          </van-space>
        </template>
      </van-cell>
      <van-cell-group inset>
        <van-field
          v-model="message"
          rows="2"
          autosize
          label="留言"
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
        <van-space direction="vertical" fill>
          <div></div>
          <van-button style="margin-top:10px" type="primary" block>通过验证</van-button>
          <van-button type="primary" block>回复</van-button>
          <van-button type='danger' block @click="router.back()">拒绝</van-button>
        </van-space>
      </van-cell-group>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  const router = useRouter()
  const route = useRoute()
  console.log(route);
  
  
  const message = ref('')
  const back = () => {
    router.back()
  }
  </script>
  
  <style scoped lang="less">
  #verifyDetail {
    .avatarbox {
      width: 60px;
      height: 60px;
    }
    .username {
      font-size: 16px;
      font-weight: 700;
    }
  }
  </style>
  