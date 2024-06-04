export const debounce_leading = (func: (...args: any) => void, timeout = 300, context: any) => {
    let timer: NodeJS.Timeout | undefined;
    return (...args) => {
        if (!timer) {
            func.apply(context, args);
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = undefined;
        }, timeout);
    };
};
