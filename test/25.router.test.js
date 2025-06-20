
// nah jadi didalam app, itu sudah ad default objek router
// nah jadi oruter ini cocok untuk kita melakukan grouping router
// dan kita juga bisa menambahkan middleware di dalamnya

// jadi ini cocok jika kita ingin memiliki middleware dan routing yg independen

// nah biasanya kna kita mamasukan middleware dan method http langusng ke app



import express from 'express';
import request from 'supertest';
console.clear()

const app = express();

// cara membuatnya

const router = express.Router();

// nah disini kita bisa menambahkan method http, atau middleware ke si router ini
// selayaknya seprti di app

// disini ktia tambahkan middleware
// khusus nutk yg route /rafa

router.use('/rafa', (req, res, next) => {
    res.set({"content-type":'text/plain'})
    console.log(`haloo ${req.query.nama} ini adalah middleware`)
    next()
})

// nah jadi middleware ini aka masuk lanjut next ke si router /rafa

// nah ektika kita sudah membuat router dan middleware nya secara independen
// kia juga harus menambahkanya ke app lagi,
// karena kalo engga ditambahkan maka secara default
// router ini tidka akna jalan

// cara menambahkannya
app.use(router)

// maka akan aktif jika di route /rafa saja

// nah jadi ketika kita set bahwa router ini dengna path /rafa
// maka seluruh initialisasi middleware dan method http ini akna mebjalan hanya di route /rafa/


router.get('/rafa', (req,res) => {
    res.send(`halo ${req.query.nama}`)
})

test("testing 1...", async () => {
    const response = await request(app).get("/rafa").query({nama:"rafa"})
    expect(response.status).toBe(200)
    expect(response.text).toBe('halo rafa')
    expect(response.get("content-type")).toContain('text/plain')
})