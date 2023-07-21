<template>
  <div>
    登录
    <div>
      <input type="text" v-model="loginData.userName" />
      <input type="password" v-model="loginData.password" />
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script setup lang="ts">

import { reactive } from 'vue'
import useStore from '@/store'
import { useRouter } from 'vue-router'
const { user } = useStore()
const loginData = reactive({
  userName: '',
  password: ''
})

const router = useRouter()
const login = async () => {
  await user.getToken(loginData)
  await user.getUserInfo()
  router.push('/test')
  // console.log(user.token);
  // console.log(data)
}
</script>

<style scoped lang="less">
a {
  color: red;
  .color {
    color: red;
  }
}
</style>
