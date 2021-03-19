const express = require('express');
const pool = require('../database');
const router = express.Router();
const helper =require('../lib/handlebars')
const {isLoggedIn} =require('../lib/auth');

router.get('/add',isLoggedIn, async (req, res) => {
    const archiveros = await pool.query('SELECT * FROM archiveros');
    console.log(archiveros);
    res.render('portadas/add', { archiveros });
});

router.post('/add',isLoggedIn, helper.upload.single('portada'), async (req, res) => {
    const { idarchivero } = req.body;
    const portada= req.file.filename;
    await pool.query('INSERT INTO portadas(portada,idarchivero) values (?,?)', [portada,idarchivero]);
    req.flash('success', 'Guardado con Exito!');
    res.redirect('/portadas');
});

router.get('/',isLoggedIn, async (req, res) => {
    const portadas = await pool.query('SELECT * FROM portadas');
    console.log(portadas);
    res.render('portadas/list', { portadas });
});

module.exports = router;