

// disini kita akn testing

import express from 'express';
import request from 'supertest';

console.clear();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // agar 
// kalo true itu bisa memparsing objek bersarang
// kalo false itu tidak bisa
app.use(express.text());
app.use(express.raw());


app.post('/json', (req,res) => {
    res.json(req.body);
})
app.post('/text', (req,res) => {
    res.send(`data text diterima : ${req.body}`);
})
app.post('/url', (req,res) => {
    res.send(req.body);
})
app.post('/raw', (req,res) => {
    let buffer = req.body
    res.send(`data buffer diterima : ${buffer.length}`);
})


describe("testingg...", () => {
    test("POST /json → express.json()", async () => {
        const response = await request(app).post("/json")
        .set("content-type","application/json")
        .send({nama:"rafa",umur:"15"})

        expect(response.body).toEqual({nama:"rafa",umur:"15"})
        expect(response.status).toBe(200);
    })

    test("POST /text → express.text()", async () => {
        const response = await request(app)
            .post("/text")
            .send("jamal istiqomah")
            .set("Content-Type", "text/plain");

        expect(response.status).toBe(200);
        expect(response.text).toBe("data text diterima : jamal istiqomah");
    });


    test("POST /raw → express.raw()", async () => {
        const buffer = Buffer.from("rafa khadafi");
        const response = await request(app)
            .post("/raw")
            .set("Content-Type", "application/octet-stream")
            .send(buffer);

        expect(response.status).toBe(200);
        expect(response.text).toBe(`data buffer diterima : ${buffer.length}`);
    });

    test("POST /urlencoded → express.urlencoded()", async () => {
        const response = await request(app)
            .post("/url")
            .set("Content-Type", "application/x-www-form-urlencoded")
            .send("nama=Rafa&umur=21")

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ nama: "Rafa", umur: "21" });
    });

})

// POST /data
// Content-Type: application/x-www-form-urlencoded

// nama=Rafa&umur=21
// Ini dikirim secara otomatis oleh form HTML standar seperti:

// <form action="/data" method="POST">
//   <input name="nama" />
//   <input name="umur" />
//   <button type="submit">Kirim</button>
// </form>

// BACA....


//Saat tombol submit ditekan, browser otomatis mengubah input menjadi nama=Rafa&umur=21 dan mengirimkannya dengan header application/x-www-form-urlencoded.