const { Router } = require('express');

const { query } = require('../db');

const router = Router();

  //Listar todos los sensores activos
router.get('/', async (req, res) => {

  try {
    const responseBD = await query("SELECT * FROM sensors WHERE deleted = 'activo';");
      return res.json({
        activeSensorsList: responseBD.rows
      });
  } catch(exception) {
      return res.json({ 
        success: false,
        sensorsList: [],
        error: exception
      });
  }
});

  //Insertar un sensor
router.post('/', async (req, res) => {

try {
  const { name, deleted } = req.body;

  if (!name, !deleted) {
      return res.json({
        success: false,
        message: 'Missing data'
      });
    };

  await query('INSERT INTO sensors (name, deleted) VALUES ($1, $2)',
    [name, deleted]
  );  
  const responseBD = await query("SELECT * FROM sensors ;");

  return res.json({ 
    success: true,
    sensorsList: responseBD.rows
  });

} catch(exception) {
      return res.json({ 
        success: false,
        sensorsList: [],
        error: exception
      });
    }
});

  //Dado un id actualizar el estado de la columna deleted
  router.delete('/:Id', async (req, res) => {
    try {
      const Id = req.params.Id;
      
      await query("UPDATE sensors SET deleted = 'activo' WHERE id = $1", [Id]);
  
      const responseSensors = await query("SELECT * FROM sensors WHERE deleted = 'activo' AND id = $1;", [Id]);
  
      return res.json({ 
        success: true,
        deletedSensors: responseSensors.rows
      });
    } catch(exception) {
      return res.json({ 
        success: false,
        deletedSensors: [],
        error: exception
      });
    }
  });
  
module.exports = {
  router
}
