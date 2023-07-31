import { Manager } from 'socket.io-client';
import useStore from '@/store';
import router from '@/router';

const { user } = useStore();

const manager = new Manager("ws://localhost:3000", {
    reconnectionDelayMax: 10000,
    // 设置请求头
    extraHeaders: {
        Authorization: user.token
    },
});

 const socket = manager.socket("/", {
    auth: {
        token: user.token
    }
});

// 默认接收
socket.on('connect', () => {
    user.changeStautes(1);
    console.log('connected');
}
);

socket.on("disconnect", () => {
    user.changeStautes(0);
    console.log('disconnected');
});

socket.on('error', (err: {
    message: string;
    data: any;
}) => {
    console.log(err);
});

socket.on('disconnect_msg', ({ message }: { message: string }) => {
    user.changeStautes(0);
    console.log(message);
    router.push({ name: 'Login' });
});

export default socket;
