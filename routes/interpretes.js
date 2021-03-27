const express = require('express');
const pool = require('../database');
const router = express.Router();
const {isLoggedIn,authRole} =require('../lib/auth');

router.get('/add', (req,res) => {
    res.render('interpretes/add');
});

router.post('/add',isLoggedIn,authRole('admin'), async (req,res)=>{
    const {interprete } = req.body
    const newInterprete = {
        interprete
    }
    
    await pool.query('INSERT INTO interpretes set ?',[newInterprete]);
    req.flash('success',"Agregado con Exito");
    res.redirect('/interpretes')
});

router.get('/',isLoggedIn,authRole('admin'), async (req,res)=>{
    const interpretes = await pool.query('SELECT * FROM interpretes');
   
    res.render('interpretes/list', { interpretes });
});


router.get('/delete/:id',isLoggedIn,authRole('admin'), async (req,res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM interpretes WHERE id = ?',[id]);
    req.flash('success',"Eliminado con Exito");
    res.redirect('/interpretes');
});

router.get('/edit/:id',isLoggedIn,authRole('admin'),async (req,res)=>{
    const { id } = req.params;
     const interpretes= await pool.query('SELECT * FROM interpretes WHERE id=?',[id]);
    res.render('interpretes/edit', {inter: interpretes[0]});
});

router.post('/edit/:id',isLoggedIn,authRole('admin'),async (req,res)=> {
    const {id} =req.params;
    const {interprete } = req.body
    const newInterprete = {
        interprete,
    }
    await pool.query('UPDATE interpretes set ? WHERE id = ?',[newInterprete,id]);
    req.flash('success',"Editado con Exito!")
    res.redirect('/autores');
})

module.exports = router;