import express from "express";
import request from "supertest";
import mustacheExpress from "mustache-express";

const app = express();

app.set("views", __dirname + "/views"); 
// jdi yg atas itu parameter pertamanya, itu nama folder
// dan param kedua itu adalah tempat file viewnya berada
app.set("view engine", "html");
// ini untuk setting, bahwa kita menggunakan view engine mustache
// dan jika file yg ada di folder views itu adaalh html, maka di param keduanya pake html, dll
app.engine("html", mustacheExpress());

app.get('/', (req, res) => {
    res.render("index", {
        title: "Hello World",
        say: "This is a test"
    });
});

test("Test Response", async () => {
    const response = await request(app).get("/");
    console.info(response.text);
    expect(response.text).toContain("Hello World");
    expect(response.text).toContain("This is a test");
});