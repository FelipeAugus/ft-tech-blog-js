if(process.env.NODE_ENV == "production"){
    module.exports = { mongoURL: process.env.URI_MONGO }
}else{
    console.log("RODANDO LOCAL");
    module.exports = { mongoURL: "mongodb://localhost/ftblog" }
}
