import sql from "mssql";
import config from "../config";

const dbConfig = {
  user: config.dbUser,
  password: config.dbPwd,
  server: config.dbSrv,
  database: config.dbName,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export async function getConnection() {
  try {
    const pool = await sql.connect(dbConfig);
    return pool;
  } catch (error) {
    console.error(error);
  }
}

export {sql};
