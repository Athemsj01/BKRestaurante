const express = require('express');
const router = express.Router();

const connection = require('../connection');

router.get('/todos_los_meseros',async(req,res) => //Función asincrona
{
    try
    {
        const query = 'SELECT * FROM mesero';
        const meseros = await connection.query(query);
        res.json(meseros);
    }
    catch(error)
    {
        return res.json({error: error});
    }
});
router.post('/eliminar_mesero',async(req,res) =>
{
    try
    {
        const mesero_id = req.body.mesero_id;
        const query = 'DELETE FROM mesero WHERE mesero_id = ?';
        const result = await connection.query(query, [mesero_id]);
        res.json('ok');
    }
    catch(error)
    {
        return res.json({error: error});
    }
});

router.post("/nuevo_mesero",async(req,res) =>
{
    try
    {
        const body= req.body;
        const query = "INSERT INTO mesero (mesero_nom,mesero_ap_pat,mesero_ap_mat,mesero_telefono,mesero_correo,mesero_disponible) VALUES (?,?,?,?,?,?)";
        await connection.query(query, [body.mesero_nom,body.mesero_ap_pat,body.mesero_ap_mat,body.mesero_telefono,body.mesero_correo,body.mesero_disponible]);
        res.json('ok');
    }
    catch(error)
    {
        return res.json({error: error});
    }
});
router.get('/meseros_disponibles',async(req,res) => //Función asincrona
{
    try
    {
        const query = "SELECT * FROM mesero WHERE mesero_disponible = 'D'";
        const meseros = await connection.query(query);
        res.json(meseros);
    }
    catch(error)
    {
        return res.json({error: error});
    }
});
router.get('/leer_det_orden/:mesero_id/:mesero_fecha',async (req,res) =>
{
    try
    {
        const ordenes_por_mesero = req.params.ordenes_por_mesero;
        const query = 'SELECT COUNT(*) AS ordenes_por_mesero '+
        'FROM cliente AS c, mesero AS m ' +
        'WHERE c.cli_mesero_id = ? ' +
        'AND c.cli_fecha = ?';
        const ordenes = await connection.query(query, [ordenes_por_mesero]);
        res.json(ordenes);
    }
    catch(error)
    {
        return res.json({error: error});
    }
});

module.exports = router;