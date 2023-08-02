import type { ChatList } from '@/types/user';
import { defineStore } from 'pinia'
import { user_chatList_api } from '@/api/user'

export const useChatListStore = defineStore('chatList', {
    state: () => ({
        chatList: [] as ChatList[]
    }),
    getters: {
        getLength: (state) => {
            return state.chatList.length
        }
    },
    actions: {
        setChatList(chatList: ChatList[]) {
            this.chatList = chatList;
        },
        async getChatList() {
            try {
                const { data } = await user_chatList_api()
                this.setChatList(data.data)
            } catch (error) {
                // console.log(error)
            }
        }
    }
})