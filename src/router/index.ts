import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: 'Layout',
            component: () => import('v/Layout/index.vue'),
            meta: {
                keepAlive: true,
                cacheList: ['ChatList']
            },
            children: [
                // 默认
                {
                    path: "chatList",
                    name: "ChatList",
                    component: () => import('v/ChatList/index.vue'),
                    meta: {
                        keepAlive: true,
                    },
                },
                {
                    path: "friend",
                    name: "Friend",
                    component: () => import('v/FriendList/index.vue'),
                }
            ]
        },
        {
            path: "/login",
            name: "Login",
            component: () => import('v/Login/index.vue')
        },
        {
            path: "/register",
            name: "Register",
            component: () => import('v/Register/index.vue')
        },
        {
            path: "/test",
            name: "Test",
            component: () => import('v/Test/index.vue')
        },
        {
            path: "/chart/:id",
            name: "Chart",
            component: () => import('v/Chart/index.vue')
        },
        {
            path: "/search",
            name: "Search",
            component: () => import('v/Search/index.vue')
        },
        {
            path: "/user/:id",
            name: "User",
            component: () => import('v/User/index.vue'),
        },
        {
            path: "/addUser/:id/:username",
            name: "AddUser",
            component: () => import('v/User/child/AddUser.vue'),
        },
        {
            path: "/newFriend",
            name: "NewFriend",
            component: () => import('v/FriendList/child/newFriend.vue'),
        },
        {
            path: "/verify/:friendId",
            name: "Verify",
            component: () => import('v/FriendList/child/verifyDetail.vue'),
        }
    ]
});

export default router;