import { createPinia } from "pinia";
import { useUserStore } from './modules/user'
import { useChatListStore } from "./modules/chatList";
import { useTempStore } from "./modules/temp";
import { useFriendListStore } from "./modules/friendList";

export const pinia = createPinia();

export default () => {
    return {
        user: useUserStore(),
        chatList: useChatListStore(),
        temp: useTempStore(),
        friendList: useFriendListStore()
    }
}

