// jadi https://expressjs.com/en/api.html#req.app

// misalnya mau ngambil querry param dari su req

import express from 'express';
import request from "supertest";
console.clear()

describe("mendapatkan querry param", () => {
    const app = express();
    app.get("/test", (req, res) => {
        res.send(`query : ${req.query.name}`)
    })


    test("test 1...", async () => {

        // disini testnya

        const response = await request(app).get("/test").query({name:"Rafa"})
        expect(response.text).toBe("query : Rafa")
    })
    test("test 1...", async () => {

        // disini testnya

        const response = await request(app).get("/test").query({name:"Jamal"})
        expect(response.text).toBe("query : Jamal")
    })
})