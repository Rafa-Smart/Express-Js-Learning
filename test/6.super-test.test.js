// jadi cara menggunakan super test ini adalah

// request() adalah fungsi utama dari library Supertest, yang digunakan untuk:
// 1. Melakukan simulasi HTTP request ke aplikasi Express atau HTTP server
// 2. Menguji endpoint seolah-olah seperti client (misalnya Postman / browser), tapi dilakukan dari dalam kode

// syntax dasar
// request(app) --> Membungkus aplikasi Express/HTTP agar bisa dikirimi request simulasi
//   .get('/user') --> simulasi Kirim request HTTP GET ke /user
//   .expect(...)
//   .end(...) --> 	Fungsi callback akhir setelah request dijalankan

import express from "express";
import request from "supertest"

const app = express();

// disini kit buat dulu

app.get("/user", function (req, res) {
  res.status(200);
  res.json({ name: "john" });

  //   jadi ketika kita tulis seperti itu maka,
  // artinya sama saja kita seperti res.send();
  // tapi bedanya ini sudah di konversi, jadi dari json -> menjadi string
  // { "name": 'john' }   -> '{"name":"john"}'
  // inget karena kalo kit di http itu kirimnya pake buffer klo engga string

  // dan juga sudah otomatis mengeset si headernya mnejadi
  // Content-Type: application/json; charset=utf-8

  // begini alur dibaliknya

  //   res.json = function json(obj) {
  //     const val = JSON.stringify(obj);
  //     this.set("Content-Type", "application/json");
  //     return this.send(val);
  //   };
});

describe("1.testing...", () => {
  test("testing normal...", (done) => { // tambahkan untuk si done yg dibawah
    request(app)
      .get("/user") // nah tadi kan sudah kita buat app.get("/user")
      // maka disini kita akn simulasikan / cek jika ada request yg masuk ke "/user" -> method get, maka
      .expect(200) // disini kenapa kita langsung test dengan expect 200,
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        // else
        console.log(res.status); // 200
        console.log(res.body); // { name: 'john' }
        console.log(res.headers); // semua header HTTP

        done() //Kamu memberi tahu Jest bahwa test asynchronous ini belum selesai sampai done() dipanggil.
        

        // ohhjadi kalo masuk ke if, maka tetap dijalnakan si errornya
        // dan kalo else maka tetap dijalankan juga si done() nya


      });

      // PENTING
      // emang wajib pake si done, kalo mau .end()

    //   nah kalo seperti ini(tanpa await), maka haru sneggunakna .end()sebagai akhir dari requestnya
    // dan sebagai tanda bahwa testnya sudah selesai

    // karena jika tidak menggunakan .end()maka test tidak akan dijalankan
    // karena dianggap belum selesai
    // KECUALI JIKA PAKE AWAIT
    // DAN KALO PAKE RETURN, MAKA HARUS JUGA PAKE THEN DAN TIDAK MENGGUNAKAN .END()


      // PENJELASN

    // Karena Supertest menyederhanakan semuanya:
    // Ia secara internal menjalankan request ke server
    // Kemudian mengambil objek response
    // Dan otomatis mengecek nilai-nilai tertentu (status, header, body) menggunakan .expect(...)

    // nih conothnya, jadi langusng di pilih dan di tentukan
    // bahwa ini tuh masuknya header,status code, atau yg lain
    // .expect(200); // Harap response memiliki HTTP status 200
    // .expect("Content-Type", /json/); // Regex cocokkan header
    // .expect({ name: "john" }); // Harap body JSON cocokkan dengan
  });

  // jadi penjelasannya kita akan mengetes si app ini (tanpa menjalankannya);
  // pertama kita masukan dulu ke request
  // kemudian kita set bahwa app ini ketika get("/");
  // maka expetasinya adalah 200
});
