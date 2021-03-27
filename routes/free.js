const express = require('express');
const pool = require('../database');
const router = express.Router();
const {isLoggedIn,authRole} =require('../lib/auth');


router.get('/documento/:id',isLoggedIn,authRole('user_free'),async (req,res) => {
    const { id } =req.params;
    const documentos = await pool.query(`SELECT a.id, a.titulo,u.autor,p.portada,d.documento FROM archiveros a 
    INNER JOIN autores u ON a.idautor = u.id
    INNER JOIN portadas p ON p.idarchivero = a.id
    INNER JOIN documentos d ON d.idarchivero = a.id
    WHERE a.id=?`,[id]);
    res.render('free/documento',{documento:documentos[0]});
});


router.get('/all',isLoggedIn, async (req, res) => {
    res.render('free/all');
});

router.get('/libros',isLoggedIn,authRole('user_free'), async (req, res) => {
    const libros = await pool.query(`SELECT a.id, a.titulo,u.autor,p.portada,d.documento FROM archiveros a 
    INNER JOIN autores u ON a.idautor = u.id
    INNER JOIN portadas p ON p.idarchivero = a.id
    INNER JOIN documentos d ON d.idarchivero = a.id
    WHERE a.modulos = 'libros' AND a.roles = 'free'`);
  
    res.render('free/libros',{libros});
});

router.get('/revistas',isLoggedIn,authRole('user_free'), async (req, res) => {
    const revistas = await pool.query(`SELECT a.id, a.titulo,u.autor,p.portada,d.documento FROM archiveros a 
    INNER JOIN autores u ON a.idautor = u.id
    INNER JOIN portadas p ON p.idarchivero = a.id
    INNER JOIN documentos d ON d.idarchivero = a.id
    WHERE a.modulos = 'revistas' AND a.roles = 'free'`);
  
    res.render('free/revistas',{revistas});
});

router.get('/comics',isLoggedIn,authRole('user_free'), async (req, res) => {
    const comics = await pool.query(`SELECT a.id, a.titulo,u.autor,p.portada,d.documento FROM archiveros a 
    INNER JOIN autores u ON a.idautor = u.id
    INNER JOIN portadas p ON p.idarchivero = a.id
    INNER JOIN documentos d ON d.idarchivero = a.id
    WHERE a.modulos = 'comics' AND a.roles = 'free'`);
  
    res.render('free/comics',{comics});
});

router.get('/musica',isLoggedIn,authRole('user_free'), async (req, res) => {
    const musica = await pool.query(`SELECT a.id, a.titulo,u.autor,p.portada,d.documento,i.interprete FROM archiveros a 
    INNER JOIN autores u ON a.idautor = u.id
    INNER JOIN interpretes i ON a.idinterprete = i.id
    INNER JOIN portadas p ON p.idarchivero = a.id
    INNER JOIN documentos d ON d.idarchivero = a.id
    WHERE a.modulos = 'musica' AND a.roles = 'free'`);
    
    res.render('free/musica',{musica});
});

router.get('/peliculas',isLoggedIn,authRole('user_free'), async (req, res) => {
    const peliculas = await pool.query(`SELECT a.id, a.titulo,u.autor,p.portada,d.documento FROM archiveros a 
    INNER JOIN autores u ON a.idautor = u.id
    INNER JOIN portadas p ON p.idarchivero = a.id
    INNER JOIN documentos d ON d.idarchivero = a.id
    WHERE a.modulos = 'peliculas' AND a.roles = 'free'`);
    
    res.render('free/peliculas',{peliculas});
});

router.get('/videos',isLoggedIn,authRole('user_free'), async (req, res) => {
    const videos = await pool.query(`SELECT a.id, a.titulo,u.autor,p.portada,d.documento FROM archiveros a 
    INNER JOIN autores u ON a.idautor = u.id
    INNER JOIN portadas p ON p.idarchivero = a.id
    INNER JOIN documentos d ON d.idarchivero = a.id
    WHERE a.modulos = 'videos' AND a.roles = 'free'`);
  
    res.render('free/videos',{videos});
});





module.exports = router;