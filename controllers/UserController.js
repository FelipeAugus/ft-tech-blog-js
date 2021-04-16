const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");
const bcrypt = require("bcryptjs");
const passport = require("passport");

class UserController{
    gCad(req, res){
        res.render("user/cadastro", {titulo: 'UserFT - NewUser'});
    }
    pCad(req, res){
        const erros = [];
        if(!req.body.nome.trim() || typeof(req.body.nome) == undefined || req.body.nome == null){
            erros.push({desc: "Nome inválido !"});
        }
        if(!req.body.email || typeof(req.body.email) == undefined || req.body.email == null){
            erros.push({desc: "Email inválido !"});
        }
        if(!req.body.senha || typeof(req.body.senha) == undefined || req.body.senha == null){
            erros.push({desc: "Senha inválido !"});
        }
        if(!req.body.senha2 || typeof(req.body.senha2) == undefined || req.body.senha2 == null){
            erros.push({desc: "Confirmação de senha inválido !"});
        }
        if(req.body.senha.length < 6){
            erros.push({desc: "Senha deve ter no minimo 6 digitos."});
        }
        if(req.body.senha != req.body.senha2){
            erros.push({desc: "Senhas devem ser iguais!"});
        }
        if(erros.length > 0){
            res.render("user/cadastro", {titulo: 'UserFT - NewUser', erros: erros});
        }else{
            Usuario.findOne({email: req.body.email})
            .then((user)=>{
                if(user){
                    req.flash("error_msg", "Email já cadastrado");
                    res.redirect("/user/cadastro");
                }else{
                    const novoUsu = new Usuario({
                        nome: req.body.nome,
                        email: req.body.email,
                        senha: req.body.senha
                    });
    
                    bcrypt.genSalt(10, (erro, salt)=>{
                        bcrypt.hash(novoUsu.senha, salt, (erro, hash) =>{
                            if(erro){
                                req.flash("error_msg", "Erro ao cadastrar usuario");
                                res. redirect("/");
                            }else{
                                novoUsu.senha = hash;
                                novoUsu.save()
                                .then(()=>{
                                    req.flash("success_msg", "Usuário registrado com sucesso!");
                                    res.redirect("/");
                                }).catch((err)=>{
                                    req.flash("error_msg", "Erro ao cadastrar usuario");
                                    res. redirect("/user/cadastro");
                                });
                            }
                        });
                    });
    
                }
            }).catch((err)=>{
                req.flash("error_msg", "Erro ao cadastrar usuario");
                res. redirect("/");
            });
        }    
    }
    gLogin(req, res){
        res.render("user/login", {titulo: 'UserFT - Login'});
    }
    pLogin(req, res, next){
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/user/login",
            failureFlash: true
        })(req, res, next)
    }
    gLogout(req, res){
        req.logout();
        req.flash("success_msg", "Desconectado com sucesso");
        res.redirect("/");
    }
}

module.exports = UserController;
