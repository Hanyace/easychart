import reuqest from 'u/request'
import type { Response } from '@/types/respones'
import type { UserInfo, ChatList } from '@/types/user'

export const user_info_api = () => {
    return reuqest<Response<UserInfo>>({
        url: '/user/user_info',
        method: 'get',
    })
}

export const user_chatList_api = () => {
    return reuqest<Response<ChatList[]>>({
        url: '/user/chat_list',
        method: 'get',
    })
}