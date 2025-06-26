
// nah jadi didalam app, itu sudah ad default objek router
// nah jadi oruter ini cocok untuk kita melakukan grouping router
// dan kita juga bisa menambahkan middleware di dalamnya

// jadi ini cocok jika kita ingin memiliki middleware dan routing yg independen

// nah biasanya kna kita mamasukan middleware dan method http langusng ke app

// express.Router() adalah mini-aplikasi router dan middleware yang dapat Anda gunakan untuk mengatur rute secara modular dan terpisah dari file utama aplikasi (app.js atau index.js).

//  Definisi teknis: express.Router adalah sebuah class yang menyediakan fungsi routing seperti .get(), .post(), .put(), .delete(), dan fungsi middleware seperti .use(). Ia bekerja mirip seperti instance express() tapi digunakan hanya untuk routing.


// Tanpa Router, semua endpoint (/users, /products, /auth, dll.) akan menumpuk dalam satu file (app.js). Ini tidak 
// skalabel dan sulit dipelihara.

//  3.Memisahkan Tanggung Jawab (Separation of Concerns)
// Routing user ditangani oleh userRouter.

// Routing produk oleh produkRouter.

// jadi kit bisa mengatur middleware khusus per router, tanpa campur tangan bagian lain.


import express, { Router } from 'express';
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
    res.set({"content-type":'application/json'})
    console.log(`haloo ${req.query.nama} ini adalah middleware`)
    next()
})

// nah jadi middleware ini aka masuk lanjut next ke si router /rafa

// nah ektika kita sudah membuat router dan middleware nya secara independen
// kia juga harus menambahkanya ke app lagi,
// karena kalo engga ditambahkan maka secara default
// router ini tidka akna jalan

router.get('/rafa', (req,res) => {
    res.json({nama:req.query.nama})
})

// kit abisa menmbahkan settig ini untu route apa angsung di router.get('/rafa)
// dan router.use('/rafa)

// atau langusng di app.use nya kita masukan
// app.use('/rafa', router)

// cara menambahkannya
app.use(router)


// ini yg keduanya


const router2 = express.Router();

router2.use((req,res,next) => {
    res.set({"content-type":'text/plain'})
    // disini kita buat properti baru di reqnya
    req.nama = "jamaluddin"
    req.umur = 15
    console.log("sudah emngakses router2 dengna /jamal")
    next()
})

router2.get('/jamal', (req, res) => {
    // ngambil dari si req yg sudah dimanupulasi di middleware
    // dan middleware iniberlaku hanya untuk route /jamal
    res.send(`halo ${req.nama}`)
})

// app.use("/jamal",router2)
// nah itu seharusnya gausah, jadi pake cara pertama aja
// jadi kita atur routernya langsung dari router.use("/jamal",())
// jadi jangan di app.use("/jamal")
app.use(router2)

// maka akan aktif jika di route /rafa saja

// nah jadi ketika kita set bahwa router ini dengna path /rafa
// maka seluruh initialisasi middleware dan method http ini akna mebjalan hanya di route /rafa/




test("testing 1...", async () => {
    const response = await request(app).get("/rafa").query({nama:"rafa"})
    expect(response.status).toBe(200)
    expect(response.body).toEqual({nama:"rafa"})
    expect(response.get("content-type")).toContain('application/json')


    // dna disini kita cek bahwa middleware yg adadi route2 (/jamal)
    // tidak berfungsi di route /rafa

    // nah kalo jamal itu kan content-typenya text/plain
    // maka harusnya ga bisa

    expect(response.get('content-type')).not.toContain("text/plain")
})
test("testing 2...", async () => {
    const response = await request(app).get("/jamal")
    expect(response.status).toBe(200)
    expect(response.text).toBe('halo jamaluddin')
    expect(response.get("content-type")).toContain('text/plain')
})

// app.use("/jamal", router2)
// Artinya: semua route di dalam router2 otomatis ditambahkan prefix /jamal.
// jadi , /jamal akan menjadi /jamal/jamal
// kalo mau request(app).get("/jamal/jamal")

// Namun, kamu juga sudah menuliskan router2.get('/jamal', ...), sehingga route akhirnya menjadi: /jamal/jamal


// atau kamu mau juga bisa gini 
// router2.get('/', (req, res) => {
//     res.send(`halo ${req.nama}`);
// });

// app.use("/jamal", router2);