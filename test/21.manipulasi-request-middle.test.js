// kit juga bisa memanipulasi request objek dari middleware
// misal kmu ingin emnambahkan atribut request, aga bisa digunakan di middleware selanjutnya atau di router

import express from "express";
import request from "supertest";

const app = express();

app.use((req, res, next) => {
    // disini kita tambahkan atribut baru pada objek request
    // bisa apa sja, karena objek request ini sebenarnya hanya objek biasa
    req.user = { name: "rafa khadafi" };
    next();
});

app.get("/rafa", (req, res) => {
    res.send(`haloo ${req.user.name}`);
})

test("testing 1", async () => {
    const response = await request(app).get('/rafa');
    // expect(response.body).toBe("haloo rafa khadafi");
    // yg diatas itu ga bisa karena kita ngasihnya res.send -> akan response.text
    // bukan response.body, kecuali juka buffer, atau json

    expect(response.text).toBe("haloo rafa khadafi");
})

