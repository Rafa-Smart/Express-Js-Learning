import express from "express";
import request from "supertest";
console.clear()
const app = express();

// jadi ketika user mengakses halaman route yg tidak tersedia maka secara default
// akan mengembalikan halaman 404, nah kdang ada kasus kita inign membuat halaman errornya manual
// jadi kita bisa menambilkan html yg berisi halaman eror


// nah jai ketika ada route yg di panggil, tpai route tersbeut tidak tersedia maka
// akan menampilkan halaman error yang kita buat sendiri

// /dan middleware ini harus di paling akhir, jadi nanti ga nimpa route lainnya


app.get('/', (req, res) => {
    res.send(`Hello Response`);
});

app.use((req, res, next) => { // maka ini adalah middleware
    res.status(404).send(`404 Not Found Euy`);
});

test("Test Response", async () => {
    const response = await request(app).get("/");
    expect(response.text).toBe("Hello Response");
});

test("Test Response Not Found", async () => {
    const response = await request(app).get("/halaman-tidak-ada");
    expect(response.text).toBe("404 Not Found Euy");
});



// bedanya dengan error hanlder adalah , error handler ini akan menangkap error yang terjadi di dalam route, 
// sedangkan middleware ini akan menangkap jika route tidak ditemukan