export function formatName(name: string) {
    if (!name) return '';
    if (name.length <= 10) return name;
    return name.slice(0, 5) + '...' + name.slice(-5);
}


/**
 * 将数字除以 10,000 后，返回带有两位小数的字符串，并使用美式英语的本地化格式。
 *
 * @param num - 要格式化的数字。
 * @returns 格式化后的字符串，保留两位小数。
 */
export function formatLcx(num: number): string {
    const rawLcx = Number(num) || 0
    return (rawLcx / 10000).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}

// 将时间格式化为美式时间在进行本地化,截取出时分秒
export function formatTimeToHMS(timestamp: string | number): string {
    const date = new Date(timestamp)
    const h = String(date.getHours()).padStart(2, '0')
    const m = String(date.getMinutes()).padStart(2, '0')
    const s = String(date.getSeconds()).padStart(2, '0')
    return `${h}:${m}:${s}`
}