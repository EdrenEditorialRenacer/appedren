const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')
const { database } = require('./keys');
const passport = require('passport');

//initializations
const app = express();
require('./lib/passport')
//settings

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
}));
app.set('view engine', '.hbs');
//MIDLEWARES
app.use(session({
    secret: 'session-edren',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());


//global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    
    if (req.user != null) {
        if (req.user.role == 'admin') {
            app.locals.admin = true;
        } else {
            app.locals.admin = false;
        }
        if (req.user.role == 'user_free') {
            app.locals.user_free = true;
        } else {
            app.locals.user_free = false;
        }
        if (req.user.role == 'user_premium') {
            app.locals.user_premium = true;
        } else {
            app.locals.user_premium = false;
        }
        if (req.user.role == 'secretary') {
            app.locals.secretary = true;
        } else {
            app.locals.secretary = false;
        }
    }else{
        app.locals.admin = false;
        app.locals.user_free = false;
        app.locals.user_premium = false;
        app.locals.secretary = false;
    }
    


    next();
});


//routes
app.use(require('./routes'))
app.use('/',require('./routes/auth'));
app.use('/comentarios' ,require('./routes/comentarios'));
app.use('/autores', require('./routes/autores'));
app.use('/interpretes',require('./routes/interpretes'));
app.use('/archiveros', require('./routes/archiveros'));
app.use('/portadas', require('./routes/portadas'));
app.use('/documentos', require('./routes/documentos'));
app.use('/free', require('./routes/free'));
app.use('/premium', require('./routes/premium'));
app.use('/shop', require('./routes/shop'));
app.use('/users',require('./routes/users'));

//Public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));
//Starting the server

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})