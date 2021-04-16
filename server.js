const PORTA = process.env.PORT || 5757;

const app = require("./app");

app.listen(PORTA, ()=>{
    console.log("Servidor rodando !");
});
