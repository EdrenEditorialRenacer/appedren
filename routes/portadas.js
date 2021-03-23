const express = require('express');
const pool = require('../database');
const router = express.Router();
const helper = require('../lib/handlebars')
const { isLoggedIn,authRole } = require('../lib/auth');
const helpers = require('../lib/helpers');

router.get('/add', isLoggedIn,authRole('admin'), async (req, res) => {
    const archiveros = await pool.query('SELECT * FROM archiveros');
    console.log(archiveros);
    res.render('portadas/add', { archiveros });
});

router.post('/add', isLoggedIn,authRole('admin'),helper.mutiPartMiddleware, async (req, res) => {
    const { idarchivero } = req.body;
    const path = req.files.portada.path;

    console.log(path);
    const portada = path.slice(7, 100);

    const newPortada = {
        portada,
        idarchivero
    }

    console.log(newPortada);
    await pool.query('INSERT INTO portadas set ?', [newPortada]);
    req.flash('success', 'Guardado con Exito!');
    res.redirect('/portadas');
});

router.get('/', isLoggedIn,authRole('admin'), async (req, res) => {
    const portadas = await pool.query('SELECT * FROM portadas');
    console.log(portadas);
    res.render('portadas/list', { portadas });
});

module.exports = router;