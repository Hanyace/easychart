import reuqest from 'u/request'
import type { Response } from '@/types/respones'
import type { UserInfo } from '@/types/user'

export const user_info_api = () => {
    return reuqest<Response<UserInfo>>({
        url: '/user/user_info',
        method: 'get',
    })
}