
'use strict';
const mongoose = require('mongoose');
const Customer = mongoose.model('Users');
const md5 = require('md5');

exports.create = async(data) => {
    var customer = new Customer(data);
    await customer.save();
}

exports.getCheck = async(email, password) =>{
    var passCheck = md5(password + global.SALT_KEY);
    var query = { email: email };
    console.log(passCheck, email)
    const res = await Customer.find(query);
    console.log(res[0].password)
    if(res[0].password === passCheck){
        return {log:true}
    }else{
        return {log:false}
    }
}