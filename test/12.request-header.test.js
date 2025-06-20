// nahh di objek request ini juga mempunyai
// method yaitu get
// nah get ini digunakan untuk mendapatkan header dari si request
// nah req.get([namaHeader])-> insensitive bisa kecil besar -> ga ngaruh

// bisa juga seperti ini
// req.header([namaHeader]) -> insensitive

import express from 'express';
import request from "supertest";
console.clear();

// req.get('Content-Type')
// // => "text/plain"

// kalo ga ada
// req.get('Something')
// // => undefined



describe("testing request method get", () => {
    const app = express();
    app.get("/test", (req, res) => {
        let type = req.get("accept") // -> buat dapetin si headernya, dengan key Accpet
        res.send(`req header accept : ${type}`)
    })

    test("test 1...", async () => {
        const response = await request(app).get("/test").set("Accept","text/plain")// jadi ngasil tau ke si server, bahwa si request ini pengennya text plain

        expect(response.text).toBe("req header accept : text/plain")


    })


})