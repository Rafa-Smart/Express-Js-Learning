// jadi response body ini adalah kita akn mengeirimkan response berupa apa
// bebas bisa 

// res.send(Buffer.from('whoop')) -> buffer
// res.send({ some: 'json' }) -> json
// res.send('<p>some html</p>') -> html
// res.status(404).send('Sorry, we cannot find that!')
// res.status(500).send({ error: 'something blew up' })

// jadi senearnya kalo misalkan kita ngirim data berupa json, tpai engga diset content-typenya maka express sudh otomatis mengirimnya, jadi boleh untuk tidak ngeset content-type

import express from 'express';
import request from 'supertest';

console.clear()

describe("testing response-header...", () => {
    const app = express();
    app.get("/rafa", (req, res) => {
        res.set({
            "Content-Type": "application/octet-stream",
            "X-powered-by":"rafa khadafi"
        }).send(Buffer.from("rafa khadafi"))

    })

    app.get("/jamal", (req, res) => {
        res.set({
            "Content-Type": "text/plain",
            "X-powered-by":"jamaluddin"
        }).send('<p>ini html ceritanya</p>')

    })

    test("test buffer..." , async () => {
        const response = await request(app)
            .get("/rafa")
        expect(response.body).toEqual(Buffer.from("rafa khadafi"))
        // kita pake equal karena ini buffer
        // dan kalo buffer itu masuknya ke body, dan json juga
        // masuknya ke body

        expect(response.get("content-type")).toBe("application/octet-stream")
    })


    test("test html..." , async () => {
        const response = await request(app)
            .get("/jamal")
        expect(response.text).toBe("<p>ini html ceritanya</p>")
        expect(response.get("content-type")).toBe("text/plain; charset=utf-8")
    })



})

// test