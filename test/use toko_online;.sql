use toko_online;
select * from products;
-- Ctrl+Alt+E

-- jalankan ini di terminal
-- kalo au ganti lagi, nanti ganti lagi aja
ALTER USER 'root'@'localhost'
IDENTIFIED WITH mysql_native_password BY '1234';
FLUSH PRIVILEGES;

SELECT user, host, plugin FROM mysql.user;
-- test
-- test
-- test
-- test
-- test