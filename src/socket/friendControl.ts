import type { Socket } from 'socket.io-client';
import { showSuccessToast, showFailToast, showToast } from 'vant'
import useStore from '@/store';
import socket from './index'
import router from '@/router'

const {
    friendList
} = useStore();

// 监听好友请求

/**
*  规定返回的Type
* 0.主动添加
* 1.被添加
* 2.删除好友
* 3.拉黑好友
* 4.修改好友分组
* 5.修改好友备注
* 6.已经是好友了
* 7.通过验证
* 8.添加错误
* 9.删除错误
* 10.拉黑错误
* 11.通过验证错误
* 12.被通过验证
 */
export const friendControl = (socket: Socket) => {
    socket.on('friendControl', (data: any) => {
        switch (data.type) {
            case 2:  // 删除好友
            case 3:  // 拉黑好友
            case 6:  // 已经是好友了
            case 7:  // 通过验证
            case 8:  // 添加错误
            case 9:  // 删除错误
            case 10: // 拉黑错误
            case 11: // 通过分组错误
            case 12: // 被通过验证
                showToast({
                    message: data.message,
                    wordBreak: 'break-word',
                    position: 'bottom',
                })
                break;
            case 0:  // 主动添加
            case 1:  // 被添加
            case 14:  // 查看

                friendList.getFriendList()
                break;
            default:
                break;
        }
    })
}




// 添加好友
export const sendVerify = (userId: string, friendId: string, addMessage: string) => {
    socket.emit('addFriend', {
        userId,
        friendId,
        addMessage
    })
    showSuccessToast('发送成功')
    router.back()
}

// 通过验证
export const passVerify = (userId: string, friendId: string) => {
    socket.emit('passFriend', {
        userId,
        friendId,
    })
    router.push('/chatList')
}

// 回复验证
export const replyVerify = (userId: string, friendId: string, message: string) => {
    socket.emit('replyFriend', {
        userId,
        friendId,
        message
    })
    showSuccessToast('发送成功')
    router.back()
}

// 拒绝验证
export const refuseVerify = (userId: string, friendId: string) => {
    socket.emit('refuseFriend', {
        userId,
        friendId,
    })
    showSuccessToast('发送成功')
    router.back()
}

// 读取验证
export const readVerify = (userId: string, friendId: string) => {
    socket.emit('viewFriend', {
        userId,
        friendId,
    })
    showSuccessToast('发送成功')
}