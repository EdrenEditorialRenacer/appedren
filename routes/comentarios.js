const express = require('express');
const pool = require('../database');
const router = express.Router();
const { isLoggedIn, authRole } = require('../lib/auth');

router.get('/add', (req, res) => {
    res.render('comentarios/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { asunto, comentario, iduser } = req.body;

    const newComentario = {
        asunto,
        comentario,
        iduser
    }
   

    await pool.query('INSERT INTO comentarios set ?', [newComentario]);
    req.flash('success', "Comentario Enviado con Exito");
    res.redirect('/home');



});

router.get('/respuestas/:id',isLoggedIn,authRole('admin'),async (req, res) => {
    const { id } = req.params;
    const respuestas = await pool.query(`SELECT r.respuesta, r.iduser FROM respuestas r WHERE r.iduser = `+id+`
  `);
    res.render('comentarios/list', { respuestas });
});

module.exports = router;