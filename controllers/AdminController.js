const mongoose = require("mongoose");
require("../models/Post");
const Post = mongoose.model("posts")

class AdminController{
    gHome(req, res){
        res.render("admin/index");
    }
    gPosts(req, res){
        Post.find().lean()
        .then((posts)=>{
            res.render("admin/index", {titulo: 'AdminFT - Home', posts: posts});
        }).catch((err)=>{
            req.flash("error_msg", `ERRO ao lista as categorias:  ${err}`);
            res.redirect("/admin");
        });
    }
    gPostsAdd(req, res){
        res.render("admin/addPost", {titulo: 'AdminFT - NewPost'});
    }
    pPostsAdd(req, res){
        const erros = [];
    
        if(!req.body.titulo.trim() || typeof(req.body.titulo) == undefined || req.body.titulo == null){
            erros.push({desc: "Titulo inválido !"});
        }
        if(!req.body.texto.trim() || typeof(req.body.texto) == undefined || req.body.texto == null){
            erros.push({desc: "Post inválido !"});
        }
    
        if(erros.length > 0){ // Ocorreu algum erro
            res.render("admin/addPost", {titulo: 'ERROR - NewPost', erros: erros});
        }else{
            const novoPost = {
                titulo: req.body.titulo,
                texto: req.body.texto,
            }
    
            new Post(novoPost).save()
            .then(()=>{
                req.flash("success_msg", "Post criado com sucesso! ");
                res.redirect("/admin/posts");
            }).catch((err)=>{
                req.flash("error_msg", "Houve um erro ao salvar o post, tente novamente");
                res.redirect("/admin");
            });
        }
    }
    gPostsEdit(req, res){
        Post.findOne({_id: req.params.id}).lean()
        .then((post)=>{
            res.render("admin/editPost", {titulo: 'AdminFT - EditPost', post: post});
        }).catch((err)=>{
            req.flash("error_msg", "ID INVÁLIDO");
            res.redirect("/admin/posts");
        });
    }
    pPostsEdit(req, res){
        const erros = [];
    
        if(!req.body.titulo.trim() || typeof(req.body.titulo) == undefined || req.body.titulo == null){
            erros.push({desc: "Titulo inválido !"});
        }
        if(!req.body.texto.trim() || typeof(req.body.texto) == undefined || req.body.texto == null){
            erros.push({desc: "Post inválido !"});
        }
    
        if(erros.length > 0){ // Ocorreu algum erro
            Post.findOne({_id: req.body.id}).lean()
            .then((post)=>{
                res.render("admin/editPost", {titulo: 'ERROR - EditPost', post: post, erros: erros}); 
            }); 
        }else{
            Post.findOne({_id: req.body.id})
            .then((post)=>{
    
                post.titulo = req.body.titulo;
                post.texto = req.body.texto;
    
                post.save()
                .then(()=>{
                    req.flash("success_msg", "Post editado com sucesso! ");
                    res.redirect("/admin/posts");
                }).catch((err)=>{
                    req.flash("error_msg", "ERRO AO SALVAR EDIÇÃO DO POST!");
                    res.redirect("/admin/posts");
                });
    
            }).catch((err)=>{
                req.flash("error_msg", "ERRO AO EDITAR POST!");
                res.redirect("/admin/posts");
            });
        }
    }
    pPostsDrop(req, res){
        Post.deleteOne({_id: req.body.id})
        .then(()=>{
             req.flash("success_msg", "Post deletado com sucesso!");
             res.redirect("/admin/posts");
        }).catch((err)=>{
             req.flash("error_msg", "Houve um erro ao deletar o post");
             res.redirect("/admin/posts")
        });
    }
}

module.exports = AdminController;
