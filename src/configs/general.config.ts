import { load } from '../deps.ts'

const env = await load()

export const PORT: number = Number(env['PORT']) || 3000
