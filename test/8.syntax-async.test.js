import express from "express";
import request from "supertest";

const app = express()
app.get("/rafa", (req, res) => {
    res.json({nama:"rafa khadafi"})
})
app.get("/jamal", (req, res) => {
    res.send("halooo")
})


// inget diatas itu untuk template saja, yg dibawah untuk ngetesnya

describe("testing async await...", () => {
    it("test 1", async () => {
        const response = await request(app).get('/rafa') ; // disini balikannya itu adalah response, karena kita request(jadinya dapetnya response)
        
        // atau bisa juga seperti ini
        // const httpClient = request(app)
        // const response = await httpClient.get('/rafa');


        expect(response.status).toBe(200); 

        // nah bedanya kalo di async ini kita ga bisa langusng 
        // expect("Content-Type",/json/), tapi harus ditentukan dulu jadi harusnya
        expect(response.headers["content-type"]).toMatch(/json/);

        // nah tapi kalo yg pake .then() kita bisa langsung (promise)
        // atau pake yg biasa pake done()
        // tets


        // nah tapi kalo pake async ini lebih simple

    })


    test("testing 2", async () => {
        const response = await request(app).get("/jamal")
        expect(response.status).toBe(200);
        expect(response.text).toBe("halooo");
    })
})
// https://chatgpt.com/c/6853d029-256c-8009-b8b1-9bea4591d532

