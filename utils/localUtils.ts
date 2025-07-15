export function setUserInfo(userInfo: any) {
    if (import.meta.client) {
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
    return null
}

export function getUserInfo() {
    if (import.meta.client) {
        const userInfo = localStorage.getItem('userInfo')
        return userInfo ? JSON.parse(userInfo) : null
    }
    return null
}

export function clearUserInfo() {
    if (import.meta.client) {
        localStorage.removeItem('userInfo')
    }
}


