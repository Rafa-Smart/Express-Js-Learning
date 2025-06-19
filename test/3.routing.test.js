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


test("tes aja", () => {
    expect(7+2).toBe(9)
})