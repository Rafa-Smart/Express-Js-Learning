// jika terjadi error pada express kita
// maka akn otomatis ditangkap oleh si expressnya
// lalu detail errornya akna ditampilan di response nya secara otomatis
// nah pad akasus seperti ini untungnya di express memiliki middleware
// yang bernama error handler 
// handler itu maksudnya adalah function callback

// nah pada middleware ini ada 4 parameter yaitu yg diawali dengan err,res,req,next
// pake itu aja ya urutannya (mengikuti mayoritas library di nodejs)

import express from "express";
import request from "supertest";

const app = express();

const errorMiddleware = (err, req, res, next) => {
    // disini erronya bisa kita abstraksi 
    res.status(500).send(`Terjadi Error: ${err.message}`);

    // dan disini kita ga pake next agar langsung brehenti
};

// jadi kalo dirouter yg dikasih middleware ini, maka ketika
// router itu ada throw error maka errornya akna masuk ke parameter err di imddleware
// dan bisa kita akses

app.get('/', (req, res) => {
    // ini sengaja error
    throw new Error("Ups");
});

app.use(errorMiddleware);

test("Test Response", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Terjadi Error: Ups");
});


// nah biasanya ketika da error, maka errornya akan masuk ke halaman (biasanya)
// maka disini kita handling errornya