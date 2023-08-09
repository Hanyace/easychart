import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
dayjs.extend(isBetween)

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
        const now = dayjs();
        const yesterday = now.subtract(1, 'day').startOf('day');
        const beforeYesterday = now.subtract(1, 'day').endOf('day');
        // 如果是昨天显示'昨天'
        if (dayjs(date).isBetween(yesterday, beforeYesterday)) {
            return '昨天' + dayjs(date).format('HH:mm')
        }
        // 如果是前天显示距今时间
        if (dayjs(date).isBefore(dayjs().subtract(2, 'day'), 'day')) {
            return dayjs(date).format('MM-DD HH:mm')
        } else {
            // 如果是今天显示具体时间
            return dayjs(date).format('HH:mm')
        }
    } else {
        return '---'
    }
}