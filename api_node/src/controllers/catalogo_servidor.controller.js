import { getConnection } from "../db/connection";

export const getServidores = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query("select * from Catalogo_servidor");
  console.log(result);

  res.json("servidores");
};
