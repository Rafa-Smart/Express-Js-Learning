import express from "express";
import request from "supertest";

const app = express();
app.get("/users", (req, res) => {
  res.json({ email: "foo@bar.com" });
  //  ini otomatis dibuatkan 'Content-Type', /json/ / application/json dan juga charsetnya (utf-8)
});

describe("GET /users", function () {
  it("menggunakan promises dan then", function () {
    return request(app)
      .get("/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.email).toEqual("foo@bar.com");
      })
      .catch((err) => {
        console.error("Terjadi error:", err.message);
        throw err; // penting agar Jest tetap fail
      });
  });
});

// nah jadi
// request(app).get(...).expect(...).then(...) → mengembalikan Promise
// Dengan return, kamu memberi tahu Jest: "Tunggu hingga Promise ini selesai"
// Bila expect() gagal → Jest langsung menangkap error & test akan GAGAL

// dan bisa jga menambahkan catch, dan tetap harus throw err
// .catch(err => {
//   console.error('Terjadi error:', err.message);
//   throw err; // penting agar Jest tetap fail
// });

// https://chatgpt.com/c/6853d029-256c-8009-b8b1-9bea4591d532
