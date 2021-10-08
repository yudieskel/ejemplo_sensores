const { Router } = require('express');
const { query } = require('../db');

const router = Router();

  //Listar las medidas de un sensor para un id dado
router.get('/:sensorId', async (req, res) => {
    try {
        const sensorId = req.params.sensorId;
        const responseBD = await query('SELECT * FROM measures WHERE sensor_id = $1;', [sensorId]);
    
        if (responseBD.rowCount === 0) {
          return res.json({ 
            success: true,
            message: 'No hay medidas para ese sensor',
            measures: []
          });
        } else {
          return res.json({ 
            success: true,
            measuresList: responseBD.rows
          });
        }
      } catch(exception) {
        return res.json({
          success: false,
          measures: [],
          error: exception
        });
      }
});

 //Agregar una medida a un sensor para un id dada
router.post('/:sensorId', async (req, res) => {

try {
    const { temperature, hour } = req.body;
    const sensorId = req.params.sensorId;

    if (!temperature || !hour) {
        return res.json({
          success: false,
          message: 'Missing data'
        });
      };

    await query('INSERT INTO measures (temperature, hour, sensor_id) VALUES ($1, $2, $3)',
      [temperature, hour, sensorId ]
    );  
    const responseMeasures = await query('SELECT * FROM measures WHERE sensor_id = $1 ORDER BY id desc;', [sensorId]);

      return res.json({ 
        success: true,
        measuresList: responseMeasures.rows
      });
  } catch(exception) {
      return res.json({
        success: false,
        measures: [],
        error: exception
      });
    }
});

 //Listar las medidas de la BD indicando de cada una el sensor al que pertenece
 router.get('/', async (req, res) => {
    try {
        const responseBD = await query('SELECT s.name, m.temperature, m.hour, s.deleted FROM measures m INNER JOIN sensors s ON s.id = m.sensor_id;');
    
        if (responseBD.rowCount === 0) {
            return res.json({ 
              success: true,
              message: 'No hay medidas',
              measures: []
          });
        } else {
          return res.json({ 
            success: true,
            measuresList: responseBD.rows
          });
        }
      } catch(exception) {
        return res.json({
          success: false,
          measures: [],
          error: exception
        });
      }
});

module.exports = {
  router
}
