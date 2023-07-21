import { reactive } from 'vue';
import { Manager } from 'socket.io-client';
import useStore from '@/store';

const { user } = useStore();
console.log(user.token);

const manager = new Manager("ws://localhost:3000", {
    reconnectionDelayMax: 10000,
    // 设置请求头
    extraHeaders: {
        Authorization: user.token
    },
});

export const socket = manager.socket("/", {
    auth: {
        token: user.token
    }
});

export const state = reactive({
    connected: false,
    fooEvents: [],
    barEvents: []
});

socket.on('connect', () => {
    state.connected = true;
    console.log('connected');
}
);

socket.on("disconnect", () => {
    state.connected = false;
    console.log('disconnected');
});

socket.on('error', (err: {
    message: string;
    data: any;
}) => {
    console.log(err);
});

socket.on('disconnect_msg', ({ message }: { message: string }) => {
    state.connected = false;
    console.log(message);
});
