const passport = require('passport');
const LocalStrategy =require('passport-local').Strategy;
const pool = require('../database');
const helpers =require('../lib/helpers');

 passport.use('local.signin',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback:true
 },async(req,email,password,done)=>{
    const rows =await pool.query('SELECT * FROM users WHERE email = ?',[email]);
    if(rows.length > 0){
        const user = rows[0];
        const validPassword =await helpers.matchPassword(password,user.password);
        if(validPassword){
            done(null,user,req.flash('success','Welcome ' + user.username));
        }else{
            done(null,false,req.flash('message','Incorrect Password'));
        }
    }else{
        return done(null,false,req.flash('message', 'The Username does not exists'));
    }
 }));


passport.use('local.signup',new LocalStrategy({
    
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,email,password,done)=>{
   const { username,telefono,pais,idioma } = req.body;
   const role = 'user_free';

    const newUser = {
        username,
        email,
        telefono,
        password,
        role,
        pais,
        idioma
    };
    newUser.password = await helpers.encryptPassword(password);
    const result =await pool.query("INSERT INTO users SET ?",[newUser]);
    console.log(result);
    newUser.id = result.insertId;
    console.log(newUser);
    return done(null,newUser);
}));



 passport.serializeUser((user,done)=>{
    done(null,user.id);
 });

 passport.deserializeUser( async(id,done) =>{
    const rows =await pool.query('SELECT * FROM users where id = ?',[id]);
    done(null,rows[0]);
 });