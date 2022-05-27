import DATA_SOURCES from '../../../../../config/vars.config'
import { DataSource } from 'typeorm'
import { Company } from '../../../../company/infrastructure/repository/mysql/Company.orm-entity'

const dataSource = DATA_SOURCES.mySqlDataSource

const AppDataSource = new DataSource({
  type: 'mysql',
  host: dataSource.DB_HOST,
  port: dataSource.DB_PORT,
  username: dataSource.DB_USER,
  password: dataSource.DB_PASSWORD,
  database: dataSource.DB_DATABASE,
  entities: [Company],
  migrations: ['./migrations/**.ts'],
  synchronize: true,
  logging: false,
})

export default AppDataSource
