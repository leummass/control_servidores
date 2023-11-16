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

export const addDetalleServidor = async (req, res) => {
  const { IdServidor, IpDireccion, Dns, Tipo, NoVersion, Estatus, Hostname,
  SistemaOperativo, VersionSO, VersionBD, NoColaborador } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("IdServidor", sql.Int, IdServidor)
      .input("IpDireccion", sql.VarChar, IpDireccion)
      .input("Dns", sql.VarChar, Dns)
      .input("Tipo", sql.VarChar, Tipo)
      .input("NoVersion", sql.VarChar, NoVersion)
      .input("Estatus", sql.VarChar,  Estatus)
      .input("Hostname", sql.VarChar, Hostname)
      .input("SistemaOperativo", sql.VarChar, SistemaOperativo)
      .input("VersionSO", sql.VarChar, VersionSO)
      .input("VersionBD", sql.VarChar, VersionBD)
      .input("NoColaborador", sql.Int, NoColaborador)
      .query("EXEC sp_GuardarDetalleServidor @IdServidor, @IpDireccion, @Dns, @Tipo, @NoVersion, @Estatus, @Hostname, @SistemaOperativo, @VersionSO, @VersionBD, @NoColaborador");
      res.json("Detalle servidor agregado con éxito")
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};