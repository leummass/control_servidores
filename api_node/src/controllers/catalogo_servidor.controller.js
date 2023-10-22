import { getConnection, sql } from "../db/connection";

export const getServidores = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query("select * from Catalogo_servidor");
    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

export const addServidor = async (req, res) => {
  const { id, nombre } = req.body;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("nombre", sql.VarChar, nombre)
      .query("INSERT INTO Catalogo_servidor(id,nombre) VALUES (@id,@nombre)");
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
