const express = require('express');
const pool = require('../database');
const { isLoggedIn,authRole } = require('../lib/auth');
const router = express.Router();


router.get('/documento/:id',isLoggedIn,authRole('user_premium'), async (req,res) => {
    const { id } =req.params;
    const documentos = await pool.query(`SELECT a.id, a.titulo,u.autor,p.portada,d.documento FROM archiveros a 
    INNER JOIN autores u ON a.idautor = u.id
    INNER JOIN portadas p ON p.idarchivero = a.id
    INNER JOIN documentos d ON d.idarchivero = a.id
    WHERE a.id=?`,[id]);
    console.log(documentos);
    res.render('premium/documento',{documento:documentos[0]});
});


router.get('/all',isLoggedIn,authRole('user_premium'), async (req, res) => {
  
    
    res.render('premium/all');
});


router.get('/libros',isLoggedIn,authRole('user_premium'), async (req, res) => {
    const libros = await pool.query(`SELECT a.id, a.titulo,u.autor,p.portada,d.documento FROM archiveros a 
    INNER JOIN autores u ON a.idautor = u.id
    INNER JOIN portadas p ON p.idarchivero = a.id
    INNER JOIN documentos d ON d.idarchivero = a.id
    WHERE a.modulos = 'libros' AND a.roles = 'premium' OR a.roles = 'free'`);
    console.log(libros);
    res.render('premium/libros',{libros});
});

router.get('/revistas',isLoggedIn,authRole('user_premium'), async (req, res) => {
    const revistas = await pool.query(`SELECT a.id, a.titulo,u.autor,p.portada,d.documento FROM archiveros a 
    INNER JOIN autores u ON a.idautor = u.id
    INNER JOIN portadas p ON p.idarchivero = a.id
    INNER JOIN documentos d ON d.idarchivero = a.id
    WHERE a.modulos = 'revistas' AND a.roles = 'premium' OR a.roles = 'free'`);
    console.log(revistas);
    res.render('premium/revistas',{revistas});
});

router.get('/comics', isLoggedIn,authRole('user_premium'),async (req, res) => {
    const comics = await pool.query(`SELECT a.id, a.titulo,u.autor,p.portada,d.documento FROM archiveros a 
    INNER JOIN autores u ON a.idautor = u.id
    INNER JOIN portadas p ON p.idarchivero = a.id
    INNER JOIN documentos d ON d.idarchivero = a.id
    WHERE a.modulos = 'comics' AND a.roles = 'premium' OR a.roles = 'free'`);
    console.log(comics);
    res.render('premium/comics',{comics});
});

router.get('/musica', isLoggedIn,authRole('user_premium'),async (req, res) => {
    const musica = await pool.query(`SELECT a.id, a.titulo,u.autor,p.portada,d.documento FROM archiveros a 
    INNER JOIN autores u ON a.idautor = u.id
    INNER JOIN portadas p ON p.idarchivero = a.id
    INNER JOIN documentos d ON d.idarchivero = a.id
    WHERE a.modulos = 'musica' AND a.roles = 'premium' OR a.roles = 'free'`);
    console.log(musica);
    res.render('premium/musica',{musica});
});

router.get('/peliculas',isLoggedIn,authRole('user_premium'), async (req, res) => {
    const peliculas = await pool.query(`SELECT a.id, a.titulo,u.autor,p.portada,d.documento FROM archiveros a 
    INNER JOIN autores u ON a.idautor = u.id
    INNER JOIN portadas p ON p.idarchivero = a.id
    INNER JOIN documentos d ON d.idarchivero = a.id
    WHERE a.modulos = 'peliculas' AND a.roles = 'premium' OR a.roles = 'free'`);
    console.log(peliculas);
    res.render('premium/peliculas',{peliculas});
});

router.get('/videos',isLoggedIn,authRole('user_premium'), async (req, res) => {
    const videos = await pool.query(`SELECT a.id, a.titulo,u.autor,p.portada,d.documento FROM archiveros a 
    INNER JOIN autores u ON a.idautor = u.id
    INNER JOIN portadas p ON p.idarchivero = a.id
    INNER JOIN documentos d ON d.idarchivero = a.id
    WHERE a.modulos = 'videos' AND a.roles = 'premium' OR a.roles = 'free'`);
    console.log(videos);
    res.render('premium/videos',{videos});
});

module.exports = router;