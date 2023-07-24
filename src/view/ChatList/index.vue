<template>
  <div id="ChatList">
    <CellTemplate
      :message="item.message"
      :time="item.time"
      :badge="item.badge"
      :username="item.username"
      v-for="item in messageList"
    />
  </div>
</template>

<script lang="ts" setup>
import CellTemplate from "./component/cellTemplate.vue";
import type { CellTemplateProps } from "@/types/cellTemplate";

import { ref } from "vue";

const messageList = ref<CellTemplateProps[]>([]);

messageList.value = [
    {
        message: "你好",
        time: "下午 14:00",
        badge: 1,
        username: "张三",
    },
    
]
</script>

<style lang="less" scoped>
#ChatList {

}
</style>
