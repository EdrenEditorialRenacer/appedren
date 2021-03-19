const express = require('express');
const pool = require('../database');
const router = express.Router();
const {isLoggedIn} =require('../lib/auth');
router.get('/add',isLoggedIn, async (req, res) => {
    const autores = await pool.query('SELECT * FROM autores');
    console.log(autores);
    res.render('archiveros/add',{autores});
});

router.post('/add',isLoggedIn, async (req, res) => {
    const { titulo,idautor ,genero, precio, modulos, roles } = req.body;
    const newArchivero = {
        titulo,
        idautor,
        genero,
        precio,
        modulos,
        roles
    }
    console.log(newArchivero);
    await pool.query('INSERT INTO archiveros set ?', [newArchivero]);
    req.flash('success', 'Guardado con Exito!');
    res.redirect('/archiveros');
});

router.get('/',isLoggedIn, async (req, res) => {
    const archiveros = await pool.query('SELECT * FROM archiveros');
    console.log(archiveros);
    res.render('archiveros/list', { archiveros });
});

router.get('/delete/:id',isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM archiveros WHERE id = ?', [id]);
    req.flash('success', "Eliminado con Exito");
    res.redirect('/archiveros');
});

router.get('/edit/:id',isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const archiveros = await pool.query('SELECT * FROM archiveros WHERE id=?', [id]);
    res.render('archiveros/edit', { archivero: archiveros[0] });
});



router.post('/edit/:id',isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { titulo, genero, precio, modulos, roles } = req.body;
    const newArchivero = {
        titulo,
        genero,
        precio,
        modulos,
        roles
    }
    await pool.query('UPDATE archiveros set ? WHERE id = ?', [newArchivero, id]);
    req.flash('success', "Editado con Exito!")
    res.redirect('/archiveros');
});


module.exports = router;