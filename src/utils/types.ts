export interface User {
    id: number
    username: string
}

export interface TodoEntry {
    id: number,
    userId: number,
    completed: boolean,
    content: string
}