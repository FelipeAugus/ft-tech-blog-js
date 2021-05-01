// Importando modulos
    const express = require("express");
    const app = express();
    const path = require("path");

    const handlebars = require("express-handlebars");
    const mongoose = require("mongoose");
    
    const admin = require("./routes/admin");
    const user = require("./routes/user");
    const index = require("./routes/index");

    const session = require("express-session");
    const flash = require("connect-flash");
    
    require("./models/Post");
    
    const passport = require("passport");
    require("./config/auth")(passport);
    
    const {isAdmin} = require("./helpers/verificaAdmin");
    const { mongoURL } = require("./config/db");

//Configs
    // Sessão
        app.use(session({
            secret: "algosecreto", //Como um pass 
            resave: true,
            saveUninitialized: true
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(flash());
    // Middlewares // Autenticação
        app.use((req, res, next)=>{
            res.locals.success_msg = req.flash("success_msg");
            res.locals.error_msg = req.flash("error_msg");
            res.locals.error = req.flash("error");
            res.locals.user = req.user || null;
            next();
        });
    // Parsing 
        app.use(express.urlencoded({limit: '1mb', extended: true}));
        app.use(express.json({limit: '1mb'}))
    // Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');
    // Mongoose
        mongoose.Promise = global.Promise;
        mongoose.set('useUnifiedTopology', true);
        mongoose.connect(mongoURL, {useNewUrlParser: true})
        .then(()=>{
            console.log("Conectado ao banco de dados com sucesso. ");
        }).catch((err)=>{
            console.log("Erro ao conectar ", err);
        });
    // Public // Diretório dos arquivos estáticos // Exemplo: Folhas de estilo.. Imagens
        app.use(express.static(path.join(__dirname, "public")));

// Rotas
    app.use("/", index);
    app.use("/admin", isAdmin, admin);
    app.use("/user", user);
    app.use((req, res)=>{
        res.status(404).render("error404");
    });

// Server
    module.exports = app;
