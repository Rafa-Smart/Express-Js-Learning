// Cookie adalah data kecil yang disimpan di sisi klien (browser) dan dikirimkan bersama setiap permintaan HTTP ke server.

// https://chatgpt.com/c/6856a636-47d4-8009-81d9-de0d2c030da9

// Di Express.js, cookie digunakan untuk:
// Menyimpan informasi sesi login.
// Menyimpan data pengguna sementara (seperti preferensi bahasa, status login).
// Mengidentifikasi klien secara unik.
// Tracking aktivitas pengguna

// 1.
// jadi sebenarnya server itu tidak tau bahwa kita prenah login atau tidak sebelumnya
// misal ada route /client, nah dengan syarat bahwa siapapun yg memasuki route /client harus login terlebih dahulu, nah karena server tidak tahu bahwa kita pernah login atau belum
// maka server mengetahuinya dengna cara melihat cookie yg ada pada request si clientnya
// jika si client ini mempunyai cookie login yg diberikan oleh si respons, pada route sebelumnya
// dan di test bahwa cookie ini valid, maka si client boleh masuk ke route /client
// jika tidak maka arahkan lagi ke route / login

// 2.
// jadi cookie itu adalah informasi atau data yg di berikan dari serer melalui response, ke client dan otomatis disimpan di browsernya,
// dan ketika si user ini ingin melakukan request lagi maka dia akan merequest dengn menyertakan header cookie didalamnya, dan server akn memvalidasi cookie tersebut

// 3.
// dan ingat bahwa cookie yg ada di browser itu bisa diubah ubah dari sisi clientnya
// jadi ketika kita punya halaman yg hanya bisa diakses oleh user yg sudah login
// menggunakan cookie
// mkaa kita harus cek bahwa apakah cookie itu benar yg ita kirimkan dari response sebelumnya
// karena cookie itu bisa dirubah rubah dari sisi clienntnya
// jadi kita harus cek apakah cookie itu valid atau tidak

// begini diagramnya

// 1. client/web browser --> (melakukan request ke server) --> server (menerima)
// 2. server mengirim response succes dan (disertai cookie) --> client/web browser (menerima)
// 3. client/web browser --> (melakukan request ke server (dengan cookie)) --> server (menerima)
// atau
// 4. client/web browser --> (melakukan request ke server (tidak dgn cookie)) --> server (tolak)

// dan cookie ini ditempatkan di header request nya, yaitu set-cookie

// tapi di express js ini tidak bisa secara otomatis mengelola cookie
// oleh karena itu kita membutuhkan third-party-middleware -> cookie-parser

import express from "express";
import cookieParser from "cookie-parser";
import request from "supertest";

const app = express();
const PORT = 3000;
console.clear();

// kita masukan ke app.use
app.use(cookieParser());

// SET COOKIE
app.get("/set-cookie", (req, res) => {
  res.cookie("user", "rafa", { maxAge: 60000 }); // 1 menit
  // jadi maksimal cookie ada di request ini selama 1 menit
  // setelah itu akan hilang
  res.send(`Cookie sudah diset! ${res.cookie}`);
});

// GET COOKIE
app.get("/get-cookie", (req, res) => {
  const user = req.cookies.user;
  res.send(`Cookie yang diterima: ${user}`);
});

// CLEAR COOKIE
app.get("/clear-cookie", (req, res) => {
  res.clearCookie("user");
  res.send("Cookie dihapus");
});

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

// app.test.js

describe("Testing Cookie di Express.js", () => {



  // nah disini untuk melakukan pengetesan berurutan. kita bisa pake browser buatan (mini)
  // dengan cara
  // request.agent(app)
  // 1. Agent adalah seperti "browser mini"
  // Saat kamu menggunakan request(app).get(...), itu hanya satu kali permintaan — tanpa menyimpan cookie antar request.

    //   nah jadi agent menyimpan state seperti cookie, header, dll.
    // Setiap permintaan selanjutnya dari agent akan menyertakan cookie yang sebelumnya diterima.
    // Sama seperti browser yang otomatis menyertakan cookie di setiap request setelah login atau preferensi disetel.

    // jadi kita itu seperti membuat browser mini, yg bisa membuat request, menyimpan data cookie, dan lain lain dnegna cara tadi

    // nanti kita setiap kali mau ngetes, harus pake ini

    // jadi disetiap testing, kita buat browsernya

    // jadi di set, seelumnya null dan setiap test kita set menjadi agent
    let browserMini
    beforeEach(() => {
        // disini kita setting
        browserMini = request.agent(app)
    })
    afterEach(() => {
      browserMini = null;
    })


  it("should set a cookie", async () => {
    // bisa juga gini
    // const res = await browserMini.get('/set-cookie');
    // jadi gausah pake request(app)
    // gausah didaftarin lagi si appnya, kan tadi sudah seelumnya

    const res = await request(app).get("/set-cookie");
    expect(res.statusCode).toBe(200);
    expect(res.headers["set-cookie"][0]).toMatch(/user=rafa/);
    //jadi set-cookie itu nanti bakal jadi array
    // ['key=value','key=value','key=value']
    console.log(res.headers["set-cookie"][0]);
    // user=rafa; Max-Age=60; Path=/; Expires=Sat, 21 Jun 2025 13:08:50 GMT

    expect(res.text).toContain("Cookie sudah diset!");

    console.log(res.headers["set-cookie"]);
    // [
    //     'user=rafa; Max-Age=60; Path=/; Expires=Sat, 21 Jun 2025 13:09:20 GMT'
    // ]
  });

  it("mendapatkan cookie...", async () => {
    // nah disini kita setting bawah sebelumnya si client ini
    // pernah mengakses route /set-cookie

    // atau kalo mau disetiap testnya bikin juga gapapa

    // const browserMini = request.agent(app)

    await browserMini.get('/set-cookie');

    // kemudian baru kita test, ketika dia masuk ke route /get-cookie
    // harusnya di requestnya sudah disisipkan cookie user=rafa oleh
    // si response di route /set-cookie
    const response = await browserMini.get("/get-cookie");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Cookie yang diterima: rafa");
  });

  it("menghapus cookie...", async () => {
    await browserMini.get("/set-cookie");
    await browserMini.get('/clear-cookie')
    // jadi jadi diatas ini maksudnya itu, kita set kalo dia udah masuk ke router 
    // /set-cookie (otomatis dikasih cookie)
    // lalu asuk ke route /clear-cookie (otomatis hapus cookie);

    const response = await browserMini.get('/get-cookie');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Cookie yang diterima: undefined')


  })



});
