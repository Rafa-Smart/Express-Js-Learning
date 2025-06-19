// superagent adalah library HTTP client untuk Node.js dan browser, digunakan untuk melakukan request HTTP seperti GET, POST, dll.

// https://chatgpt.com/c/6853e204-4da8-8009-b088-a730e1188b5f

// supertest adalah library yang digunakan untuk testing aplikasi Express. supertest dibangun di atas superagent, dan menyediakan integrasi langsung dengan Express apps.

// 1. Apa itu superagent?
// superagent adalah modul untuk melakukan request HTTP dengan cara yang lebih elegan dan powerful.

// Contoh:
// const superagent = require('superagent');

// superagent
//   .get('https://jsonplaceholder.typicode.com/posts/1')
//   .then(res => console.log(res.body))
//   .catch(err => console.error(err));

// contohnya

import express from "express";
import request from "supertest"

const app = express();

app.get("/hello", (req, res) => {
  res.status(200).json({ message: "Hello, world!" });
});

describe("GET /hello", () => {
  it("should respond with JSON", async () => {
    const response = await request(app)
      .get("/hello") // <- superagent bekerja di balik layar
      .expect("Content-Type", /json/)
      .expect(200)
      
    console.log(response.body); // { message: 'Hello, world!' }
  });
});

// maka dibalik layar sebenarnya itu seperti ini
// superagent
//   .get("http://localhost:3000/hello") // harus jalanin server secara manual
//   .then((res) => {
//     console.log(res.body);
//   });

// request(app).get('/hello') -> superagent.get('/hello') // secara internal
