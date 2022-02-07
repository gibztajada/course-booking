const User = require('../models/User');
const validate = require('../models/validator');
const bcrypt = require('bcrypt');
const auth = require('../auth')


//Check if email exists
exports.checkEmailExists = (req,res) => {
	
	User.find({email: req.body.email})
		.then(result => {
		if(result.length > 0) return res.send(`${result[0].email} exists!`);
  		
  		return res.send('Email not found!');
	})
		.catch(err => res.send(err));
}



//Registration
exports.registerUser = (req,res) => {

			let newUser = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			mobileNo: req.body.mobileNo,
			password: bcrypt.hashSync(req.body.password,10)
		})

	const { error } = validate.validateUser(req.body); 
	if (error) return res.status(400).send(error.details[0].message);

	return newUser.save()
				  .then(user => res.send(user))
				  .catch(err => res.send(err.message))
}



//login
exports.loginUser = (req,res) => {

	const { error } = validate.validateLogin(req.body); 

	if (error) return res.status(400).send(error.details[0].message);

		 User.findOne({email: req.body.email})
		.then(result => {
		if(result == null)  return res.send('Invalid email');

		const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

		if(!isPasswordCorrect) return res.send('Password is incorrect');

		return res.send({ access: auth.createAccessToken(result)});

	})
}



 //DETAILS

//A C T I V I T Y S O L U T I O N

 exports.getProfile = (req,res) => {

	return User.findById(req.body.id)
			   .then(result => {
	if(!result) return res.send('Invalid userId');
	result.password = "";

	return res.send(result);
 	})
			   .catch(err => res.send(`Error: ${err.message}`));
};






