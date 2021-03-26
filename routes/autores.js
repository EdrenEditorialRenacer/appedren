const express = require('express');
const pool = require('../database');
const router = express.Router();
const {isLoggedIn,authRole} =require('../lib/auth');

router.get('/add', (req,res) => {
    res.render('autores/add');
});

router.post('/add',isLoggedIn,authRole('admin'), async (req,res)=>{
    const {autor,facebook,whattsap,email } = req.body
    const newAutor = {
        autor,
        facebook,
        whattsap,
        email
    }
    console.log(newAutor);
    await pool.query('INSERT INTO autores set ?',[newAutor]);
    req.flash('success',"Agregado con Exito");
    res.redirect('/autores')
});

router.get('/',isLoggedIn,authRole('admin'), async (req,res)=>{
    const autores = await pool.query('SELECT * FROM autores');
    console.log(autores);
    res.render('autores/list', { autores });
});


router.get('/delete/:id',isLoggedIn,authRole('admin'), async (req,res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM autores WHERE id = ?',[id]);
    req.flash('success',"Eliminado con Exito");
    res.redirect('/autores');
});

router.get('/edit/:id',isLoggedIn,authRole('admin'),async (req,res)=>{
    const { id } = req.params;
     const autores= await pool.query('SELECT * FROM autores WHERE id=?',[id]);
    res.render('autores/edit', {autor: autores[0]});
});

router.post('/edit/:id',isLoggedIn,authRole('admin'),async (req,res)=> {
    const {id} =req.params;
    const {autor,facebook,whattsap,email } = req.body
    const newAutor = {
        autor,
        facebook,
        whattsap,
        email
    }
    await pool.query('UPDATE autores set ? WHERE id = ?',[newAutor,id]);
    req.flash('success',"Editado con Exito!")
    res.redirect('/autores');
})

module.exports = router;