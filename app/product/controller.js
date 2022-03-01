// Membuat controller sebagai komeunikasi dengan model dan dikirim ke router sesuai endpoint API dan http method

const Product = require('./model'); // impor model
const { Op } = require("sequelize"); // untuk mengelola request query 

const port = process.env.PORT || 8000; //port 

// import path dan file system untuk mengelola file upload pada create dan update
const path = require('path'); 
const fs = require('fs');

// Controller create
const create = async (req, res) => {
    const {users_id, name, price, stock, status} = req.body; // request dari body bisa berupa form atau json
    const image = req.file; // file image
    // jika image diupload
    if(image) {
        // target path ketika file image diupload dan mengubah nama sesuai aslinya
        const target = path.join(__dirname, '../../uploads', image.originalname); 
        fs.renameSync(image.path, target);
        try {
            // berkomunikasi dengan model menggunakan ORM sequelize
            await Product.sync();
            const result = await Product.create({users_id, name, price, stock, status, image: `http://localhost:${port}/uploads/${image.originalname}`});
            // jika berhasil ditampilkan pesan dan isi datanya
            res.status(200).send({
                message: `Product successfully Created`,
                data: result,
            });
        } catch (error) {
            // Jika server error
            res.send(error);
        }
    }
}

// Controller findAll untuk menampilkan semua data dan data berdasarkan query
const findAll = async (req,res) => {
    const {q} = req.query; // request berupa query dari url
    let nameQuery = {} // mengelola object dari model query 
    try {
        // berkomunikasi dengan model menggunakan ORM sequelize
        await Product.sync();
        q && ( // jika ada request query
            // nameQuery akan mengikuti request query yang dimasukkan
            nameQuery = {
                // kondisi dalam query model seperti WHERE name LIKE req.query
                where: { 
                    name: {
                        [Op.like]: `%${q}%`
                    }
                },
                // attribut exclude untuk tidak menampilkan column createdAt dan updatedAt
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        )
        !q && ( // jika tidak ada query
            // nameQuery berisi object untuk menampilkan semua data
            nameQuery = {
                // attribut exclude untuk tidak menampilkan column createdAt dan updatedAt
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        )
        // jika berhasil ditampilkan pesan dan isi datanya
        const result = await Product.findAll(nameQuery);
        res.status(200).send({
            message: `Success`,
            data: result
        })
    } catch (error) {
        // Jika server error
        res.send(error);
    }
}

// Controller findAll untuk menampilkan data berdasarkan id dari product
const findById = async (req,res) => {
    const {id} = req.params; // id sebagai parameter
    try {
        // berkomunikasi dengan model menggunakan ORM sequelize
        await Product.sync();
        // menampilkan data product
        const result = await Product.findOne({
            // dengan kondisi id sesuai req.params.id
            where: {
                id
            },
            // attribut exclude untuk tidak menampilkan column createdAt dan updatedAt
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        if (result === null){
            // jika id tidak ada data ditampilkan pesan 404
            res.status(404).send({
                message: `Product with id ${id} not found`
            })
        } else {
             // jika id ada datanya ditampilkan pesan dan isi datanya
            res.status(200).send({
                message: `Success`,
                data: result

            })
        }
    } catch (error) {
        // jika server error
        res.send(error);
    }
}

// Controller update untuk merubah isi data sesuai id 
const update = async (req, res) => {
    const {users_id, name, price, stock, status} = req.body; // request dari body bisa berupa form atau json
    const {id} = req.params; // id sebagai parameter
    const image = req.file; // file image
    let body = {}; // body berisi object request berdasarkan kondisi

    // jika image diupload
    if(image) {
        // target path ketika file image diupload dan mengubah nama sesuai aslinya
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        // object body berisi semua request termasuk image
        body = {
            users_id,
            name,
            price,
            stock,
            status,
            image: `http://localhost:${port}/uploads/${image.originalname}`
        }
    } 
    // jika tidak ada gambar yang diupload
    else {
        // object body berisi semua request kecuali image
        body = {
            users_id,
            name,
            price,
            stock,
            status,
        }
    }
    try {
        // berkomunikasi dengan model menggunakan ORM sequelize
        await Product.sync();
        // data diupdate dengan parameter id setelah isi object body dicek kondisi
        const updateData = await Product.update(body, {
            where: { id },
        });
        // jika tidak ada data dalam id sesuai request parameter
        if(updateData === null) {
            res.status(404).send({
                message: `Product with id ${id} not found`
            })
        } else {
            // jika id ada datanya ditampilkan pesan dan hasil perubahan datanya
            const result = await Product.findOne({
                where: {
                    id
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            })
            res.status(200).send({
            message: `Data with id ${id} successfully updated`,
            data: result
            })
        }
    } catch (error) {
        // jika server error
        res.send(error);
    }
}

// Controller destroy untuk menghapus data berdasarkan request parameter id
const destroy = async (req,res) => {
    const {id} = req.params; // id sebagai parameter
    try {
        // berkomunikasi dengan model menggunakan ORM sequelize
        await Product.sync();
        // membuat kondisi jika id ada datanya
        const existId = await Product.findOne({
            where: { id }
        })
        // Jika id tidak ada datanya
        if(existId === null){
            res.status(404).send({
                message: `Product with id ${id} not found`
            })
        } else { // Jika ada
            // data dihapus
            await Product.destroy({
                where: {
                    id
                },
            });
            // Jika berhasil tampilkan pesan data dengan id telah terhapus
            res.status(200).send({
                message: `Product with id ${id} succesfully deleted`
            })
        }
    } catch (error) {
        // jika server error
        res.send(error);
    }
}

// ekspor seluruh controller yang dibuat
module.exports = {
    create, findAll, findById, update, destroy
}