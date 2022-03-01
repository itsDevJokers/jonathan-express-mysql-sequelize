// Model berfungsi untuk berkomunikasi dengan database melalui sequelize

// impor sequelize yang telah dikonfigurasikan
const sequelize = require('../../config/sequelize');
// Data types untuk menentukan tipe data
const { DataTypes } = require('sequelize');

//  Membuat Model Product
const Product = sequelize.define('Product', {
  // Atribut dari model didefinisikan
  users_id: {
    type: DataTypes.INTEGER,
    allowNull: false // tidak boleh bernilai null
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false // tidak boleh bernilai null
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false // tidak boleh bernilai null
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false // tidak boleh bernilai null
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // nilai awal false
    allowNull: false // tidak boleh bernilai null
    // allowNull defaults to true
  },
  image: {
    type: DataTypes.TEXT,
    // nilai awal bernilai null
  },
}, {
});

// Ekspor modul ke controller
module.exports = Product;