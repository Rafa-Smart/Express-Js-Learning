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

// jadi ada di folder test, lalu ada di folder static file filenya
app.use(express.static(path.join('test', "static"),options))
app.use(express.static('test/ststic',options)) // sama aja
// disini kita masukan nama foldernya agar seluruh isi file dari folder tersbut
// bisa kita akses lewat url, ini harus relatif ya

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