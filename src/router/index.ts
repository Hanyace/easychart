import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
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
        }
    ]
});

export default router;