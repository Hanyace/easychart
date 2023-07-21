import reuqest from 'u/request'
import type { Login, LoginResult } from '@/types/login'

export const login_api = (data: Login) => {
    return reuqest<LoginResult>({
        url: '/login',
        method: 'post',
        data
    })
}