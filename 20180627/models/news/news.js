'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title:{type: String},
  content:{type: String},
})

const News = mongoose.model('news', newsSchema);

export default News