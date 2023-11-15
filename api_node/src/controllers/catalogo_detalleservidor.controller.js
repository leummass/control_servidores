import { getConnection, sql } from "../db/connection";

export const getDetalleServidor = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query("select * from Catalogo_DetalleServidor");
    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};