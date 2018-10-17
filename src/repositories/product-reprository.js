'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () => {
    var mysort = { _id: -1 };
    const res = await Product
        .find({
            active: true
        }, 'title image visit').sort(mysort).limit(12);

        return res;

}

exports.getAlta = async () => {
    var mysort = { visit: -1 };
    const res = await Product
        .find({
            active: true
        }, 'title image visit').sort(mysort).limit(50);

        return res;

}

function ID(id){
    return mongoose.Types.ObjectId(id);
}

exports.plus = async (lastid) => {
    console.log(lastid)
      const res = await Product
    .find({_id : {$lt : ID(lastid)}}).sort({_id : -1})
    .limit(12);

    return res;
}

exports.getapv = async () => {
    var mysort = { _id: -1 };
    const res = await Product
        .find({
            active: false
        }, 'title image').sort(mysort).limit(12);

        return res;

}

exports.plusapv = async (lastid) => {
    console.log(lastid)
      const res = await Product
    .find({_id : {$lt : ID(lastid)}, active: false}).sort({_id : -1})
    .limit(12);

    return res;
}

exports.search = async (q) => {
    const res = await Product.find({$text : {$search: q}}).limit(12).sort({_id : -1});
    return res;
}

exports.searchplus = async (lastid, q)=>{
    const res = await Product.find({_id : {
        $lt : ID(lastid)
       }, $text : {$search: q}}).limit(12).sort({_id : -1});
    return res;
}

exports.getByCateg = async (id) => {
    var query = { idcategory: id };
    const res = await Product.find(query).limit(12).sort({_id : -1});
    return res;
}

exports.catplus = async (lastidcateg, id) => {
    const res = await Product.find({
         "_id" : {
             $lt : ID(lastidcateg)
            }, 
            "idcategory": id
        }).sort({_id : -1})
    .limit(12);

    return res;
}

exports.getById = async (id) => {
    console.log(id)
    const res = await Product.findById(id);
    return res;
}

exports.create = async (data) => {
    var product = new Product(data);
    await product.save();

}

exports.update = async (id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                visit: data.visit,
            }
        });
}

exports.updateapv = async (id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                active: data.status,
            }
        });
}

exports.delete = async (id) => {
    console.log(id)
    var myquery = { _id: id };
    await Product
        .deleteOne(myquery);

}