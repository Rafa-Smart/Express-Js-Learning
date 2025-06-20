// pada materi sebelumnya kita menggunakann route pathnya yg tidka dinamis
// tapi ternyata express js ini memiliki fitur untuk mengelola route dinamis
// dengan cara menggunakan regex atau string patterns (sudah dilakukan dulu)
// strings patterns = 'rafa khadafi' -> jadi harus cocok banget
// regex = /rafa/ -> lebih dinamis

// https://forbeslindesay.github.io/express-route-tester/



import express from 'express';
import request from 'supertest';
console.clear()

const app = express();
// jadi inikita buat 
// /barang/id:apapun angka
app.get(/^\/barang\/id\:\d+$/, (req, res) => {
    res.send("selamat datang...")
})


test("testing 1...", async () => {
    const response = await request(app).get('/barang/id:1234')
    expect(response.status).toBe(200)
    expect(response.text).toBe("selamat datang...")
})
test("testing 2...", async () => {
    const response = await request(app).get('/barang/id:jamal')
    expect(response.status).toBe(404) // ditolak
})

