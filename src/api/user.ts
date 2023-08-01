import reuqest from 'u/request'
import type { Response } from '@/types/respones'
import type { UserInfo, ChatList, Friend, FriendGroup } from '@/types/user'

export const user_info_api = () => {
    return reuqest<Response<UserInfo>>({
        url: '/user/user_info',
        method: 'get',
    })
}

export const user_chatList_api = () => {
    return reuqest<Response<ChatList[]>>({
        url: '/chartList/get',
        method: 'get',
    })
}

export const user_find_api = (searchTerm: string) => {
    return reuqest<Response<UserInfo[]>>({
        url: '/user/search_user',
        method: 'post',
        data: {
            searchTerm
        }
    })
}

export const search_user_by_id_api = (id: string) => {
    return reuqest<Response<UserInfo>>({
        url: '/user/search_user_by_id',
        method: 'post',
        data: {
            id
        }
    })
}

export const user_friend_list_api = () => {
    return reuqest<Response<Friend[]>>({
        url: '/user/friend_list',
        method: 'get',
    })
}

export const user_group_list_api = () => {
    return reuqest<Response<FriendGroup[]>>({
        url: '/user/group_list',
        method: 'get',
    })
}