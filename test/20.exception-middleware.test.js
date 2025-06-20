// kitacoba sekarang unutk menolak

// jadi sebelum masuk ke router, kita cek dulu apikeynya
// jika tidak ada maka akn kita reject requestnya
// jika ada maka akn diteruskan ke routernya yg ditentukan

import express from "express";
import request from "supertest";

console.clear();

function testingApi(req, res, next) {
    if(req.query.apiKey){
        next();
    } else {
        // res.status(404).redirect('/tolak').end()
        // itu ga bisa ya 404, karena kalo kita redirect itu defaultnya 302(express)
        res.status(302).redirect('/tolak').end()

        // dan disini kita gapake next(), agar berhenti
    }
}

const app = express();

// jadi kita set bahwa testingApi ini akan kita gunakan sebelum masuk ke routing /api
// jadi siapapun yg ingin masuk ke routing /api, maka akn melewti middleware ni dulu
app.use('/api', testingApi);

app.get("/api", (req, res) => {
    res.send(`terima kasih ${req.query.apiKey}`)
})



// pengetesan asli sudah ada di folder src/3.middleware-testing.js

test("testing api 1... (berhasil) ", async () => {
    // const response = await request(app).get('/api?apiKey=1234567890');
    const response = await request(app).get('/api').query({apiKey:"1234567890"});
    expect(response.status).toBe(200);
    expect(response.text).toBe('terima kasih 1234567890');
})


test("testing api 2... (gagal) ", async () => {
    const response = await request(app).get('/api');
    expect(response.status).toBe(302);
    expect(response.text).toBe('Found. Redirecting to /tolak');
})