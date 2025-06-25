import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());


app.get('/', (req, res) => {
    const name = req.cookies["name"];
    // const name = req.cookies.name;
    // gitu juga bisa
    res.send(`Hello ${name}`);
});

app.post('/login', (req, res) => {
    const name = req.body.name;
    res.cookie("Login", name, {path: "/login"});
    // nah jadi path ini, maksudnya itu
    // dia mendapatkan cookie ini sebelumnya dari path apa
    // kalo /, berati dia mendapatkan cookie ini dari / (semua)

    // jai kita bisa cek nanti ketika ad cookie, ita bisa tau bahwa cookie ini 
    // diberikan oleh si response, pada route yg mana
    // apakah benar dari route /login?
    // kalo iya maka dia bis amasuk ke halaman lain yg harus ada cookie loginnya


    // ini penjelasan yg benernya
    // Cookie ini hanya akan dikirim kembali ke server oleh browser ketika user mengakses route yang dimulai dengan /login (karena path: "/login").
    //  Jika path: "/", maka cookie akan dikirim ke semua endpoint di domain itu.
    // Jika path: "/login", maka cookie hanya dikirim saat user mengakses /login, /login/verify, /login/dashboard, dst.

    // maksudnya adaalh cookie ini akna berlaku jika hanya di path /login, /login/rafa, dll
    // yg selain path /login maka akan tidak ada cookienya

    // jadi kao kita akses route lain yg bukan /login
    // maka cookie ini ga akan ada

    // ookie tidak menunjukkan dari route mana cookie diberikan, tetapi menentukan di route mana cookie itu akan dikirim kembali ke server oleh browser.

    // tapi kao Kalau kamu ingin tahu dari route mana cookie diberikan, maka kamu perlu menyimpannya sendiri di value atau 
    // di struktur data server, karena cookie tidak menyimpan informasi “asal diberikan”, hanya “di mana boleh dikirim”.
    // res.cookie("Login", JSON.stringify({ name, from: "/login" }));


    res.send(`Hello ${name}`);
});

test("Test Cookie Read", async () => {
    const response = await request(app).get("/")
    // disini ita set dulu di requestnya
    // bahwa di request ini dia mempunyai cookie
    // lihat, cookie ini bisa di manipulasi di sisi browser
    // makanya kamu harus ce lagi cookie yg masuk ke server
        .set("Cookie", "name=rafa;author=rafa khadafi");
    expect(response.text).toBe("Hello rafa");
});

test("Test Cookie Write", async () => {
    const response = await request(app).post("/login")
        .send({name: "jamal"});
    expect(response.get("Set-Cookie").toString()).toBe("Login=jamal; Path=/login");
    // disini kita buat string, karena awalnya itu array
    // expect(response.cookies).toContain("Login=jamal; Path=/login");
    // yg atas intu ga bisa
    console.log(`ini data cookie ${response.cookies}`) // undefined
    console.log(`ini data cookie ${response.get("set-cookie")}`) // 
    // Login=jamal; Path=/login

    // jadi disini kita cek bahwa, cookie ini berisi login=jamal, da berasal dari path login
    expect(response.text).toBe("Hello jamal");
});