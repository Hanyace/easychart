// 节流
export function throttle(fn: Function, delay: number) {
    let timer: any = null;
    return function () {
        if (!timer) {
            timer = setTimeout(function () {
                fn();
                timer = null;
            }, delay);
        }
    };
}

// 防抖
export function debounce(fn: Function, delay: number) {
    let timer: any = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn();
        }, delay);
    };
}