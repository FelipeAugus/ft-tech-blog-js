if(process.env.NODE_ENV == "production"){
    module.exports = { mongoURL: "" } //URI do serviço de banco de dados que estiver utilizando.. 
}else{
    console.log("RODANDO LOCAL");
    module.exports = { mongoURL: "mongodb://localhost/ftblog" }
}