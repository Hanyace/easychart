import type { Socket } from 'socket.io-client';
import useStore from '@/store';


const {
    chatList
} = useStore();

// 1:读取
// 2:删除
// 3:置顶
// 4:取消置顶

export const chatListListen = (socket: Socket) => {
    socket.on('chartList', (data: any) => {
        console.log(data);
        const { friendId,
            lastMessage,
            messageType,
            lastTime,
            messageNum, type } = data
        if (type == 1) {
            chatList.changeListById(friendId, item => {
                item.messageNum = 0
                return item
            })
            return
        }
        if (type == 2) {
            chatList.removeListById(friendId)
            return
        }
        if (type == 3) {
            chatList.changeListById(friendId, item => {
                item.isTop = true
                item.setTopTime = data.setTopTime
                return item
            })
            return
        }
        if (type == 4) {
            chatList.changeListById(friendId, item => {
                item.isTop = false
                item.setTopTime = null
                return item
            })
            return
        }
        chatList.changeListById(friendId, item => {
            console.log(item);
            item.lastMessage = lastMessage
            item.messageType = messageType
            item.lastTime = lastTime
            item.messageNum = messageNum
            return item
        })
    })
}