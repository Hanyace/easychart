<template>
  <div id="Chart">
    <div class="chartHeader">
      聊天

      <van-switch v-model="checked" />
    </div>
    <div class="chartContent" :style="{ marginBottom, paddingBottom: '10px' }">
      <ChartBubble
        v-for="(item, index) in messageList"
        :key="index"
        :avatar="item.avatar"
        :message="item.message"
        :messageDirection="item.messageDirection"
        :status="item.status"
      />
    </div>
    <div class="chartFooter" ref="chartFooter">
      <van-button class="emoji" icon="smile-o" type="primary" />
      <van-field
        v-model="message"
        rows="1"
        :autosize="{
          maxHeight: 100,
        }"
        type="textarea"
        placeholder="Enter you message"
        @update:model-value="onResize"
      />
      <van-button class="send" type="primary" size="small" @click="sendMsg"
        >发送</van-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import ChartBubble from "./component/ChartBubble.vue";
import useStore from "@/store";
import { socket } from "@/socket";

const { user } = useStore();

const message = ref("");
const chartFooter = ref<Element | null>(null);
const marginBottom = ref("");
const checked = ref(false);

const messageList = ref<
  {
    messageDirection: string;
    message: string;
    avatar?: string;
    status?: number;
    sendTime?: number;
  }[]
>([
  {
    messageDirection: "left",
    message: "Hello",
    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    status: 0,
  },
  {
    messageDirection: "right",
    message: "Hi",
    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    status: 0,
  },
]);

const onResize = () => {
  const value = `${chartFooter.value!.clientHeight}px`;
  if (value == marginBottom.value) return;
  marginBottom.value = value;
};

// 发送消息
const sendMsg = () => {
  const sendTime = new Date().getTime();
  socket.emit("singleChart", {
    userId: user.userInfo.userId,
    friendId: !checked.value
      ? "c7eab240-27f2-11ee-a7a2-e35206da0c76"
      : "99b48ea0-27f2-11ee-a7a2-e35206da0c76",
    message: message.value,
    messageType: 0,
    sendTime,
  });
  messageList.value.push({
    messageDirection: "right",
    message: message.value,
    sendTime,
    status: 1,
  });
  message.value = "";
};

// 接收消息
const singleChart = () => {
  socket.on("singleChart", (data: any) => {
    console.log("singleChart");
    console.log(data);
    if (!data.isMe) {
      messageList.value.push({
        messageDirection: "left",
        message: data.message,
      });
    }
  });

  // 发送是否成功
  socket.on("singleChartRes", (data: any) => {
    console.log("singleChartRes");
    console.log(data);
    if (data.fail) {
      messageList.value.find((v) => v.sendTime == data.sendTime)!.status = 2;
    } else {
      messageList.value.find((v) => v.sendTime == data.sendTime)!.status = 0;
    }
  });
};

onMounted(() => {
  onResize();
  singleChart();
});
</script>

<style lang="less" scoped>
#Chart {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .chartHeader {
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: var(--header-color);
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .chartContent {
    width: 100%;
    flex: 1;
    background-color: var(--main-color);
    overflow-y: auto;
  }
  .chartFooter {
    width: 100%;
    min-height: 30px;
    position: fixed;
    bottom: 0;
    padding: 5px 0;
    background-color: var(--header-color);
    box-shadow: 0 -1px 2px 1px var(--sub-color);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .van-field {
      width: 70vw;
      padding: 5px 10px;
      border-radius: 5px;
    }
    .van-button.send {
      width: 15vw;
      height: auto;
      align-self: stretch;
      border-radius: 5px;
      // background: var(--sub-color);
    }
    .van-button.emoji {
      width: 5vw;
      height: 5vh;
      border-radius: 5px;
      background-color: transparent;
      color: var(--font-color-sub);
      border: none;
    }
  }
}
</style>
