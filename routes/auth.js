const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn ,authRole} = require('../lib/auth');

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/home',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/home', isLoggedIn, (req, res) => {
    res.render('home');
});

router.get('/contacto', (req, res) => {
    res.render('contacto');
});

router.get('/comentarios', (req, res) => {
    res.render('comentarios/add');
});

router.post('/comentarios', isLoggedIn, async (req, res) => {
    const { asunto, comentario, iduser } = req.body;

    const newComentario = {
        asunto,
        comentario,
        iduser
    }
    newComentario.iduser = user.id;

    await pool.query('INSERT INTO comentarios set ?', [newComentario]);
    req.flash('success', "Comentario Enviado con Exito");
    res.redirect('/home');



});

router.get('/mensajes',isLoggedIn,authRole('admin'),async (req, res) => {
    const comentarios = await pool.query(`SELECT c.asunto, c.comentario, u.username,u.telefono,u.email FROM comentarios c 
    INNER JOIN users u ON c.iduser = u.id
  `);
    res.render('comentarios/list', { comentarios });
})



router.get('/logout', (req, res) => {

    req.logOut();

    res.redirect('/')
});


module.exports = router;