// jadi kita belum mempelajari tentang file upload dari si reqnya
// bagaimna jika ada yg mau upload file ke server?

// maka cara bacanya dari req ini kita harus menggunakan thrid-party middleware
// ini dokumentasi aslinya https://www.npmjs.com/package/express-fileupload



import express from "express";
import request from "supertest";
import expressFileUpload from "express-fileupload";


console.clear()

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(expressFileUpload()); // ini middleware

app.post('/json', (req, res) => {
    const name = req.body.name;
    res.json({
        hello: `Hello ${name}`
    });
});

app.post('/form', (req, res) => {
    const name = req.body.name;
    res.json({
        hello: `Hello ${name}`
    });
});

app.use((req, res, next) => {
    // ingattt kalo enulisan req, dan res itu ga boleh terbalik
    // disini untuk logging
    console.log(`ini file upload ${req.files.article}`)
    //  ini file upload [object Object]
    next()
})

app.post("/file", async (req, res) => {
    // nah disini kita ambil dari si reqnya itu files, bukna body lalu kita ambil file nya, jadi article itu adalah nama keynya

    const textFile = req.files.article;
    console.log(`ini file upload ${textFile}`)
    await textFile.mv(__dirname + "/upload/" + textFile.name);
    // nah jadi ketika kita sudha mendapatkan file dari si request,
    // maka kita pindahkan file tersebut ke folder uploads/namafilenya
    // gitu https://www.npmjs.com/package/express-fileupload
    // jadi mv itu artinya move, dan dia itu promise maka jangan upa tambahkan await
 


    // nah jadi selain file yg ada di req.files, kita juga bisa mengirm yg lain
    // dan jika yg lain maka akna disimpan di req.body.name

    res.send(`Hello ${req.body.name}, you uploaded ${textFile.name}`);
});

test("Test Request File Upload...", async () => {
    const response = await request(app)
        .post("/file")
        .set("Content-Type", "multipart/form-data")
        // dan ini tuh headernya si field

        .field("name", "rafa") // ini akan disimpan di req.body.name

        // nah jadi kalo mau ngirim file maka enggunakan attach, dan ini itu dari
        // midleware ya

        // jadi paramter pertama itu adlah keynya
        // dan nanyi key ini akna nempel di req.files.article -> untuk akses value filenya
        .attach("article", __dirname + "/public/test-file.log");

    expect(response.text).toBe("Hello rafa, you uploaded test-file.log");
});

test("Test Request JSON", async () => {
    const response = await request(app)
        .post("/json")
        .set("Content-Type", "application/json")
        .send({name: "World"});

    expect(response.body).toEqual({
        hello: `Hello World`
    });
});

test("Test Request Form", async () => {
    const response = await request(app)
        .post("/form")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send("name=World");

    expect(response.body).toEqual({
        hello: `Hello World`
    });
});


// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test
// test