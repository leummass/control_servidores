import {config} from 'dotenv'

config();

export default {
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbPwd: process.env.DB_PWD,
    dbSrv: process.env.DB_SRV,
    dbName: process.env.DB_NAME
}