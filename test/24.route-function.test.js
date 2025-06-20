// function route
// biasanya kita mmebuat route path yg sama untuk beberapa tipe http method
// pada kasus ini kita bisa menmanfaatkan route(path) untuk beberapa tipe http method

import express from 'express';
import request from 'supertest';
console.clear()

const app = express();

// jadi ini tuh kita mmebuat satu route, nah ketika ada user get, di router tersebut, maka kan dijalankan callbacknya (untuk yg get saja)

// dan kalo method nya post dan routenya masih yg itu, maka tetap bisa juga
// dan akan dijalnakan callbacknya yg si post tersbuet
// dan begitu pula yg si put

// ini lebih efisien dari pada menggunakan app.get, app.post, app.put
// yg sebenarnya routenya sama



app.route('/products')
    .get((req, res) => {
        res.send("haloo ini get")
    })
    .post((req, res) => {
        res.send("haloo ini post")
    })
    .put((req, res) => {
        res.send('haloo ini put')
    })


test("testing 1...", async () => {
    const response = await request(app).get("/products")
    expect(response.text).toBe("haloo ini get")
})
test("testing 2...", async () => {
    const response = await request(app).post("/products")
    expect(response.text).toBe("haloo ini post")
})
test("testing 3...", async () => {
    const response = await request(app).put("/products")
    expect(response.text).toBe("haloo ini put")
})