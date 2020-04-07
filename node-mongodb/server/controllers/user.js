const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const User = require('../models/user')

function isVerifiedField(str){
  return !validator.isEmpty(str)&& validator.isLength(str,{min:4});
}

function isVerifiedEmail(email){
  return !validator.isEmpty(email) && validator.isEmail(email)
}

async getUsers(req,res)=>{
  User.find()
    .exec()
    .then(users=>{
      return res.statu(200).json({success:true,users})
    })
    .catch(error=>{
      return res.statu(500).json({success:false,error})
    })
}

module.exports ={
  getUsers
}
