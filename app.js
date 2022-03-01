// Mendaftarkan dependencies yang telah diinstall melalui npm
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const logger = require('morgan');
const port = process.env.PORT || 8000;

// Import router dari Product
const productRouter = require('./app/product/routes');


app.use(cors()); // cors atau middleware untuk mengijinkan request data dari client
app.use(logger('dev')); // middleware untuk mengetahui aktivitas request

// kedua middleware berfungsi untuk parsing data ke dalam bentuk json berdasarkan body-parse
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use('/uploads/', express.static(path.join(__dirname, 'uploads'))); // middleware untuk mengelola file yang bisa didownload berdasarkan letak path folder

app.use('/api/v2', productRouter); // middleware yang mengelola endpoint api dari router product

// ketika server sukses berjalan dengan port yang sudah ditentukan
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
