<template>
  <div>
    注册~
    <input type="text" v-model="userName" />
    <input type="password" v-model="password" />
    <input type="number" v-model="tel" />
    <button @click="register">注册</button>
  </div>
</template>

<script setup lang="ts">
import { register_api } from '@/api/register'
import { ref } from 'vue'
const userName = ref('')
const password = ref('')
const tel = ref('')

const register = async () => {
  const res = await register_api({
    userName: userName.value,
    password: password.value,
    tel: tel.value
  })
    console.log(res)
}
</script>

<style scoped lang="less"></style>
