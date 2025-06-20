// biasanya ketika kita membaut api
// kita biasa mengakses data ari api tersbeut berdasarkna paramternya
// selain pake query paramter, kita juga bisa menggunakan 
// router parameter ini contohnya



// https://forbeslindesay.github.io/express-route-tester/



import express from 'express';
import request from 'supertest';
console.clear()

const app = express();
// jadi inikita buat 

// /^\/categori\/\d+\/\w+$/
// kalo ga pake () untuk si paramsnya
// maka nanti tidka akan terdeteksi

// /^\/categori\/(\d+)\/(\w+)$/





app.get(/^\/categori\/(\d+)\/([a-z]+)$/, (req, res) => { // S = bukan spasi, w = huruf saja
    res.send(`data product dengan id ${req.params[0]} dan nama ${req.params[1]}`);
})

app.get(/^\/kamar\/(\d+)$/, (req, res) => {
    res.send(`data kamar dengan id ${req.params[0]}`);
})

app.get(/^\/products\/(\d+)$/, (req, res) => {
    res.send(`data produk dengan id ${req.params[0]}`)
})

test("testing 1...", async () => {
    const response = await request(app).get('/products/5')
    expect(response.status).toBe(200)
    expect(response.text).toBe("data produk dengan id 5")
})
test("testing 2...", async () => {
    const response = await request(app).get('/categori/10/rubik')
    expect(response.text).toBe(`data product dengan id 10 dan nama rubik`)
})

it("testing 3...", async () => {
    const response = await request(app).get("/kamar/50");
    expect(response.text).toBe('data kamar dengan id 50')
})
it("testing 4...", async () => {
    const response = await request(app).get("/kamar/siti"); // salah
    expect(response.status).toBe(404)
})
it("testing 5...", async () => {
    const response = await request(app).get("/categori/10/22"); // salah
    expect(response.status).toBe(404)
})