const mongoose = require('mongoose');

async function startConnectDb(){
  try{
    const url = 'mongodb://localhost:27017/blogdb';
    await mongoose.connect(url, {useNewUrlParser: true},function(err){

      if(err) {
        return err;
      }
      console.log('\n Connect is successful \n');
    });
  }
  catch(err){
    return console.log(err);
  }
}

module.exports = {startConnectDb};