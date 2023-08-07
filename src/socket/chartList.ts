import type { Socket } from 'socket.io-client';
import useStore from '@/store';


const {
    chatList
} = useStore();


export const chatListListen = (socket: Socket) => {
    socket.on('chartList', (data: any) => {
        console.log(data);
        const { friendId,
            lastMessage,
            messageType,
            lastTime,
            messageNum } = data
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