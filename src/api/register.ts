import request from "u/request";
import type { Register } from "@/types/register";

export const register_api = (data: Register) => {
    return request({
        url: "/register",
        method: "post",
        data,
    });
}