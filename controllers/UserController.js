const {isUser} = require('../utils/validate');
const Users = require('../shemas/User')

const {startConnectDb} = require('../lib/helper');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

async function decodeBase64(reqBody) {
  let matches=`/uploadImages/defaultImage.jpeg`;
  let imageName='defaultImage';

  if(reqBody.image !== matches){
    matches = reqBody.image.split(';base64,').pop();
    imageName = uuidv1();
  }

  const users = new Users(reqBody);
  users.save((err) => {
    if (err) return err;
  });
  
  let writeStream = fs.createWriteStream(`./public/uploadImages/${imageName}.jpeg`);
  await writeStream.write(matches, 'base64');
  
  writeStream.on('finish', () => {
    console.log(`\n Register is successful //////////// register_post \n`);
  });  
};


class UserController {
  constructor(req, res, next){
    this.req = req;
    this.res = res;
    this.next = next;
  }
  async createUser(){
    const ok = await isUser(this.req.body, this.next);
    console.log(ok)

    if(ok){
      await startConnectDb(this.req.body);
      await Users.findOne({ email: this.req.body.email }, (data, error) => {
        if(data){
          return 'User alredy exist';
        }
        if(error) return error;
          return decodeBase64(this.req.body);
      });
    }else{
      return console.log('OK ERROR');
    }
  }
}

module.exports = UserController;