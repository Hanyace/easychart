import type { Socket } from 'socket.io-client';
import useStore from '@/store';


const {
    chatList
} = useStore();


export const chatListListen = (socket: Socket) => {
    socket.on('chartList', (data: any) => {
        const { friendId,
            lastMessage,
            messageType,
            messageTime } = data
        chatList.changeListById(friendId, item => {
            item.lastMessage = lastMessage
            item.messageType = messageType
            item.lastTime = messageTime
            return item
        })
    })
}