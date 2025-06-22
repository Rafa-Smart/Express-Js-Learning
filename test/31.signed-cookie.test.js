test("testing", () => {
    expect(3+1).toBe(4)
})

// jadi karena cookie itu bisa diubah ubah di sisi browser, maka perlu kita signed (tanda) dulu cookienya
// artinya kita kasih password dibelakang cookienya

// maka ketika sudah kita kasih sugned, maka setiap value cookie akan ada tandanya yg sudah tidak sama lagi
// kita juga perlu meambhakan secret key yg digunakan ketika proses pembuatan signeature, dan pastikan secret keynya aman
// dan tidka mudah ditebak


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
    res.cookie('login', nama, {signed:true,path:"/login"})
    res.send(`hello ${nama}`)
    // jadi options ini untuk agar kita bisa menggunakan signed, dan juga agar cookie bisa diakses di path /login
    // bisa login/tes, login/user, dll
})

test("testing signed...", async () => {
    const response = await request(app).post('/rafa')
    .set("content-type", "application/json")
    .send({nama:"rafa"})


    expect(response.status).toBe(200);
    expect(response.text).toContain("hello rafa")

    expect(response.get('Set-Cookie')).toContainEqual('login=s%3Arafa.Z%2BpAbE4GryZfi5KlC%2BxsxWGyW%2ByIJGdIVzMxCmiNw0g; Path=/login')
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

// atau bisa pake cara yg mudah, yaitu mneggunakan signedCookies