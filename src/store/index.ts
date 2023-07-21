import { createPinia } from "pinia";
import { useUserStore } from './modules/user'

export const pinia = createPinia();

export default () => {
    return {
        user: useUserStore()
    }
}

