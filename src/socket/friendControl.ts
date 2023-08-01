import type { Socket } from 'socket.io-client';
import { showSuccessToast, showFailToast, showToast } from 'vant'


// 监听好友请求

/**
*  规定返回的Type
* 0.主动添加
* 1.被添加
* 2.删除好友
* 3.拉黑好友
* 4.修改好友分组
* 5.修改好友备注
* 6.已经是好友了
* 7.通过验证
* 8.添加错误
* 9.删除错误
* 10.拉黑错误
* 11.通过验证错误
* 12.被通过验证
 */
export const friendControl = (socket: Socket) => {
    socket.on('friendControl', (data: any) => {
        switch (data.type) {
            case 2:  // 删除好友
            case 3:  // 拉黑好友
            case 6:  // 已经是好友了
            case 7:  // 通过验证
            case 8:  // 添加错误
            case 9:  // 删除错误
            case 10: // 拉黑错误
            case 11: // 通过分组错误
            case 12: // 被通过验证
                showToast({
                    message: data.message,
                    wordBreak: 'break-word',
                    position: 'bottom',
                })
                break;
            case 0:  // 主动添加
            default:
                break;
        }
    })
}