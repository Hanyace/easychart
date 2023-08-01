import { defineStore } from "pinia";
import type { UserInfo } from "@/types/user";

export const useTempStore = defineStore("temp", {
    state: () => ({
        tempUserInfo: {} as UserInfo,
    }),
    getters: {
    },
    actions: {
        setTempUserInfo(userInfo: UserInfo) {
            this.tempUserInfo = userInfo;
        }
    }
});
