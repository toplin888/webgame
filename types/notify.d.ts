export interface NotifyItem {
    id: number | string
    title: string
    status: number // 0未读 1已读
    created_at: string | number
    // 可根据实际接口补充其它字段
    [key: string]: any
}