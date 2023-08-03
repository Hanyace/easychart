import router from './index'

// 路由守卫
router.beforeEach((to, from, next) => {
    //从cacheList中的任何一个页面返回，当前页面缓存
    const cacheList = to.meta.cacheList as string[]
    if (cacheList) {
        // 缓存数组有当前页面，就缓存
        if (cacheList.indexOf(from.name as string) > -1) {
            to.meta.keepAlive = true
        } else {
            //如果没有纳进cacheList缓存需求，就不缓存
            if (from.name) {
                to.meta.keepAlive = false
            }
            // 导航跳转需要缓存处理
            if (from.meta.cacheList) {
                to.meta.keepAlive = true
            }
        }
    }

    // 如果是登录页或者注册页，就不需要拦截
    if (to.name === 'Login' || to.name === 'Register') {
        next()
    } else {
        // 如果不是登录页，就需要拦截
        // 如果没有token，就跳转到登录页
        if (!localStorage.getItem('token')) {
            next({ name: 'Login' })
        }else {
            next()
        }
    }
})