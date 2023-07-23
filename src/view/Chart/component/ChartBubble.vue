<template>
  <div id="chartBubble">
    <div :class="messageDirection">
      <van-image round fit="cover" width="40px" height="40px" :src="avatar" />
      <div class="messagecnt">
        <p>{{ message }}</p>
      </div>
      <div class="messagestatus">
        <div v-if="status == 2">
          <van-icon name="warning" color="red" />
        </div>
        <div v-if="status == 1">
          <Spinner :size="10" :line-size="2" :speed="1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import Spinner from "@/component/Spinner.vue";

withDefaults(
  defineProps<{
    messageDirection: string;
    message: string;
    avatar?: string;
    status?: number;
  }>(),
  {
    messageDirection: "left",
    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
  }
);
</script>

<style lang="less" scoped>
#chartBubble {
  width: 100vw;
  padding: 10px;
  .left,
  .right {
    display: flex;
    align-items: flex-start;
  }
  .left {
    .messagecnt {
      margin-left: 10px;
    }
  }
  .right {
    flex-direction: row-reverse;
    .messagecnt {
      margin-right: 10px;
    }
  }

  .messagecnt {
    padding: 10px;
    background: var(--sub-color);
    border-radius: 8px;
    max-width: 65vw;
    margin-top: 10px;
  }
  .messagestatus {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    margin-right: 10px;
    padding-top: 20px;
  }
}
</style>
