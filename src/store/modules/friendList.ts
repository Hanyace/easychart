import { defineStore } from "pinia";
import type { Friend, FriendGroup } from "@/types/user";
import { user_friend_list_api, user_group_list_api } from '@/api/user'
import { showToast } from 'vant'

export const useFriendListStore = defineStore("friendManager", {
    state: () => ({
        friendList: [] as Friend[],
        groupList: [] as FriendGroup[],
    }),
    getters: {
        // 已经是好友的列表
        getRealFriendList: (state) => {
            return state.friendList.filter(friend => friend.friendType === 1)
        },
        // 申请中的列表
        getApplyFriendList: (state) => {
            return state.friendList.filter(friend => friend.friendType === 0)
        },
        // 被申请中的列表
        getBeApplyFriendList: (state) => {
            return state.friendList.filter(friend => friend.friendType === 2)
        },
        // 已拒绝的列表
        getRefuseFriendList: (state) => {
            return state.friendList.filter(friend => friend.friendType === 4)
        },
        // 被拒绝的列表
        getBeRefuseFriendList: (state) => {
            return state.friendList.filter(friend => friend.friendType === 5)
        },
        // 拉黑的列表
        getBlackFriendList: (state) => {
            return state.friendList.filter(friend => friend.friendType === 3)
        },
        // 未读个数
        getUnreadCount: (state) => {
            return state.friendList.filter(friend => friend.isView === false).length
        }
    },
    actions: {
        async getFriendList() {
            try {
                const { data } = await user_friend_list_api()
                if (data.data) {
                    this.friendList = data.data
                } else {
                    this.friendList = []
                }
            } catch (error) {
                // console.log(error)
                // showToast('获取好友列表失败' + error)
            }
        },
        async getGroupList() {
            try {
                const { data } = await user_group_list_api()
                if (data.data) {
                    this.groupList = data.data
                } else {
                    showToast('获取分组列表为空')
                }
            } catch (error) {
                // console.log(error)
                // showToast('获取分组列表失败' + error)
            }
        },
        changeFriendType(friendId: string, friendType: number, isView:boolean = true) {
            const index = this.friendList.findIndex(friend => friend.friendId === friendId)
            if (index) {
                this.friendList[index].friendType = friendType
                this.friendList[index].isView = isView
            }
        }
    },
});