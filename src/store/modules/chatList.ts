import type { CellTemplateProps } from '@/types/cellTemplate';
import { defineStore } from 'pinia'
import { localSave, localRead } from 'u/localStorage'

export const useChatListStore = defineStore('chatList', {
    state: () => ({
        chatList: [] as CellTemplateProps[]
    }),
    getters: {
        getChatList(): CellTemplateProps[] {
            return this.chatList;
        }
    },
    actions: {
        setChatList(chatList: CellTemplateProps[]) {
            this.chatList = chatList;
        }
    }
})