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
});