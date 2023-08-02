import axios from 'axios';
import { localRead, localRemove } from './localStorage'
import router from '@/router'
import { showLoadingToast, closeToast, showFailToast } from 'vant';


const request = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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
            showFailToast('请重新登录')
            new Error('缺少token,请重新登录');
        } else {
            // 携带token
            config.headers.Authorization = token
        }
        showLoadingToast({
            message: '加载中...',
            forbidClick: true,
        })
        return config;
    }
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(response => {
    // Do something before response is sent
    closeToast()
    if (response.data.code === 401) {
        router.push('/login');
        showFailToast('请重新登录')
        localRemove('token');
        new Error('token过期,请重新登录');
    }
    return response
}, error => {
    // Do something with response error
    showFailToast(error.message)
    return Promise.reject(error);
});


export default request;