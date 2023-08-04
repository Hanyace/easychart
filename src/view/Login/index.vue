<template>
  <div id="Login">
    <van-icon class="login_icon" name="chat-o" size="100" />
    <div class="cnt">
      <van-cell-group inset>
        <van-field
          v-model="loginData.userName"
          label="用户名"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="loginData.password"
          placeholder="请输入用户名"
          type="password"
          label="密码"
        />
      </van-cell-group>
      <van-button style="margin-top: 10px" type="primary" @click="login" block
        >登录</van-button
      >
    </div>
    <div class="toregister" @click="toRejister" >没有账号？去注册></div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import useStore from '@/store'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const { user, friendList, chatList } = useStore()
const loginData = reactive({
  userName: '',
  password: ''
})

const router = useRouter()
const login = async () => {
  try {
    await user.getToken(loginData)
    if (user.token) {
      await user.getUserInfo()
      await friendList.getFriendList()
      await friendList.getGroupList()
      await chatList.getChatList()
      router.push('/chatList')
    }
  } catch (error: any) {
    showToast({
      message: error.message as string
    })
  }
}

const toRejister = () => {
  router.push('/register')
}
</script>

<style scoped lang="less">
#Login {
  // 渐变背景
  background: linear-gradient(90deg, #363636 0%, #3e3e3e 100%);
  height: 100vh;
  .login_icon {
    position: fixed;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
  }
  .cnt {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    width: 80vw;
  }
  .toregister {
    font-size: 12px;
    color: var(--font-color-sub2);
    position: fixed;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
