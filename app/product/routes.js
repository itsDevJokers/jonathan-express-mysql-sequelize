// membuat middleware router yang berfungsi untuk mengatur jalan/rute pada web server
const router = require('express').Router();

// multer untuk mengelola file yang akan diupload
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});

// import controller
const { create, findAll, findById, update, destroy } = require('./controller');

// membuat API endpoint berdasarkan http method
router.post('/product', upload.single('image'), create);
router.get('/product', findAll);
router.get('/product/:id', findById);
router.put('/product/:id', upload.single('image'), update);
router.delete('/product/:id', destroy);

// export
module.exports = router;