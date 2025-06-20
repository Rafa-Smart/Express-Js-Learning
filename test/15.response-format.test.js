// res.format({
//   'text/plain' () {
//     res.send('hey')
//   },

//   'text/html' () {
//     res.send('<p>hey</p>')
//   },

//   'application/json' () {
//     res.send({ message: 'hey' })
//   },

//   default () {
//     // log the request and respond with 406
//     res.status(406).send('Not Acceptable')
//   }
// })



// res.format() adalah metode di Express.js untuk melakukan content negotiation, yaitu:

// Menyesuaikan format response (text, html, json, dll) berdasarkan permintaan header Accept dari klien.

import express from "express";
import request from "supertest";
console.clear();

describe("testing response status...", () => {
  const app = express();
  app.get("/rafa", (req, res) => {
    res.format({
      "text/plain"() {
        res.status(200).send("hey");
      },
       default: () => res.status(406).send('format tidak ada')
    });
  });

  app.get("/jamal", (req, res) => {
    res.format({
      "application/json"() {
        res.send({ message: "hey" }).status(200);
      },
      default: () => res.status(406).send('format tidak ada')
    });
  });


  app.get("/siti", (req, res) => {
    res.format({
      "text/html"() {
        res.status(200).send('<p>halooo</p>');
      },
      default: () => res.status(406).send('format tidak ada')
    });
  });

  it("tes 1.", async () => {
    const response = await request(app).get("/rafa");
    expect(response.text).toBe("hey");
    expect(response.status).toBe(200);
    expect(response.get("content-type")).toBe("text/plain; charset=utf-8");
  });



  it("tes 2.", async () => {
    const response = await request(app).get("/jamal");
    expect(response.body).toEqual({message:"hey"});
    expect(response.get("content-type")).toBe("application/json; charset=utf-8");
    expect(response.status).toBe(200);
  });



  it("tes 3.", async () => {
    const response = await request(app).get("/siti");
    expect(response.get("content-type")).toBe("text/html; charset=utf-8");
    expect(response.status).toBe(200);
    expect(response.text).toBe("<p>halooo</p>");


    // response.body biasanya dipakai untuk JSON (.json())
    // response.text untuk respons berbentuk teks atau HTML
  });
});


//  app.get("/rafa", (req, res) => {
//     res.format({
//       "text/plain"() {
//         res.send("hey").status(200);
//       },
//        default: () => res.status(406).send('format tidak ada')
//     });
//   });

// PERNYATAAN INI SUDAH DI VERIVIKASI OLEH SI CHATGPT

// jadi cara kerjanya itu kita akn baca dulu dari si request dia ngirim apa, kao misalkan dia pgennya si response ngirim dalam bentuk json, maka kita akan ngirimkan response dalam bentuk json juga, tapi kalau dia ngirim dalma bentuk text/plain, maka kita jua bisa ngirim text/plain
// dan jika dia minta xml, (saya tidak punya),
// maka akna dikirim pesan defaultnya

// jadi saya punya banyak solusi, saya punya ketika user pengen text/plain, maka saya akan hanya kirim yg text/plain saja
// dan jika user mintanya json, maka saya akan kirim json saja




// res.format({
//   'text/plain': () => res.send('Plain Text'),
//   'text/html': () => res.send('<h1>HTML</h1>'),
//   'application/json': () => res.send({ msg: 'JSON' }),
//   default: () => res.status(406).send('Not Acceptable')
// });

// Klien kirim permintaan dengan header Accept: application/json
// Express lihat objek forma
// Kalau cocok (application/json ada di format), jalankan handler-nya
// Kalau tidak cocok dan default tersedia, jalankan default


//  Penting: .status(200) Harus Dipanggil SEBELUM .format() jika Tidak Ada dalam Handler
// Pada kode kamu:


// res.format({...}).status(200);
// Salah! Karena res.format() sudah menjalankan res.send() di dalam, jadi res.status(200) tidak akan sempat dijalankan (karena response sudah selesai).