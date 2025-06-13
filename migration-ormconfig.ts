import { DataSource } from 'typeorm';
const PROJECT_ROOT = `${process.cwd()}`;

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  migrations: [`${PROJECT_ROOT}/migrations/**/*.ts`],
  migrationsTableName: 'Migrations',
  multipleStatements: true,
});

export { dataSource };
