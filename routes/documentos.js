const express = require('express');
const pool = require('../database');
const router = express.Router();
const helper =require('../lib/handlebars')
const {isLoggedIn} =require('../lib/auth');
router.get('/add',isLoggedIn, async (req, res) => {
    const archiveros = await pool.query('SELECT * FROM archiveros');
    console.log(archiveros);
    res.render('documentos/add', { archiveros });
});

router.post('/add',isLoggedIn, helper.mutiPartMiddleware, async (req, res) => {
    const { idarchivero } = req.body;
    const path = req.files.documento.path;

    console.log(path);
    const documento = path.slice(7, 100);

    const newDocumento = {
        documento,
        idarchivero
    }

    await pool.query('INSERT INTO documentos set ?', [newDocumento]);
    req.flash('success', 'Guardado con Exito!');
    res.redirect('/documentos');
});

router.get('/',isLoggedIn, async (req, res) => {
    const documentos = await pool.query('SELECT * FROM documentos');
    console.log(documentos);
    res.render('documentos/list', { documentos });
});

module.exports = router;