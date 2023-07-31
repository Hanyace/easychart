import { createPinia } from "pinia";
import { useUserStore } from './modules/user'
import { useChatListStore } from "./modules/chatList";

export const pinia = createPinia();

export default () => {
    return {
        user: useUserStore(),
        chatList: useChatListStore(),
    }
}

