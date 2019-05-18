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
        const cartItemIndex = this.cart.items.findIndex(
            prod=> prod.productId.toString()===product._id.toString()
        );

        let updateCartItems=[...this.cart.items];
        let nQuantity=1;
        if(cartItemIndex>=0){
            nQuantity=this.cart.items[cartItemIndex].quantity+1;
            updateCartItems[cartItemIndex].quantity=nQuantity;
        } else{
            updateCartItems.push({productId: new mongoDb.ObjectId(product._id), quantity: nQuantity});
        }

        const updatedCart = {items: updateCartItems};
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