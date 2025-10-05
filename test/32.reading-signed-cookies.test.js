test("testing", () => {
    expect(3+1).toBe(4)
})

// cra membaca signed cookie

import express from 'express';
import cookieParser from 'cookie-parser';
import request from 'supertest';

console.clear()

const app = express();

app.use(express.json())
// agar kita bisa menggunakan req.body
app.use(cookieParser("ini secret key")) // disini kita gunakan cookieParser agar bis amneggunakan header cookie, dan juga untuk bsia memberikan signed pada cookie valuenya

app.post('/rafa', (req, res) => {
    const nama = req.body.nama
    res.cookie('login', nama, {signed:true,path:"/"})
    // maka value cookie login ini akan di signed
    res.send(`hello ${nama}`)
    // jadi options ini untuk agar kita bisa menggunakan signed, dan juga agar cookie bisa diakses di path /login
    // bisa login/tes, login/user, dll
})

// buat middleware
app.use('/tes',(req, res, next) => {
    // disini kalo kita set cookienya dan pathya /login
    // maka ga akan masuk ke route ini, masuk tapi(cookienya g ada)
    // karena route yg berlakunya hanya /login/apa, /login/user, dll



    // jadi kal kita ngambil data lansung dari req.cookies maka akan 
    // isinya akan terdapat data signednya
    // makanya kita bisa otomatis emnggunakan signedCookies
    // agar otomatis di signed ulang dan diambil datanya

    // jadi kalo misalakn rata cookienya bisa diparser, maka artinya cookienya
    // ga  dirubah
    // tapi kalo ga bisa di parser, maka berati data cookie nya sempat dirubah di sisi browser

    if(req.signedCookies.login == "jamal"){
        next()
    } else {
        res.send(404)
    }
})

app.get("/tes", (req,res) => {
    // nah kita ga bsia mengambil data cookie secara langsung, karena kita menggunakan signed
    // maka akn ada data signednya
    // jadi kita bisa parsing dulu otomais emngunakan atribut signedCookies ini
    const cookie = req.signedCookies.login
    res.send(`haloo ${cookie}`)

})

test("testing signed 1 ...", async () => {
    const response = await request(app).post('/rafa')
    .set("content-type", "application/json")
    .send({nama:"rafa"})


    expect(response.status).toBe(200);
    expect(response.text).toContain("hello rafa")

    expect(response.get('Set-Cookie')).toContainEqual('login=s%3Arafa.Z%2BpAbE4GryZfi5KlC%2BxsxWGyW%2ByIJGdIVzMxCmiNw0g; Path=/')
    console.log(response.get('Set-Cookie'))

    // karena ini array
    // maka kita juga bsia cek deng string lagi dengna to Contain
    expect(response.get("Set-Cookie").toString()).toContain("login=s%3Arafa")
    // Received array: ["login=s%3Arafa.Z%2BpAbE4GryZfi5KlC%2BxsxWGyW%2ByIJGdIVzMxCmiNw0g; Path=/login"]

})

// nah jadi nanti ketika kita test di server, cookie yg masuk, maka kita harus ubah lagi value cookienya
// dengna cara kita ambil lagi value cookie, 
// lalu kita signed lagi dengan secret key yang sama
// maka jika sama berati valid, jika tidak maka tidak valid



test("test signed berhasil...", async () => {

    // disini kita buat agar si client ini (simlasinya)
    // sudha pernah login di server kita
    // ke router /rafa
    // yg otomatis di router ini kita akn berikan dia 
    // cookie yg sudah di signed
    const agent = request.agent(app)
    await agent.post('/rafa')
    .set("content-type", "application/json")
    .send({nama:"jamal"})

    // jadi kita test ketika dia ke get(/tes)
    // maka kita harap dia akan sudah pernah mengapatkan cookie
    // cookie yg sudah di signed, dan route /tes
    // itu kita parse cookie yg sudah di signednya menggunakan signedCookies
    // dan kita kirim lagi ke si agentnya haloo jamal

    const response = await agent.get("/tes")
    expect(response.status).toBe(200);
    expect(response.text).toContain("haloo jamal");


})



// Test kamu gagal karena middleware ini tidak dijalankan untuk path /tes secara efektif:


// app.use('/tes', (req, res, next) => {
//   if (req.signedCookies.login == "jamal") {
//     next()
//   } else {
//     res.send(404)
//   }
// })
// Namun cookie kamu didefinisikan hanya bisa diakses pada path /login:


// res.cookie('login', nama, {signed:true, path:"/login"})
// Masalah Utama:
// Signed cookie kamu hanya tersedia untuk path /login dan turunannya, sedangkan kamu ingin membacanya di path /tes.

// ingat karena signed cookie hanya bisa diakses di path yang sama saja
// yang sudah kita definisikan yaitu di '/login'
// selain itu maka cookienya tidak akan tersedia

// oleh karena it kia '/' sjaa


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