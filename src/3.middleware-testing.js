import express from "express";
import request from "supertest";

console.clear();

function testingApi(req, res, next) {
    if(req.query.apiKey){
        next();
    } else {
        res.status(401).redirect('/tolak').end()
    }
}

const app = express();

// jadi kita set bahwa testingApi ini akan kita gunakan sebelum masuk ke routing /api
// jadi siapapun yg ingin masuk ke routing /api, maka akn melewti middleware ni dulu
app.use('/api', testingApi);

app.get("/api", (req, res) => {
    res.send(`terima kasih ${req.query.apiKey}`)
})

app.get("/tolak", (req, res) => {
    res.send("tidak ada api key")
})

app.listen(3000, () => console.log("running on port 3000..."))


// jadi in sudah benar
// ketika ada yg akses http://localhost:3000/api?apiKey=123
// dengan api key, maka akn masuk ke routing /api
// tapi jika tidak maka akn masuk ke routing /tolak