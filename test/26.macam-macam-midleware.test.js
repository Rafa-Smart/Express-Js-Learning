// https://chatgpt.com/c/6855624c-fb60-8009-ae9d-09209a649f71

test("tes", () => {
    expect(5+3).toBe(8)
})

// Application-level	=   Dipasang langsung ke app, aktif global
// Router-level	        =   Untuk route tertentu via express.Router()
// Built-in	Middleware  =   bawaan dari Express
// Third-party	        =   Dari package npm (contoh: cors, morgan)
// Error-handling	    =   Tangani error (harus 4 argumen)
// Custom	            =   Dibuat sendiri sesuai kebutuhan
// Conditional	        =   Aktif jika kondisi tertentu dipenuhi
// Berantai / Multiple	=   Menjalankan beberapa middleware berurutan
// Path-based	        =   Aktif hanya pada rute/path tertentu