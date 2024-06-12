import sequelize from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

export default class Database {

    db: string;
    user: string;
    password: string;
    host: string;
    port: number;
    maxPool: number;
    minPool: number;
    database: sequelize.Sequelize;

    constructor() {
        this.db = process.env.DB_NAME || 'heartbeat';
        this.user = process.env.DB_USER || 'postgres';
        this.password = process.env.DB_PASS || 'password';
        this.host = process.env.DB_HOST || 'localhost';
        this.port = Number(process.env.DB_PORT) || 5432;
        this.maxPool = Number(process.env.MAX_POOL) || 10;
        this.minPool = Number(process.env.MIN_POOL) || 1;

        this.database = new sequelize(this.db, this.user, this.password, {
            host: this.host,
            dialect: 'postgres',
            dialectOptions: {
                encrypt: true
            },
            port: this.port,
            logging: false,
            operatorsAliases: false,
            pool: {
                max: this.maxPool,
                min: this.minPool,
                acquire: 30000,
                idle: 10000
            }
        })

        this.database.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });

        this.database.sync({})
    }
}