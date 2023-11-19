import express from 'express';
import fs from 'fs'

const app = express();

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


app.get("/cards",(req,res) =>{
const data = readData();
res.json(data)

})

app.listen(3000,() =>{
console.log('El servidor esta escucando')

});
