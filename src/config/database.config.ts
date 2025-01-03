import sequelize from 'sequelize';

import { appEnvironment, db } from './index';
import { EnvironmentEnum } from '../enums';

class Database {
  public sequelize: sequelize.Sequelize;

  private static instance: Database;

  private dialect: sequelize.Dialect;
  private dbname: string;
  private username: string;
  private password: string;
  private host: string;
  private port: number;
  private maxPool: number;
  private minPool: number;

  private constructor() {
    this.dialect = db.dialect;
    this.dbname = db.name;
    this.username = db.username;
    this.password = db.password;
    this.host = db.host;
    this.port = db.port;
    this.maxPool = db.maxPool;
    this.minPool = db.minPool;

    this.sequelize = new sequelize.Sequelize(this.dbname, this.username, this.password, {
      host: this.host,
      dialect: this.dialect,
      dialectOptions:
        appEnvironment === EnvironmentEnum.prod
          ? {
              ssl: {
                require: true,
                rejectUnauthorized: false,
              },
            }
          : undefined,
      port: this.port,
      logging: false,
      timezone: db.timezone,
      pool: {
        max: this.maxPool,
        min: this.minPool,
        acquire: 5000,
        idle: 0,
        evict: 30000,
      },
      define: {
        timestamps: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  static get(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.info(`🐘 ${db.dialect} database connected at ${db.host}:${db.port}`);
    } catch (error: unknown) {
      console.error(error);
      process.exit(1);
    }
  }
}

const database = Database.get();

export { database as Database };
