// biasanya ketika kita inign melakukan redirect dari sebuah web ke suatu
// halaman kita bisa menggunaka http header location

// nah di express kita juga bisa mneggunakan header location untuk melakukan redirect
// atau bisa juga menggunaakn res.redirect(to)
// dan status codenya itu 3xx

import express from "express";
import request from "supertest";
console.clear()
const app = express();

app.get('/', (req, res) => {
    // res.redirect('/to-next-page');
    // atau bisa juga menggunakan res.status(301).redirect('/to-next-page');
    // atau bisa juga
    // res.redirect(301, 'to/-next-page')
    // atau kalo mau ke halaman lain juga bisa
    // res.redirect('https://github.com/')

    // bisa juga
    // res.header('location', '/to-next-page').status(301).end()
    // kalo header itu defaultnya di express status codenya 200

    // bisa juga gini

    res.set("location", "/to-next-page").status(301).end()
});


app.get("/jamal", (req, res) => {
    res.redirect('/to-next-page-2').end()

    // kalo di express untuk yg res.redirect itu defaultnya status codenya 302
})

test("Test Response Redirect 1", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(301);
    // jadi nama headernya itu adalah location

    expect(response.get('location')).toBe('/to-next-page');
});

test("Test Response Redirect 2", async () => {
    const response = await request(app).get("/jamal");
    expect(response.status).toBe(302);
    // jadi nama headernya itu adalah location

    expect(response.get('location')).toBe('/to-next-page-2');
});