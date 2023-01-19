const errorMessages = require('../messages');

const isName = (name) =>{
	name = name.trim();
	return new Promise((resolve, reject, ) => {
		if(name.length>2){
			return resolve(
				errorMessages('success')('succsessMessage')
			);
		}
		return reject(
		  errorMessages('errors')('nameError')
		);
	});
}


const isEmail = (email) =>{
	const regExpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	return new Promise((resolve, reject) => {
		if(regExpEmail.test(email)){
			return resolve(
				errorMessages('success')('succsessMessage')
			);
		}
		return reject(
			errorMessages('errors')('emailError')
		);
	});
	
}


const isAge = (age) => {
	return new Promise((resolve, reject) => {
		if(age>=18){
			return resolve(
				errorMessages('success')('succsessMessage')
			);
		}
		return reject(
			errorMessages('errors')('ageError')
		);
	})
}


const isPassword = (password, confirm_password) =>{
	const regExpPassword = /((?=.*\d)(?=.*[a-z]){6,20})/;

	return new Promise((resolve, reject) => {
		if(password !== confirm_password){
			return reject(
				errorMessages('errors')('passwordMatchError')
			);
		}
		if(regExpPassword.test(password)){
			return resolve(
				errorMessages('success')('succsessMessage')
			);
		}
		return reject(
			errorMessages('errors')('passwordError')
		);
	})
}


const isUser = async (user, next) => {
	try{
		return(
			{
				name: await isName(user.name),
				email: await isEmail(user.email),
				age: await isAge(user.age),
				password: await isPassword(user.password, user.confirm_password)
			}
		)
	}
	catch(err){
		(err) => {
      return console.log(err.message)
    }
  }
}


module.exports = {
	isUser,
	isEmail,
	isAge,
	isName,
	isPassword
};