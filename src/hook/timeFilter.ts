import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

// 格式化日期
export function formatDate(date: string | number) {
    if (date) {
        return dayjs(date).format('YYYY-MM-DD')
    } else {
        return '---'
    }
}

// 格式化距今日期
export function formatFromNow(date: string | number) {

    if (date) {
        // 如果小于一天显示时分
        if (dayjs().diff(dayjs(date), 'day') < 1) {
            return dayjs(date).format('HH:mm')
        }
        return dayjs(date).fromNow()
    } else {
        return '---'
    }
}