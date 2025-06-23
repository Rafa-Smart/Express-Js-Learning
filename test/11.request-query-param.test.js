// jdai semua query param ini bentuknya adlaah objek
// dan biasanya bisa dibuat dengan
// let query = new URLSearchParams()
// query.append('name', 'john')

import express from "express";
import request from "supertest";

console.clear();

describe("testing query param", () => {
  const app = express();
  app.get("/rafa", (req, res) => {
    res.send(`hello ${req.query.first} ${req.query.last}`);
  });
  app.get("/jamal", (req, res) => {
    res.send(`hello ${req.query.first} ${req.query.last}`);
  });
  app.get("/products/:id", (req, res) => {
    res.status(200).send(`data yg kamu minta ${req.params.id}`);
  });

  app.get(/^\/category\/(\d+)$/, (req, res) => {
    res.status(200).send(`data yg kamu minta ${req.params[0]}`);
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

    // tapi kalo misalkan kita masukan misal /products/20, maka ii akna masuk di params.id; / apa yg kamu masukan di products/...
    // dan di routernya juga harus kita pastikan gini
    // /products/(id)
    // lihat di tes 3
    expect(response.text).toBe("hello jamal istiqomah");
  });

  it("testing 3...", async () => {
    const response = await request(app).get("/products/40");
    expect(response.text).toBe("data yg kamu minta 40");
    expect(response.status).toBe(200);

    // tapi kalo misalkan kita masukan misal /products/20, maka ii akna masuk di params;
    // dan di routernya juga harus kita pastikan gini
    // /products/:id

 
  });


  it("testing 4...", async () => {
    const response = await request(app).get("/category/50");
    expect(response.text).toBe("data yg kamu minta 50");
    expect(response.status).toBe(200);

       // tapi kalo pake regex, itu harus pake (\d+)
    // jadi pake kurung dn masuknya ke params[0]
  })
});
