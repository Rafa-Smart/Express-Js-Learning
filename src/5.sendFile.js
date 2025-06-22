import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
import request from "supertest";


// disini kita akan mengirimkan file test-file.log
// yg ada di folder public, dan berada di __dirname yg sama dngan file ini
// yaitu src 
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    console.log(`ini __dirname = ${__dirname}`)
    // ini __dirname = c:\DATA-DATA-PEMBELAJARAN-PEMROGRAMAN\FRAMEWORK_JS_2025\belajar-materi-Express-Js\src
    // C:\DATA-DATA-PEMBELAJARAN-PEMROGRAMAN\FRAMEWORK_JS_2025\belajar-materi-Express-Js\src



const app = express();
// jadi maksudnya adalah kita ambil
// /file/nama filenya dan diakhiri dengan .log
app.get(/^\/file\/(.+\.log)$/, (req, res, next) => { 
    // disini kia pake method next, agar bisa dipangil ketika error mengiri file
    
    const namaFile = req.params[0];
    res.sendFile(namaFile, {root:path.join(__dirname, 'public')}, (err) => {
        if(err) {
            next(err)
        } else {
            console.log("file berhasil di kirim", namaFile)
        }
    })
    // tempat kita menaruh menaruh file yg ingin ktia kirim

    // jadi kita ambil nama file dari req.params[0]
    // jadi kita harus punya filenya dulu di folder test kita

    // jadi gini kita punya folder public yg isinya banyak file salahsatunya 
    // test-file.log yg sudah ada di foldernya
    // dan diminta dari si clientnya, nah itulah yg akan kita kirim

})

app.listen(3000, () => {
    console.log('server jalan di port 3000...')
})