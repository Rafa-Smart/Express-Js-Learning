// request url

// jadi kita bisa mendapatkan informasi tentang url saat ini
// ada panyak sekali
// req.url	         =  Path lengkap + query
// req.originalUrl	 =  URL asli termasuk prefix route/middleware
// req.path	Hanya    =  bagian path, tanpa query
// req.baseUrl	     =  URL dasar ketika dalam router
// req.hostname	     =  Mendapatkan hostname / domain
// req.protocol	     =  Protokol HTTP/HTTPS
// req.secure	     =  Boolean: apakah menggunakan HTTPS
// req.query	     =  Objek parameter query

import express from "express";
import request from "supertest";
console.clear();
const app = express();
app.get("/hello/world", (req, res) => {
  res.json({
    url: req.url,
    originalUrl: req.originalUrl,
    path: req.path,
    baseUrl: req.baseUrl,
    hostname: req.hostname,
    protocol: req.protocol,
    secure: req.secure,
    query: req.query,
  });
});

describe("teesting url", () => {
  test("test 1...", async () =>  {
    const response = await request(app)
      .get("/hello/world")
      .query({ name: "rafa", kelas: "10pplg2" });

    // expect(response.body).toContainEqual({
    //   path: "/hello/world"
    // });
    
    // itu ga bisa karena bukan array

    // tapi bisa pake ini
    expect(response.body).toMatchObject({
      path: "/hello/world"
    })
    
    // expect(response.body).toContainEqual({
    //   path: "/hello/world"
    // });
    // jadi kita bisa pake ini aja
    expect(response.body.path).toBe("/hello/world");

    // ini ga bisa jadi kita pake test selanjutnya
    // console.table(`dari si file 10 : ${response.body.baseUrl}`)
  });

  test("test 2...", (done) => {
    request(app)
      .get("/hello/world")
      .query({ name: "rafa", kelas: "10pplg2" })
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
        //   console.log(res); // ini bakalan panjang bangett
          console.table(res.body);
          done();
        }
      });
  });
});

// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test

// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test