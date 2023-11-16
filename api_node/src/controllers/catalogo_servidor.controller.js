import { getConnection, sql } from "../db/connection";

export const getServidores = async (req, res) => {
  const { nombre, ipdireccion, tipo} = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Nombre", nombre)
      .input("IpDireccion", ipdireccion)
      .input("Tipo",tipo)
      .query("EXEC sp_ObtenerListaServidores @Nombre, @IpDireccion, @Tipo");
      
    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

export const addServidor = async (req, res) => {
  const { Nombre, Descripcion, Tipo, NoColaborador } = req.body;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("Nombre", sql.VarChar, Nombre)
      .input("Descripcion", sql.VarChar, Descripcion)
      .input("Tipo", sql.VarChar, Tipo)
      .input("NoColaborador", sql.Int, NoColaborador)
      .output("Id", sql.Int)
      .query("EXEC sp_GuardarServidor @Nombre, @Descripcion, @Tipo, @NoColaborador, @Id OUTPUT");
      const outputpar = result.output.Id
      res.json(outputpar)
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

export const getServidorById = async (req, res) => {
  const { id } = req.params;
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("Id", id)
    .query("SELECT * FROM Catalogo_servidor WHERE id = @Id");
  res.send(result.recordset[0]);
};

export const deleteServidorById = async (req, res) => {
  const { id } = req.params;
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("Id", id)
    .query("DELETE FROM Catalogo_servidor WHERE id = @Id");
};

export const updateServidorById = async (req, res) => {
  const { nombre } = req.body;
  const { id } = req.params;

  const pool = await getConnection();
  await pool
    .request()
    .input("nombre", sql.VarChar, nombre)
    .input("id", sql.Int, id)
    .query("UPDATE Catalogo_servidor SET nombre = @nombre where id = @id");
};
