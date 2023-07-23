import axios from 'axios';
import { localRead } from './localStorage'
import router from '@/router'

const request = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Add a request interceptor
request.interceptors.request.use(config => {
    // Do something before request is sent
    if (config.url === '/login' || config.url === '/register') {
        return config;
    } else {
        const token = localRead('token');
        if (!token) {
            router.push('/login');
            new Error('缺少token,请重新登录');
        } else {
            // 携带token
            config.headers.Authorization = token
        }
        return config;
    }
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(response => {
    // Do something before response is sent
    return response;
}, error => {
    // Do something with response error
    return Promise.reject(error);
});


export default request;