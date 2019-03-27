const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = ""+Math.floor(Math.random()*10000);
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb){
    getProductsFromFile((products)=>{
      const product = products.find(p=>p.id==id);
      cb(product);
    });
  }

  static updateById(id, title, imageUrl, description, price, cb){
    let all;
    this.fetchAll(products=>{
      all = [...products];
      const index = all.findIndex(p=>p.id==id);
      const product = all[index];
      product.title = title;
      product.imageUrl = imageUrl;
      product.description = description;
      product.price = price;
      cb(product);
      fs.writeFile(p, JSON.stringify(all), err=>{
        console.log(err);
      })
    });
  }
};