// Secara default, saat klien mengirimkan data JSON ke server (misalnya via POST), Express tidak akan langsung tahu isinya.

// Maka, express.json() digunakan agar Express bisa membaca dan mengakses isi body JSON tersebut.

// jadi gini cara kerjanya
// 1. Permintaan masuk ke server (dengan metode POST, PUT, PATCH, dll).
// 2. Jika content-type: application/json, maka express.json() akan:
// kita akan menggunakan middleware express.json() nya dan akan
// |||Membaca data yang dikirim (raw buffer).
// |||Mengurai (parse) menjadi objek JavaScript.
// |||Menyimpannya ke dalam req.body.
// |||Router/middleware berikutnya bisa menggunakan req.body seperti objek biasa.

// contonya kita akan mengirimkan data json ke server menggunakan method post
// nah annti si server sebenarnya ga tau apa aja yang dikirimkan kepadanya
// makanya kita perlu menggunakan express.json() agar server bisa membaca data json yang dikirimkan
// dan akna langsung di taro di req.body

// nah misalkan kita pnya banyak middleware built-in
// app.use(express.json())
// app.use(express.raw())
// app.use(express.urlEncoded())
// app.use(express.static()) --> file html,css, gambar, dll

// maka nanti eprtama akn dicek dulu apa isi content-type yg dikirim user
// jika json, maka middlewre yg akan dipake adalah yg express.json(),
// jika raw, maka middleware yg akan dipake adalah express.raw(),
// dan seterusnya, jadi sesuai yg dikirim user



// DAN INGAT KETIKA KITA MENGGUNAKAN EXPRESS BUILT IN, MAKA OTOMATIS
// DATA YG DIKIRIMNYA AKN DISIMPAN DI REQ.BODY

import express from "express";
import request, { agent } from "supertest";

const app = express();

app.use(express.json()) // engubah request body user, jadi json
app.use(express.urlencoded())
app.use(express.text()) // string
app.use(express.raw()) // buffer


app.route("/rafa")
    .get((req, res) => {
        res.send("ini adalah halaman get");
    })
    .post((req, res) => {
        res.send(`nama : ${req.body.nama}, umur : ${req.body.umur}`);
    })


describe("testing post...", () => {
    test("testing 1 json...", async () => {
        const agent = request.agent(app);
        const response = await agent.post('/rafa')
            .set("content-type", "application/json")
            .send({nama:"rafa",umur:15})

        expect(response.text).toBe('nama : rafa, umur : 15');
        expect(response.status).toBe(200);

    })
})

// Dan express.raw() tidak dikonfigurasi dengan type, maka raw akan menangkap 
// semua request, termasuk JSON, karena raw() by default menerima semua tipe:

// kecuali raw
// express.raw({ type: "*/*" }) // defaultnya begitu
// jadi raw akan menerima data apapun

// jadi kalo misal gini
app.use(express.raw())
app.use(express.json())

// maja nanti express.jsonnya tidak akna kepanggil
// dan akna keburu sama si rawnya ini
// jadi rau itu ditaro di paling akhir saja

// atau bsia kita setting
// app.use(express.raw({ type: 'application/octet-stream' })); // khusus raw/binary