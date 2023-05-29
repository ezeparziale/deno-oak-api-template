import { Database, PostgresConnector } from '../deps.ts'
import {
  POSTGRES_DB,
  POSTGRES_HOSTNAME,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from '../configs/general.config.ts'

const connector = new PostgresConnector({
  database: POSTGRES_DB,
  host: POSTGRES_HOSTNAME,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: POSTGRES_PORT,
})

const db = new Database(
  connector,
)

export default db
