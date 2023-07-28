<template>
  <van-config-provider theme="dark">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component
          :is="Component"
        />
      </keep-alive>
    </router-view>
  </van-config-provider>
</template>

<script setup lang="ts">

document.documentElement.classList.add('dark')
</script>

<style scoped lang="less"></style>
