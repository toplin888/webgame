export interface GameInfo {
    value1?: number | string
    value2?: number | string
    value3?: number | string
    value4?: number | string
    value5?: number | string
    value6?: number | string
    [key: string]: any
}

export interface GameTranslation {
    name?: string
    description?: string
    [key: string]: any
}

interface GameInfo {
    value1: number | string
    value2: number | string
    value3: number | string
    value4: number | string
    value5: number | string
    value6: number | string
    game_id?: number | string
}

export interface GameData {
    game?: GameInfo
    game_translation?: GameTranslation
    [key: string]: any
}

export interface TableRowType {
    id: string
    name: string
    amount: number
    multiplier: string
    icon: string
    reward: string
    extra: string
    start: string
    end: string
    hash: string
    op: string
    status: number
}