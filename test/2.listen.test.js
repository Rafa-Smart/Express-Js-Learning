// app.listen = function listen() {
//   var server = http.createServer(this)
//   var args = Array.prototype.slice.call(arguments)
//   if (typeof args[args.length - 1] === 'function') {
//     var done = args[args.length - 1] = once(args[args.length - 1])
//     server.once('error', done)
//   }
//   return server.listen.apply(server, args)
// }

// itu isinya
import express from 'express';
const app = express();


test("tes aja", () => {
    expect(7+2).toBe(9)
})