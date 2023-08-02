import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/user'
import type { Login } from '@/types/login'
import { login_api } from '@/api/login'
import { user_info_api } from '@/api/user'
import { localSave, localRemove, localRead } from 'u/localStorage'
import { showToast } from 'vant'

export const useUserStore = defineStore('user', {
    state: () => ({
        token: localRead('token') || '',
        userInfo: (localRead('userInfo') || {}) as UserInfo ,
        stautes: 0, // 0: 未登录 1: 已登录
    }),
    getters: {
        statutesLabel: (state) => {
            const { stautes } = state
            switch (stautes) {
                case 0:
                    return '未登录'
                case 1:
                    return '已登录'
                default:
                    return '未知'
            }
        }
    },
    actions: {
        async getToken(data: Login) {
            try {
                const { data: loginData } = await login_api(data)
                if (loginData.data) {
                    this.saveToken(loginData.data.token)
                    showToast('登录成功')
                } else {
                    showToast(loginData.msg)
                }
            } catch (error) {
                showToast('登录失败' + error)
                console.log(error)
            }
        },
        saveToken(token: string) {
            localSave('token', token)
            this.token = token
        },
        removeToken() {
            this.token = ''
            localRemove('token')
        },
        
        async getUserInfo() {
            try {
                const { data: userInfoData } = await user_info_api()
                this.saveUserInfo(userInfoData.data)
            } catch (error) {
                console.log(error)
            }
        },
        saveUserInfo(userInfo: UserInfo) {
            localSave('userInfo', userInfo)
            this.userInfo = userInfo
        },
        removeUserInfo() {
            localRemove('userInfo')
            this.userInfo = {} as UserInfo
        },
        changeStautes(stautes: number) {
            this.stautes = stautes
        }
    },
})
