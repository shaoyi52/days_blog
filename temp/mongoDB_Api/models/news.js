var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewsSchema = new Schema({
  title: { type: String},
  author:{ type: String, default: 'admin'},
  content: { type:String},
  date:{type:Date,default:Date.now}
})

module.exports = mongoose.model('News',NewsSchema);

