const express = require('express');
const pool = require('../database');
const router = express.Router();
const { isLoggedIn, authRole } = require('../lib/auth');

router.get('/add/:iduser', (req, res) => {
    const { iduser } = req.params;
    res.render('respuestas/add',{iduser});
});

router.post('/add', isLoggedIn, async (req, res) => {
   
    const { respuesta,iduser } = req.body;

    const newRespuesta = {
        respuesta,
        iduser
    }
   

    await pool.query('INSERT INTO respuestas set ?', [newRespuesta]);
    req.flash('success', "Respuesta Enviado con Exito");
    res.redirect('/home');



});

router.get('/',isLoggedIn,authRole('admin'),async (req, res) => {
    const { id } = req.params;
    const comentarios = await pool.query(`SELECT c.asunto, c.comentario, c.iduser FROM comentarios c 
                                            INNER JOIN users u ON c.iduser = u.id
  `);
    res.render('respuestas/list', { comentarios });
});

router.get('/comentario/:iduser',isLoggedIn,authRole('admin'), async (req,res) => {
    const { iduser } = req.params;
    const comentarios = await pool.query(`SELECT c.asunto, c.comentario, c.iduser FROM comentarios c 
    INNER JOIN users u ON c.iduser = u.id WHERE c.iduser = `+iduser+`
`);
res.render('respuestas/comentario', {comentario : comentarios[0]});

});

module.exports = router;