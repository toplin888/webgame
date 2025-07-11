export function formatName(name: string) {
    if (!name) return '';
    if (name.length <= 10) return name;
    return name.slice(0, 5) + '...' + name.slice(-5);
}