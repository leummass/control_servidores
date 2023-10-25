import { getConnection, sql } from "../db/connection";

export const getServicios = async (req, res) => {
  const { id } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query("SELECT * FROM Catalogo_Servicio");
    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};
