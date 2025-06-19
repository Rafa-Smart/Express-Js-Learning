// jdai semua query param ini bentuknya adlaah objek
// dan biasanya bisa dibuat dengan
// let query = new URLSearchParams()
// query.append('name', 'john')

import express from "express";
import request from "supertest";

console.clear()

describe("testing query param", () => {
  const app = express();
  app.get("/rafa", (req, res) => {
    res.send(`hello ${req.query.first} ${req.query.last}`);
  });
  app.get("/jamal", (req, res) => {
    res.send(`hello ${req.query.first} ${req.query.last}`);
  });

  test("testing 1...", async () => {
    const data = {
      first: "rafa",
      last: "khadafi",
    };

    const response = await request(app).get("/rafa").query(data);

    expect(response.text).toBe("hello rafa khadafi");
  });

  it("test 2...", async () => {
    // disini kita buat dulu query paramnya (dari sisi si client)/ yg ngasil req
    let data = new URLSearchParams();
    data.append("first", "jamal");
    data.append("last", "istiqomah");

    // nah tapi sayang, dalam pengetesan di supertest ini
    // kita ga bisa pake URLSearchParams, karena supertest
    // tidak bisa merubahnya ke string
    // mau pake ini jgua ga bisa JSON.stringify(data)

    // tpi bisa jgua seperti ini
    const response = await request(app).get(`/jamal?${data.toString()}`);

    expect(response.text).toBe("hello jamal istiqomah")

  });
});
