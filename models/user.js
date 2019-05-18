const mongoDb=require('mongodb');
const getdb = require('../util/database').getDB;

class User {
    constructor(username, password, cart, id){
        this.username=username;
        this.password=password;
        this.cart = cart;
        this._id =id;
    }

    addToCart(product){
        const updatedCart = {items: [{productId: new mongoDb.ObjectId(product._id), quantity: 1}]};
        let db = getdb();
        return db.collection('users').updateOne({_id: this._id},{
            $set: {cart: updatedCart}
        }).then(result=>{
            console.log(result);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    save(){
        let db = getdb();
        return db.collection('users').insertOne(this)
        .then(result=>{
            console.log(result);
        })
        .catch(err=>{
            console.log(err);
        });
    }

    static findByUserId(id){
        let db = getdb();
        return db.collection('users').find({_id: new mongoDb.ObjectId(id)}).next()
        .then(user=>{
            console.log(user);
            return user;
        })
        .catch(err=>{
            console.log(err);
        })
    }

}

module.exports=User;