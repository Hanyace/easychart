import request from "u/request";
import type { Register } from "@/types/register";

export const register_api = (data: Register) => {
    return request({
        url: "/register",
        method: "post",
        data,
    });
}

export const verify_code_api = (data: any) => {
    return request({
        url: "/register/verify",
        method: "post",
        data
    });
}