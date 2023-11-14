import { getConnection, sql } from "../db/connection";

export const getDetalleServidorById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id",sql.Int,id)
      .query("EXEC sp_ObtenerListaDetalleServidor @id");
    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};