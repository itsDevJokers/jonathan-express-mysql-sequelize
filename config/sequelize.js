// Melakukan konfigurasi ORM dan Database melalui sequelize

//  mendaftarkan dependency Sequelize yang telah diinstall
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    database: 'eduwork-database', // nama database
    host: '127.0.0.1', // host database
    username: 'root', // username database
    password: '', // password database
    dialect: 'mysql' // menggunakan query mysql dengan driver mysql2
});

// Menampilkan pesan jika koneksi ke database mysql sukses
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})();

// Ekspor konfigurasi ke model
module.exports = sequelize;