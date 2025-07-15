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