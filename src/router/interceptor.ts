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
    next()
})