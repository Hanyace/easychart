<template>
  <van-config-provider theme="dark">
    <router-view></router-view>
  </van-config-provider>
</template>

<script setup lang="ts">
import {} from 'vue'
document.documentElement.classList.add('dark')
</script>

<style scoped lang="less"></style>
