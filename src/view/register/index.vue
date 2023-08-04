<template>
  <div id="Register">
    <div class="registerTit">Register</div>
    <van-form @submit="register">
      <van-tabs v-model:active="active">
        <van-tab title="注册"
          ><van-cell-group v-if="active===0" style="border-radius: 10px; overflow: hidden">
            <van-field
              label-align="top"
              v-model="userName"
              name="userName"
              label="用户名"
              placeholder="用户名"
              :rules="[
                { required: true, message: '请填写用户名' },
                {
                  validator: userNameValidator,
                  message: '请输入2-10字符的用户名'
                }
              ]"
            />
            <van-field
              label-align="top"
              v-model="password"
              type="password"
              name="password"
              label="密码"
              placeholder="密码"
              :rules="[
                { required: true, message: '请填写密码' },
                {
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message: '密码需大于6位且包含数字和字母'
                }
              ]"
            />
            <van-field
              label-align="top"
              v-if="password"
              v-model="rePassword"
              type="password"
              label="重新输入密码"
              placeholder="密码"
              :rules="[
                { required: true, message: '请重新填写密码' },
                {
                  validator: () => {
                    if (rePassword != password) {
                      return false
                    } else {
                      return true
                    }
                  },
                  message: '两次输入的密码不相同'
                }
              ]"
            />
            <van-field
              label-align="top"
              v-model="email"
              name="email"
              label="邮箱"
              placeholder="邮箱"
              :rules="[
                { required: true, message: '请填写邮箱' },
                {
                  pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                  message: '请输入正确格式的邮箱'
                }
              ]"
            />
            <van-field
              label-align="top"
              v-model="phone"
              name="tel"
              label="手机号"
              placeholder="手机号"
              :rules="[
                { required: true, message: '请填写手机号' },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '请输入正确格式的手机号'
                }
              ]"
            />
            <van-field label-align="top" name="sex" label="性别">
              <template #input>
                <van-radio-group v-model="sex" direction="horizontal">
                  <van-radio :name="0">男</van-radio>
                  <van-radio :name="1">女</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field
              label-align="top"
              v-model="birthday"
              is-link
              readonly
              name="birthday"
              label="生日"
              placeholder="点击选择日期"
              @click="showPicker = true"
            />
            <van-field
              label-align="top"
              v-model="city"
              is-link
              readonly
              name="city"
              label="地址"
              placeholder="点击选择省市区"
              @click="showArea = true"
            />
            <van-field
              label-align="top"
              v-model="discription"
              name="discription"
              rows="2"
              autosize
              label="个性签名"
              type="textarea"
              maxlength="50"
              placeholder="请输入个性签名"
              show-word-limit
            /> </van-cell-group
        ></van-tab>
        <van-tab title="验证">
          <van-cell-group v-if="active===1" style="border-radius: 10px; overflow: hidden">
            <van-field
              label-align="top"
              v-model="email2"
              name="email"
              label="邮箱"
              placeholder="邮箱"
              :rules="[
                { required: true, message: '请填写邮箱' },
                {
                  pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                  message: '请输入正确格式的邮箱'
                }
              ]"
            />
            <van-field
              label-align="top"
              v-model="registerCode"
              name="registerCode"
              label="验证码"
              placeholder="验证码"
              :rules="[
                { required: true, message: '请填写验证码' },
                {
                  pattern: /^\d{6}$/,
                  message: '验证码需为6位随机数'
                }
              ]"
            />
          </van-cell-group>
        </van-tab>
      </van-tabs>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <van-popup v-model:show="showPicker" position="bottom">
      <van-date-picker
        @confirm="onConfirmBirthday"
        @cancel="showPicker = false"
        :min-date="new Date('1900-01-01')"
        :max-date="new Date()"
      />
    </van-popup>
    <van-popup v-model:show="showArea" position="bottom">
      <van-area
        :area-list="areaList"
        @confirm="onConfirmAddress"
        @cancel="showArea = false"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { register_api, verify_code_api } from '@/api/register'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
// @ts-ignore
import { areaList } from '@vant/area-data'
import { showToast } from 'vant'

const router = useRouter()
const userName = ref('')
const password = ref('')
const rePassword = ref('')
const sex = ref(0)
const birthday = ref('')
const showPicker = ref(false)
const discription = ref('')
const city = ref('')
const email = ref('')
const email2 = ref('')
const phone = ref('')
const registerCode = ref('')
const active = ref(0)
const onConfirmBirthday = ({ selectedValues }: any) => {
  birthday.value = selectedValues.join('-')
  showPicker.value = false
}

const showArea = ref(false)
const onConfirmAddress = ({ selectedOptions }: any) => {
  showArea.value = false
  city.value = selectedOptions.map((item: any) => item.text)[0]
}

const userNameValidator = (value: string) => {
  const minLength = 2
  const maxLength = 10
  if (value.length < minLength || value.length > maxLength) {
    return false
  } else {
    return true
  }
}

const register = async (data: any) => {
  console.log(data)
  if (!active.value) {
    const res = await register_api(data)
    showToast(res.data.msg)
    if(res.data.code == 200) {
      active.value = 1
    }
  } else {
    const res = await verify_code_api(data)
    showToast(res.data.msg)
    router.push('/login')
  }
}
</script>

<style scoped lang="less">
#Register {
  padding: 20px;
  height: 100vh;
  width: 100vw;
  background-color: #222222;
  .registerTit {
    font-size: 40px;
    font-weight: 700;
    color: #39a9ed;
    text-align: center;
    text-shadow: 0px 0px 5px rgba(57, 168, 237, 0.764),
      0px 0px 10px rgba(57, 168, 237, 0.764);
    margin-bottom: 20px;
  }
}
</style>
