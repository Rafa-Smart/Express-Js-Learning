import express from "express";
import request from "supertest"
console.clear()

// kalo response itu kebanyakan adalah method
// kao request itu kebanyaakn adalah property


describe("testing response...", () => {

    const app = express();
    app.get("/rafa", (req, res) => {
        res.send("Hello, World!");
    })

    it("tes 1.", async () => {
        const response = await request(app)
            .get("/rafa")
        expect(response.text).toBe("Hello, World!")
    })
})