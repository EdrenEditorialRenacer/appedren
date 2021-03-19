const express = require('express');
const pool = require('../database');
const router = express.Router();
const {isLoggedIn} =require('../lib/auth');
const helpers =require('../lib/helpers');
router.get('/add', (req,res) => {
    res.render('users/add');
});

router.post('/add', async (req,res)=>{
    const {username,email,telefono,password,role,pais,idioma } = req.body
    const newUser = {
        username,
        email,
        telefono,
        password,
        role,
        pais,
        idioma
    }
    newUser.password = await helpers.encryptPassword(password);
    await pool.query('INSERT INTO users set ?',[newUser]);
    req.flash('success',"Agregado con Exito");
    res.redirect('/users')
});

router.get('/', async (req,res)=>{
    const users = await pool.query('SELECT * FROM users');
    console.log(users);
    res.render('users/list', { users });
});


router.get('/delete/:id',isLoggedIn, async (req,res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM users WHERE id = ?',[id]);
    req.flash('success',"Eliminado con Exito");
    res.redirect('/users');
});

router.get('/edit/:id',isLoggedIn,async (req,res)=>{
    const { id } = req.params;
     const users= await pool.query('SELECT * FROM users WHERE id=?',[id]);
    res.render('users/edit', {user: users[0]});
});

router.post('/edit/:id',isLoggedIn,async (req,res)=> {
    const {id} =req.params;
    const {username,email,telefono,role,pais,idioma } = req.body
    const newUser = {
        username,
        email,
        telefono,
        role,
        pais,
        idioma
    }
    await pool.query('UPDATE users set ? WHERE id = ?',[newUser,id]);
    req.flash('success',"Editado con Exito!")
    res.redirect('/users');
})

module.exports = router;