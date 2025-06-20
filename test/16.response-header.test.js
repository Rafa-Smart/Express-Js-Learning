// jadi kita bisa menentukan response header dengna cara res.set()
// atau bisa juga kita pake res.header()

// nah maksudnya adalah kita akn mengeset bahwa tipe content yg kita kirim
// bertipe apa misal json, html, text/plain, xml, dll
// contoh

// ini jiga satu value
// res.set('Content-Type', 'text/plain')


// ini jiga inign banyak sekaligus ngirmnya maka bentuknya objek
// res.set({
//   'Content-Type': 'text/plain',
//   'Content-Length': '123',
//   ETag: '12345'
// })



// jadi gini ketika kita kirim res.send() / atau res.json()
// maka itu artinya kita sudah ngirim data DAN SEKALIGUS menutup responsenya
// jadi langusng otomatis pake .end()

// tpi kalo kita ga pake res.send / res.json, misal pake res.set, maka itu tidak otomatis langsung ditutup dengna
// si .end(), tapi harus manuali kit tutup dnegna .end()


// dan ini case inssensitive

import express from 'express';
import request from 'supertest';

console.clear()

describe("testing response-header...", () => {
    const app = express();
    app.get("/rafa", (req, res) => {
        res.set({
            "Content-Type": "application/json",
            "X-powered-by":"rafa khadafi"
        }).json({message:"haloo semuanya"})

        // tidak perlu .end(), karena sudah otomatis di tutup
    })

    app.get("/jamal", (req, res) => {
        res.set({
            "Content-Type": "text/plain",
            "X-powered-by":"jamaluddin"
        }).end()

        // perlu .end(), karena belum ditutup
    })


    test("test 1...", async () => {

        const response = await request(app).get("/rafa")
        // expect(response.header).toEqual({
        //     "Content-Type": "application/json",
        //     "pemilik":"rafa khadafi"
        // })

        // itu ga bisa karena sebenarnya res.header itu banyak sekali
        // maka kamu bisa menggunkaan untuk mengecek bahwa ada objek ini didalam objek
        // dengan cara toMatchObject

        expect(response.header).toMatchObject({ //dan harus kecil semua, untu pengetesan ini
            "content-type": "application/json; charset=utf-8",
            "x-powered-by":"rafa khadafi"
        })

        expect(response.body).toEqual({message:"haloo semuanya"})
        expect(response.get("content-type")).toBe("application/json; charset=utf-8")

    })



    test("test 2...", (done) => {
        request(app)
            .get("/jamal")
            .expect('content-type','text/plain; charset=utf-8')
            .expect(200)
            .end((err, res)=> {
                if(err) return done(err);
                done()
            })
    })


})

