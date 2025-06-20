import express from "express";
import request from "supertest"
console.clear()


describe("testing response status...", () => {

    const app = express();
    app.get("/rafa", (req, res) => {
        // res.send("Hello, World!").status(200);
        // itu ga bisa karena nanti si status codenya tidak keburu kekirim
        // karea sudah keburu ke send

        res.status(200).send("Hello, World!");
    })

    it("tes 1.", async () => {
        const response = await request(app)
            .get("/rafa")
        expect(response.text).toBe("Hello, World!")
        expect(response.status).toBe(200)
    })
})

