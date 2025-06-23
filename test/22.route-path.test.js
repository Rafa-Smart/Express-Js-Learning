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
app.get(/^\/barang\/(\d+$)/, (req, res) => {
    res.send("selamat datang..."+req.params[0])
})
app.get('/barang2/:id', (req, res) => {
    res.send("selamat datang..."+req.params.id)
})


test("testing 1...", async () => {
    const response = await request(app).get('/barang/1234')
    expect(response.status).toBe(200)
    expect(response.text).toBe("selamat datang...1234")
})

test("testing 2...", async () => {
    const response = await request(app).get('/barang2/1234')
    expect(response.status).toBe(200)
    expect(response.text).toBe("selamat datang...1234")
})
test("testing 3...", async () => {
    const response = await request(app).get('/barang/jamal')
    expect(response.status).toBe(404) // ditolak
})
test("testing 4...", async () => {
    const response = await request(app).get('/barang2/jamal')
    expect(response.status).toBe(200) // 
    // disini ga ditolak, karena kita ga ngasih tau
    // bahwa itu wajib angka, jadi hurufpun bibsa
    // untuk yg route barang2 ini
})

