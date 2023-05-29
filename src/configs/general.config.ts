import { load } from '../deps.ts'

const env = await load()

// Server
export const PORT: number = Number(env['PORT']) || 3000

// Postgres Database
export const POSTGRES_HOSTNAME: string = env['POSTGRES_HOSTNAME']
export const POSTGRES_PORT: number = Number(env['POSTGRES_PORT']) || 5432
export const POSTGRES_PASSWORD: string = env['POSTGRES_PASSWORD']
export const POSTGRES_USER: string = env['POSTGRES_USER']
export const POSTGRES_DB: string = env['POSTGRES_DB']
