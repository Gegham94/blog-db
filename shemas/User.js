const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 80,
    trim: true
  },
  password:{
    type: String,
    required: true,
    minlength: 6
  },
  image:{
    type: String
  }
});

module.exports = mongoose.model('Users', userShema);
