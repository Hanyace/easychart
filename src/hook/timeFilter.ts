import dayjs from 'dayjs'

// 格式化日期
export function formatDate(date: string | number) {
    if (date) {
        return dayjs(date).format('YYYY-MM-DD')
    }else {
        return '---'
    }
}