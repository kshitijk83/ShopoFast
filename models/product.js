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
    constructor(t){
        this.title = t;
    }

    save(){

        getProductsFromFile((products)=>{
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err=>{
                console.log(err);
            });
        })
        
    //     fs.readFile(p, (err, content)=>{
    //         let products=[];
    //         if(!err){
    //             products = JSON.parse(content);
    //         }
    //         products.push(this);
    //         fs.writeFile(p, JSON.stringify(products));
    // });
}

    static fetchAll(cb){
        
        getProductsFromFile(cb);
    }
}