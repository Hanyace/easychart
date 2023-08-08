import type { ChatList } from '@/types/user';
import { defineStore } from 'pinia'
import { user_chatList_api } from '@/api/user'
import { CellTemplateProps } from '@/types/cellTemplate';

export const useChatListStore = defineStore('chatList', {
    state: () => ({
        chatList: [] as ChatList[]
    }),
    getters: {
        getLength: (state) => {
            return state.chatList.length
        },
        getCellList: (state) => {
            return state.chatList.map((item: ChatList) => {
                return {
                    message: item.lastMessage,
                    time: item.lastTime,
                    badge: item.messageNum,
                    friendId: item.friendId
                } as CellTemplateProps
            })
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
        },
        changeListById(friendId: string, cb: ((data: ChatList) => ChatList)) {
            const index = this.chatList.findIndex(v => v.friendId._id == friendId)
            console.log(index);

            if (index != -1) {
                this.chatList[index] =
                    cb(this.chatList[index])
            } else {
                console.error('changeListById:查询不到此friendId')
                this.getChatList()
            }
        },
        removeListById(friendId: string) {
            const index = this.chatList.findIndex(v => v.friendId._id == friendId)
            if (index != -1) {
                this.chatList.splice(index, 1)
            } else {
                console.error('removeListById:查询不到此friendId')
            }
        },
        clearChatList() {
            this.chatList = []
        }
    }
})