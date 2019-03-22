const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

getProductsFromFile=(cb)=>{
    fs.readFile(p, (err, content)=>{
        if(err){
            return cb([]);
        }
        cb(JSON.parse(content));
    });
}

module.exports = class Product{
    constructor(title, imageUrl, desc, price){
        this.title = title;
        this.imageUrl = imageUrl;
        this.desc = desc;
        this.price = price;
    }

    save(){

        getProductsFromFile((products)=>{
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err=>{
                console.log(err);
            });
        });
}

    static fetchAll(cb){
        
        getProductsFromFile(cb);
    }
}