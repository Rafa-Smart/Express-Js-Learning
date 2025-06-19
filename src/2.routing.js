// jadi  biasanya ektika kita ingin membuat aplikasi, kita sering membuat banyak sekkali url path

// nah jadi routing adalah teknik yg digunakan unutk meneruskna request dari url path ke callback 
// yg kita tuju (dalam hal ini misalnya callbacknya itu berisi halaman html)

// nah routing di express js itu mneggunakan objek buatan dari si function express() -> app
// dan menggunakan method sesuai dengan nama http methodnya
// misal app.get() -> http method get dll



// CONNECT -> ketika connect
// DELETE
// GET
// HEAD
// OPTIONS
// PATCH
// POST
// PUT
// TRACE

// atau ada juga yg 
// ALL -> apapun path routingnya maka jalankan calback ini misalnya

// dan isinya itu 
// app.get(Path2D, callback)


import express from "express";

const app = express();

// nah disini kita akan coba membuat routing

// nah jadi maksdnya adalah ketika ada user atau request masuk dengna routing / (default);
// maka kitakan menjalankan fungsi callback ini
app.get("/", (req, res) => {
    res.json({"nama":"rafa"})
    // ini akan memberikan pesan dan kmu juga bisa masukan html disini
})

// nah kalo ada app.get dengan method dan callbcak yg sama, maka nanti yg akna di gunakan maka prioritasnya adalah yang paling pertama diambahkan yaitu yg paling atas

app.get('/rafa', (req,res) => {
    res.send("hello rafa")
})

app.get("/putri", (req, res) => {
    res.send("hello putrii")
})


app.listen(3000, () => console.log("server running on port 3000...."))