const mongoose = require("mongoose");
require("../models/Post");
const Post = mongoose.model("posts")

class IndexController{
    gHome(req, res){
        res.render("nav/index");
    }
    gServ(req, res){
        res.render("nav/servicos", {titulo: 'FT - Serviços'});
    }
    gQuem(req, res){
        res.render("nav/quem", {titulo: 'FT - Quem Somos'});
    }
    gBlog(req, res){
        Post.find().lean()
        .then((posts)=>{
            res.render("nav/blog", {titulo: 'FT - Blog', posts: posts});
        }).catch((err)=>{
            req.flash("error_msg", "Erro interno, ", err);
            res.redirect("/404");
        });
    }
    gCont(req, res){
        res.render("nav/contatos", {titulo: 'FT - Fale Conosco'});
    }
    gPostId(req, res){
        Post.findOne({_id: req.params.id}).lean()
        .then((post) =>{
            if(post){
                res.render("post/index", {post:post});
            }else{
                req.flash("error_msg", "ID inválido !");
                res.redirect("/");
            }
        }).catch((err)=>{
            req.flash("error_msg", "Erro na busca no banco de dados!");
            res.redirect("/");
        });
    }
}

module.exports = IndexController;
