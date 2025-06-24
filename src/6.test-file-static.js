import express from 'express'
import path from 'path'
import request from 'supertest';
import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename)
// gausah pake ini karena di express sudah otomatis ada si __dirnamenya

console.clear();

const app = express();
const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html', 'css', 'js'], // jadi kalo tulis style aja
//   maka nanti akan ditambakan .css,dll
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

// nah kalo misalakn pas orang mau akses file statisnya
// dan kamu inign menambhakan header, maka ibsa tambahkan lagi middleware sebelum middleware express.static

// atau bisa juga di optionsnya di setHeaders (liat di options)

// conoth dibawah
// Middleware khusus untuk jalur /file
app.use('/file', (req, res, next) => {
  // Tambahkan header
  res.setHeader('X-Custom-Header', 'MyCustomValue');

  // Tambahkan cookie
  res.cookie('namaCookie', 'nilaiCookie', {
    httpOnly: true,
    path: '/file',
  });

  console.log(`[${new Date().toISOString()}] Static file requested: ${req.originalUrl}`);

  // Wajib lanjut ke express.static
  next();
});


// PENTINGG
// Kalau ada request POST ke /file/index.html, express.static akan mengabaikannya karena:
// express.static() hanya menangani HTTP method GET dan HEAD.

// tapi masih bisa diakses dengna kamu menambahakan middeware sebelum express.static
// jadi nanti akan masuk kesitu, dan middlewarenya harus ada prefix app.use("/file")
// agar bisa menngani post yg requestnya ke /file/index.html

// Jika kamu memasang middleware seperti express.json() atau express.urlencoded() sebelumnya, maka:
// Body akan tersedia di req.body
// Tapi kamu harus tangani sendiri rute POST-nya, karena express.static tidak melakukannya.


// jadi ada di folder test, lalu ada di folder static file filenya
app.use(express.static(path.join('test', "static"),options))
app.use(express.static('test/ststic',options)) // sama aja
// disini kita masukan nama foldernya agar seluruh isi file dari folder tersbut
// bisa kita akses lewat url, ini harus relatif ya

// nahh kalo seperti itu, maka berati kita hanya bisa akses file lewat url
// dengan cara /namaFilenya
// /index.html, /style.css
// nah kalo mau ada prefixnya maka caranaya adalah

// app.use('/file',express.static('test/static',options))

// maka nanti cara aksesnya harus /file/index.html, /file/style.css

app.get("/rafa", (req, res) => {
    res.status(200).send("hello response")
    // jadi kalo kita akses /rafa saja
    // maka akn muntul haloo response

    // tapi kalo kita akses /style.css,
    // maka akan muncul file style.cssnya
    // jadi kita ga perlu buat routenya
})


app.listen(3000, () => {
    console.log("server jalan di port 3000")
})
// bisaaaa
// http://localhost:3000/index.html

// nih buat middleware untuk yg mau akses ke /file/index.html, /file/style.css
// kit juga bisa kasih cookienya

app.use('/file', (req, res, next) => {
  if (req.path.endsWith('.css')) {
    res.cookie('tipe', 'css', { httpOnly: true });
  } else if (req.path.endsWith('.js')) {
    res.cookie('tipe', 'js', { httpOnly: true });
  }

  next();
});
