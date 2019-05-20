const mongoDb=require('mongodb');
const getdb = require('../util/database').getDB;

class User {
    constructor(username, password, cart, id){
        this.username=username;
        this.password=password;
        this.cart = cart;
        this._id =id;
    }

    getOrders(){
        let db = getdb();
        return db.collection('orders').find({'user._id': new mongoDb.ObjectId(this._id)}).toArray();
    }

    createOrder(){
        let db = getdb();
        return this.getCart()
        .then(products=>{
            const order = {
                items: products,
                user: {
                    _id: new mongoDb.ObjectId(this._id),
                    password: this.password
                }
            }
            return db.collection('orders').insertOne(order)
            .then(result=>{
                this.cart.items=[];
                return db.collection('users').updateOne(
                    {_id:this._id},
                    {$set:{cart: {items: []}}}
                )
            })
        })
    }

    deleteCart(id){
        let db = getdb();
        const updatedCart = this.cart.items.filter(p=>{
            return p.productId.toString()!==id.toString();
        })

        return db.collection('users').updateOne({_id: this._id},{
            $set: {cart:{items: updatedCart}}
        }).then(result=>{
            console.log(result);
        }).catch(err=>{
            console.log(err);
        })
    }

    getCart(){
        let db = getdb();
        const productIds = this.cart.items.map(p=>{
            return p.productId;
        })
        return db.collection('products').find({_id: {$in: productIds}}).toArray()
        .then(products=>{
            return products.map(p=>{
                return {
                    ...p,
                    quantity: this.cart.items.find(i=>{
                        return i.productId.toString()===p._id.toString();
                    }).quantity
                }
            })
        }).catch(err=>{
            console.log(err);
        })
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