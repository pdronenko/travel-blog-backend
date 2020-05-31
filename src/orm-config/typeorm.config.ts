import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db') as any;

const { DB_HOSTNAME, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, TYPEORM_SYNC } = process.env

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: DB_HOSTNAME || dbConfig.host,
  port: DB_PORT || dbConfig.port,
  username: DB_USERNAME || dbConfig.username,
  password: DB_PASSWORD || dbConfig.password,
  database: DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: TYPEORM_SYNC || dbConfig.synchronize
}
