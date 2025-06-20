// https://chatgpt.com/c/68550d79-608c-8009-ab66-1327af64ddc8

// Middleware adalah fungsi yang memiliki akses ke:
// 1. req (request object),
// 2. res (response object),
// 3. dan fungsi next() yang digunakan untuk melanjutkan ke middleware berikutnya.

// BAGAIMANA CARA KERJANYA?
// 1. Saat request dikirim ke server Express (misal GET /home),
// 2. Express akan mengecek apakah ada middleware yang terdaftar (app.use() atau app.get(), dll),
// 3. Middleware akan dieksekusi satu per satu secara berurutan,

// Setiap middleware bisa:
// memodifikasi objek req dan res,
// menghentikan request (tanpa lanjut),
// atau melanjutkan ke middleware berikutnya dengan next().

// Express membuat semacam "middleware pipeline" — semacam rantai fungsi
//  yang dijalankan satu demi satu. Setiap fungsi dalam rantai akan
//  menunggu next() dipanggil sebelum fungsi berikutnya dieksekusi.

// dan middleware ini penting untuk
// | Memisahkan logika: Logging, auth, validasi, dll
// | Membuat kode lebih modular dan reusable
// | Memudahkan debugging
// | Wajib untuk fitur seperti autentikasi, logging, parsing body, dll

// dan middleware ini memiliki function next(), yg jika di panggil maka akan lanjut eksekusi middleware berikutnya atau pun jika tidak ada middleware selanjutnya, maka akan eksekusi router berikutnya

// web request (request dari user) ->
// ditangkap middleware 1 -> (pake method next()) ->
// middleware 2 ->
// pake method next() ->
// router -> respon ke user

// nah fungsinya itu kita bisa mengeksekusi kode sebelum router dieksekusi
// mnegubah request / response sebelum router di eksekusi
// mengaakhiri response tanpa harus mengeksekusi router

// dari pada kita ceknya di router mending di middleware

// jdai semau routing yg dibuat, maka kan melalui middleware dulu baru ke routing tersebut

// jadi misal untuk cek login, kalo ada user dari request ingin masuk ke website, nah kita cek dulu apakah dia udah login atau belum, jika belum maka kita reject requestnya dan beri 404/dll

// jadi middleware itu parameternya ada 3 yaitu
// 1. req (request object)
// 2. res (response object)
// 3. method next() -> maka dia akna memanggil, maka bisa jadi diaa menmanggil middleware (kalo ada)
// selanjutnya, atau memanggil router, atau menghentikan requestnya saja


import express from 'express';
import request from 'supertest';



// contoh middlleware
const logger = (req, res, next) => {
    console.log(`menerima request ${req.method} ${req.url}`);
    next()
};


function init (req, res, next) {
    res.set({
        "content-type":"application/json",
        'x-powered-by': "rafa khadafi"
    })
    next()
}

const app = express();

// nah cara menggunakannya itu mnegggunkaan app.use()
// app.use() adalah fungsi penting dalam Express.js yang digunakan untuk 
// mendaftarkan middleware. Middleware adalah fungsi perantara yang 
// memproses permintaan (request) sebelum sampai ke rute yang diminta 
// atau sebelum merespons.

// app.use([path], middleware1, middleware2, ...);
// path (opsional): Jalur (path) tertentu untuk menjalankan middleware. 
// Jika tidak ditulis, maka path-nya adalah '/', artinya middleware 
// dijalankan untuk semua request.

// cara pake
// app.use('/some-path', midlew1, midlew2);
// atau 
// const arr = [mw1, mw2];
// app.use('/path', arr);

app.use(logger); // untuk semua router
app.use(init); // untuk semau router


app.get("/rafa", (req,res) => {
    res.json({email:"rafakhadafi1205@gmail.com"})
})

test("test response middleware..", async () => {
    const response = await request(app).get("/rafa");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({email:"rafakhadafi1205@gmail.com"});
    expect(response.get("content-type")).toContain("json")
    expect(response.get('x-powered-by')).toBe("rafa khadafi")
} )

