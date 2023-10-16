import sql from "mssql";

const dbConfig = {
  user: "userprueba",
  password: "123456",
  server: "127.0.0.1",
  database: "ContabilidadNueva1",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function getConnection() {
  try {
    const pool = await sql.connect(dbConfig);
    return pool;
  } catch (error) {
    console.error(error);
  }
}

getConnection();
