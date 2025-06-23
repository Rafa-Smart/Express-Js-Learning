// terkdang kita inign menmapilkan file static seperti html, css, javascript
// gambar, dll 

// dan untungnya kita mempunyai middleware express.static() yang dapat membantu kita 
// menampilkan file static dengan mudah.

// jadi funsgi middleware ini adalah akan otomatis mencari file static yg ada, dan akna mngembalikna file tersbeut jika ketemu, tapi kalo tidak ada maka akna dilanjutkan ke middleware selanjutnya atau route selanjutnya

// https://chatgpt.com/c/6858072d-ba60-8009-a40a-9e6117ff18b5
// Properti	        Fungsi
// dotfiles	        Menentukan perlakuan terhadap file tersembunyi (.)
// etag	            Mengaktifkan/menonaktifkan ETag untuk cache
// extensions	    Otomatis menambahkan ekstensi jika tidak ada
// index	        Mengatur apakah file index.html otomatis ditampilkan
// maxAge	        Mengatur lama file disimpan di cache browser
// redirect	        Menentukan apakah trailing slash akan diarahkan otomatis
// setHeaders	    Menambahkan header khusus ke setiap response file statis


// jadi fungsinya itu adalh
//  Melayani file statis langsung ke browser.

// Jika kamu punya folder public/ berisi file style.css, maka:
// app.use(express.static('public'))
// Akan membuat file style.css bisa diakses lewat:
// http://localhost:3000/style.css


// Tanpa express.static:
// File seperti logo.png, style.css, script.js tidak akan bisa diakses dari browser.
// Express hanya merespons route dynamic (GET /, POST /login, dll).
// Dengan express.static:
// Kamu beri tahu Express: "Kalau ada permintaan file, ambil dari folder ini ya."
// Tidak perlu bikin route manual untuk tiap file


// APA ITU FILE STATIS SEBENARNYA?
// File statis = file yang tidak berubah oleh kode server. Server hanya "mengambil lalu kirim".
// Berbeda dengan:
// Dynamic HTML: di-render dari template atau data
// Response dari API: dibentuk dari database


// jadi ada folder public yg isinya itu adalah file file static seeprti html,css,dll
// Client mengakses URL, misalnya:
// GET /style.css
// Express akan cocokkan path itu dengan path di folder yang kamu daftarkan di express.static().
// Jika ditemukan file:
// Express akan membaca file dengan fs.readFile()
// Menyisipkan header seperti:
    // Content-Type
    // Content-Length
    // Last-Modified
// Lalu mengirimkan file ke browser.
// Jika file tidak ditemukan:
// Middleware lanjut ke next handler (bisa 404, error, dll).

// express.static()	                    res.sendFile()
// 1.Melayani banyak file statis        mengirim satu file tertentu 
// 2.middleware otomatis	            Method manual pada objek response
// secara otomatis	                    secara spesifik
// 3.Untuk folder seperti /public,      Untuk file tertentu yang
// /assets, /static	                    dikirim dalam route
// 4.Auto-cocokkan URL dengan           Kamu tentukan manual
// path file	                        path-nya
// 5.Tidak perlu buat route manual	    Harus buat route manual
// Optimal untuk banyak file statis	    Kurang efisien jika digunakan untuk banyak file
// 

// contoh penggunaan express.static()
// app.use(express.static('public'))
// Browser akses:

// http://localhost:3000/style.css  => public/style.css
// http://localhost:3000/logo.png   => public/logo.png


// Contoh res.sendFile()

// app.get('/logo', (req, res) => {
//   res.sendFile(__dirname + '/public/logo.png')
// })
// Browser akses:

// http://localhost:3000/logo => mengirim file logo.png



// jadi kita bisa membaut satu folder, nah kita bi mengakses isi file didalam folder ini
// hanya dari url
// misal nya kita punya folder public, kita bisa mengakses isi folder public dari url
// jadi kalo kita masukan nama file misal nya style.css, maka kita bisa mengakses file style.css dari folder public, yg akan ditampilkan ke website

import express from 'express'
import path from 'path'
import request from 'supertest';
import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename)
// gausah pake ini karena di express sudah otomatis ada si __dirnamenya

console.clear();

const app = express();
app.use(express.static(path.join(__dirname, "static")))
// disini kita masukan nama foldernya agar seluruh isi file dari folder tersbut
// bisa kita akses lewat url, ini harus relatif ya

app.get("/rafa", (req, res) => {
    // jadi yg pertama itu di cari dulu di middlewarenya ya
    // misal ada yg akses /rafa, nah ini tuh dicari dulu di folder statisnya
    // ada ga kalo ga ada maka baru masuk ke router /rafa


    res.status(200).send("hello response")
    // jadi kalo kita akses /rafa saja
    // maka akn muncul haloo response

    // tapi kalo kita akses /style.css,
    // maka akan muncul file style.cssnya
    // jadi kita ga perlu buat routenya
})

test("testing 1...", async () => {
    const response = await request(app).get("/rafa");
    expect(response.text).toBe("hello response");
    expect(response.status).toBe(200)
})
test("testing 2...", async () => {

    // disini kita coba akses file style.css
    const response = await request(app).get("/style.css");
    // kalo ga ketemu maka akn lanjut ke middlware atau route selanjutna
    // atau middleware err
    // expect(response.text).toContain('*{\n\tborder: none;·\n\tpadding: 0;·\n\tmargin: 0;·\n}');
    expect(response.text).toMatch(/border: none;/);
    expect(response.status).toBe(200)
})

// dan kalo ga ada ternyata kirim ini

    // expect(received).toContain(expected) // indexOf

    // Expected substring: "*{border: none;padding: 0;margin: 0;}"   
    
    
    // Received string:    "<!DOCTYPE html>
    // <html lang=\"en\">
    // <head>
    // <meta charset=\"utf-8\">
    // <title>Error</title>
    // </head>
    // <body>
    // <pre>Cannot GET /rafa/style.css</pre>
    // </body>
    // </html>
    // "

//  Opsi B: Prefix /rafa untuk static
// Kalau kamu memang mau file diakses dari /rafa/style.css, maka ubah ini:

// app.use(express.static(path.join(__dirname, "static")))
// menjadi:


// app.use("/rafa", express.static(path.join(__dirname, "static")))
// Ini akan membuat:

// File static/style.css tersedia di /rafa/style.css 