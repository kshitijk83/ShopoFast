const getDB = require('../util/database').getDB;
const mongoDB = require('mongodb');
class Product {
  constructor(title, imageUrl, description, price){
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save(){
    const db = getDB();
    db.collection('products').insertOne(this);
  }

  static fetchAll(cb){
    const db = getDB();
    db.collection('products')
    .find()
    .toArray()
    .then(prods=>{
      cb(prods);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  static findById(id, cb){
    const db = getDB();
    return db.collection('products')
    .find({_id: new mongoDB.ObjectId(id) })
    .next()
    .then(prod=>{
      console.log(prod, "sdfsdf");
      cb(prod);
    })
    .catch(err=>{
      console.log(err);
    })
  }
}

module.exports = Product;






























// const fs = require('fs');
// const path = require('path');

// const Cart = require('./cart');

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     getProductsFromFile(products => {
//       if (this.id) {
//         const existingProductIndex = products.findIndex(
//           prod => prod.id === this.id
//         );
//         const updatedProducts = [...products];
//         updatedProducts[existingProductIndex] = this;
//         fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//           console.log(err);
//         });
//       } else {
//         this.id = Math.random().toString();
//         products.push(this);
//         fs.writeFile(p, JSON.stringify(products), err => {
//           console.log(err);
//         });
//       }
//     });
//   }

//   static deleteById(id) {
//     getProductsFromFile(products => {
//       const product = products.find(prod => prod.id === id);
//       const updatedProducts = products.filter(prod => prod.id !== id);
//       fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//         if (!err) {
//           Cart.deleteProduct(id, product.price);
//         }
//       });
//     });
//   }

//   static fetchAll(cb) {
//     getProductsFromFile(cb);
//   }

//   static findById(id, cb) {
//     getProductsFromFile(products => {
//       const product = products.find(p => p.id === id);
//       cb(product);
//     });
//   }
// };
