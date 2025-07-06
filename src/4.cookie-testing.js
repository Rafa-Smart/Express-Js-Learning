import express from 'express';
import cookieParser from 'cookie-parser';



const app = express();

app.use(cookieParser())

app.get('/set-cookie', (req, res) => {

    // pake dari si middleware cookie parser aja
    res.cookie("nama","rafa", {maxAge:500000}) // 5000 detik
    // console.log(res.cookie("nama"))
    // console.log(res.header('cookie'))

    // res.set("set-cookie","nama=rafa", {maxAge:5000}) // 5000 detik
    // console.log(req.get("set-cookie"))
    // disini masih undefined ya
    res.send(`data cookie sudah di set `)

    // masih belum ada cookienya
    // karena kita baru masuk ke routing yg tugasnya masukin cookie, jadi belum otomati ada
    // nanti adanya ketika kamu request lagi
})

app.get("/tolak", (req,res) => {
    res.send("tidak adaa")
})


app.use('/get-cookie', (req,res,next) => {
    if(!req.cookies.nama){
        res.status(302).redirect("/tolak").end()
    }
    next()
})


app.get('/get-cookie', (req, res) => {
    console.log(req.get("set-cookie"))
    res.send(`sudah ada cookie ${req.cookies.nama}`)
})

app.get('/clear', (req, res) => {
    res.clearCookie("nama");
    res.send("cookie sudah di hapus", req.cookies.nama)
})


app.listen(3000, () => console.log("jalan....."))


// jadi pertama itu kamu masuk dulu ke set, baru nanti ke get



// okee
// jadi kalo mau ngetes itu harus sambil buka dulu applicationnya ya
// jadi pas langsung ke get (ketika cookienya ga ada (sebelum ke set)) maka akn langusng
// redirect ke tolak

// tapi ketika ada maka bisa masuk ke getnya
// dan nanti jangan lupa ketika nyoba nyoba terus clear dulu si cookienya
// klik kanan clear