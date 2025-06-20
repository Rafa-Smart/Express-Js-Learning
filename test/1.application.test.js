// ini isi dari function express
// https://github.com/expressjs/express/blob/master/lib/



// var bodyParser = require('body-parser')
// var EventEmitter = require('node:events').EventEmitter;
// var mixin = require('merge-descriptors');
// var proto = require('./application');
// var Router = require('router');
// var req = require('./request');
// var res = require('./response');

function createApplication() {

    // next itu adlah middleware

  var app = function(req, res, next) {
    app.handle(req, res, next);
  };

  mixin(app, EventEmitter.prototype, false);
  // disini tidak di override, jadi si app masih punya fungis nya sendiri
  // dan si EventEmmiter juga masih punya fungsinya sendiri
  mixin(app, proto, false);

  // expose the prototype that will get set on requests
  app.request = Object.create(req, {
    app: { configurable: true, enumerable: true, writable: true, value: app }
  })
//  Membuat objek baru app.request dengan mewarisi semua properti dari req.
// Menambahkan properti app ke objek tersebut, yang nilainya menunjuk kembali ke objek app itu sendiri.
// configurable, enumerable, writable diatur agar properti app:
// Bisa dimodifikasi (writable)
// Bisa muncul saat di-loop (enumerable)
// Bisa dihapus atau diubah descriptor-nya (configurable)



  // expose the prototype that will get set on responses
  app.response = Object.create(res, {
    app: { configurable: true, enumerable: true, writable: true, value: app }
  })

  app.init();
  return app;
}


// jadi fungsi mixin adalah
// jadi mixin itu sama seperti Object.assign(app, EventEmmiter, porto); 


function mixin(target, source, override) {
  Object.getOwnPropertyNames(source).forEach((key) => { // jadi ii tuh isinya bakalan array yg sisnya adalah nama property (key) dari si target / objeknya
    if (!override && target.hasOwnProperty(key)) return;
    target[key] = source[key];
  });
}

// Kalau override adalah false (atau undefined/falsy), dan target sudah memiliki properti dengan nama yang sama, maka jangan salin properti tersebut.

// Kalau tidak ada konflik atau override bernilai true, maka salin properti dari source ke target.

let a = { name: "Rafa", age: 20 };
let b = { age: 99, country: "Indonesia" };

// override = false
mixin(a, b, false);

console.log(a);
// Hasil:
// { name: "Rafa", age: 20, country: "Indonesia" }
// → age tidak tertimpa karena override = false


// kalo true
let a2 = { name: "Rafa", age: 20 };
let b2 = { age: 99, country: "Indonesia" };

mixin(a2, b2, true);

console.log(a2);
// Hasil:
// { name: "Rafa", age: 99, country: "Indonesia" }
// → age tertimpa karena override = true




// jadi fungisnya adalah untuk membuat key di objek targe juga bisa memiliki nilai dari objek source /
//  Menyalin properti dan method dari satu objek (source) ke objek lain (target)

// nah jiga overridenya true maka , maka properti yang sudah ada akan ditimpa, // kalo engga maka return
// objek app ini misal memiliki function sayHello dan di sudah di mixin dengan porto
// dan ternyata di objek porto ini memiliki function sayHello juga maka function sayHello yg ada di porto ini akna everride atua tidak terlihat
// karena kalo mau akses itu pertama dari objek instancenya (app) -> prototype app -> prototype porto


// conthnya 
// EventEmitter.prototype memiliki method seperti .on(), .emit(), .once().
// Fungsi mixin() akan menyalin semua method itu ke objek app.
// Maka app sekarang bisa:
// .on('event', callback)
// .emit('event')


// bedanya Object.assign dnegn mixin

// 1. Object.assign()
// Hanya menyalin properti enumerable milik langsung (own properties).
// Tidak menyalin getter/setter, prototype, atau descriptor khusus.
// Menyalin nilai (bukan referensi fungsi internal seperti getter/setter).
// Tidak bisa salin method dari prototype.


// 2. mixin() dia bisa menyalin :
// Getter & setter
// Method
// Non-enumerable property
// Konfigurasi property (writable, configurable, enumerable)


// descriptor adalah
// Property descriptor adalah objek yang menjelaskan karakteristik atau perilaku dari sebuah properti pada suatu objek di JavaScript.
// Setiap properti pada objek memiliki "deskripsi" internal, seperti:
// Apakah properti bisa ditulis ulang?
// Apakah bisa dihapus?
// Apakah akan muncul saat di-loop?
// Apakah memiliki getter/setter?

// contoh
const obj = { name: "Rafa" };

console.log(Object.getOwnPropertyDescriptor(obj, 'name'));

// {
//   value: "Rafa",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }



// disini coba kita testing
test("tes aja", () => {
    expect(7+2).toBe(9)
})