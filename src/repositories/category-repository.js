'use strict';

const mongoose = require('mongoose');
const category = mongoose.model('Category');

exports.create = async (data) => {
    var product = new category(data);
    await product.save();

}

exports.get = async() =>{
    const res = await category
        .find();

        return res;
}