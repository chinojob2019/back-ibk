import { error } from 'console';
import express from 'express';
import fs from 'fs'

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
res.send("bienvenido al a firs app");
});

const readData = () =>{
try {
     const data = fs.readFileSync("./db.json");
     return JSON.parse(data);
} catch (error) {
}
};

const readDataMovi = () =>{
    try {
         const data = fs.readFileSync("./dbm.json");
         return JSON.parse(data);
    } catch (error) {
    }
    };

app.get("/cuentas/:id",(req,res) =>{

try {
    const data = readData();

const id = parseInt(req.params.id);
const menor = (id-1) * 5
const mayor = (id) * 5
const dataF = data.cuentas.filter(i=> i.idCuenta > menor && i.idCuenta <=mayor)
res.status(200).json(dataF);
} catch (error) {
    const data = {
        result: "error",
        message: "Error en el servicio"
    }
    res.status(400).json(data); 
}

});

app.get("/movimientos",(req,res) =>{
    try {
        const data = readDataMovi();
        const id = parseInt(req.body.id);
        const dataF = data.movimientos.filter( i => i.idCuenta === id );
        res.status(200).json(dataF)  
    } catch (error) {
        const data = {
            result: "error",
            message: "Error en el servicio"
        }
        res.status(400).json(data)
    }
});
    

app.post("/login",(req,res)=>{

  if((req.body.username =="userTest1" && req.body.password =="passTest1") || 
  (req.body.username == "User@test" && req.body.password =="TestPass_") ||
   (req.body.username =="user123&" && req.body.password =="123456")){
    const data = {
        result: "ok",
        message: "validado con exito"
    }
    res.status(200).json(data);

  }else{
    const data = {
        result: "error",
        message: "Usuario o clave incorrecta"
    }
    res.status(400).json(data);
  }
});



app.listen(3000,() =>{
console.log('El servidor esta escucando');
});
