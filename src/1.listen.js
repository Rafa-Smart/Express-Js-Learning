
// itu isinya
import express from 'express';
// lihat penjelasan saya di folder test 1.application.test.js

const app = express()


// kemudian kita harus menjalankan applicationnya di port berapa,
// dan port ini harus berbeda dengan port yg lain
// dan pastikan ketika memilih port, itu tidak bentrok dengna port aplikasi lain
app.listen(3000, () => {
    console.log("server berjalan di port 3000")
})

// ini isi dari si app.listen

app.listen = function listen() {
  var server = http.createServer(this)
  var args = Array.prototype.slice.call(arguments)
//   arguments adalah objek seperti array yang berisi semua argumen yang dikirim ke listen(...)
// Array.prototype.slice.call(arguments) digunakan untuk mengubah arguments menjadi array sungguhan
//   jadi si args ini isnya adlaah fungsi fungis yg ada pada si slice ini

// dan kenapa ini masih pake cara yg ribet, karena dulu hanya ini cara yg terbaik untuk rubah objek arguemnt
// menjadi array asli
// sekarnag sudah bisa pake Array.from(arguments)

// app.listen(3000, 'localhost', () => {
//   console.log('Server jalan!');
// });

// args = [3000, 'localhost', [Function]]
console.log(args)
  if (typeof args[args.length - 1] === 'function') { // jika paramter terakhirnya fungsi / callback maka
    // nah disini si fungisnya kita ubah menajadi fungsi di once lihat, dan perhatikan

    var done = args[args.length - 1] = once(args[args.length - 1])
    server.once('error', done)
  }
  return server.listen.apply(server, args)
//   apply sama kayak call, tapi dia argumenyya itu pake array (lebih bagus)
}


// bind adalah
// Mengembalikan fungsi baru dengan this yang sudah terkunci permanen, dan (opsional) argumen sudah disisipkan sebagian (partial).

// jadi mengubah this pada seuati fungsi yg dipanggil menjadi this yg ditentukan

function sayHello() {
  console.log("Hello, my name is " + this.name);
}

const person = { name: "Rafa" };

const boundSayHello = sayHello.bind(person);
boundSayHello(); // "Hello, my name is Rafa"


// conoth lain
console.log("===============")
function intro(a, b) {
  console.log(`${this.name} says ${a} and ${b}`);
}

const obj = { name: "Rafa" };

intro.call(obj, "Hi", "Bye");     // langsung dipanggil
intro.apply(obj, ["Hi", "Bye"]);  // langsung juga, args dalam array
const introBound = intro.bind(obj, "Hi");
introBound("Bye");                // nanti dipanggil
