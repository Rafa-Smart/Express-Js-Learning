
// pada response body
// ada yagn sudah kita coba sebelumnya
// dan ada lagi yg lain
// res.download = response berupa file download
// res.senfFile = response berupa file


// nah bedanaya adalah ketika kita menggunakan res.download
// maka akn diberikan filenya, tapi akan langsung di paksa untuk di download
// kalo kita menggunakan res.sendFile maka akn diberikan juga filenya
// tapi tidak akan dipaksa untuk di download

// jadi kalo kita pake res.sendFile misal html
// maka akan dirender di browser file htmlnya

// tapi kalo msialkan res.download maka akan di download saja file htmlnya

import express from 'express';
import path from "path";
import request from "supertest";


// disini kita akan mengirimkan file test-file.log
// yg ada di folder public, dan berada di __dirname yg sama dngan file ini
// yaitu test 

test("testing 1...", () => {
    console.log(__dirname)

    // kalo __dirname nya ga ada, maka kita manual aja pake yg seperti di src/5.sendFile.js
    // C:\DATA-DATA-PEMBELAJARAN-PEMROGRAMAN\FRAMEWORK_JS_2025\belajar-materi-Express-Js\test
})


const app = express();

//  disini buat midleware kallo error atau jika routenya ga ada

// jadi maksudnya adalah kita ambil
// /file/nama filenya dan diakhiri dengan .log
app.get(/^\/file\/(.+\.log)$/, (req, res, next) => { 
    // disini kia pake method next, agar bisa dipangil ketika error mengiri file
    
    const namaFile = req.params[0];
    res.sendFile(namaFile, {root:path.join(__dirname, 'public')}, (err) => {
        if(err) {
            // ini aka memangil middleware error handler
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

app.use((req, res, next) => {
    res.status(500).send("route tidak ada")
})

test("testing sendFile...", async () => {
    const response = await request(app).get("/file/test-file.log");
    expect(response.status).toBe(200);
    expect(response.text).toContain("haloo ini dari file log");
})


test("tess 2...", async () => {
    const response = await request(app).get("/salah");
    expect(response.status).toBe(500)
    expect(response.text).toBe("route tidak ada")
})
