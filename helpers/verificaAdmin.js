module.exports = {
    isAdmin: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash("error_msg", "Você não tem permissão para entrar nesse modulo!");
            res.redirect("/");
        }
    } 
}
