const jwt = require('jsonwebtoken');
const secret = 'CourseBookingAPI';

//Token Creation

module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};
	return jwt.sign(data, secret, {})
};

module.exports.verify = (req,res,next) => {
	let token = req.headers.authorization

	if(typeof token !== "undefined"){
		console.log(token);
		// result = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmFlN2I4MWE5NzI2ZTAzNDYwZmFmZiIsImVtYWlsIjoiamFuZUBlbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjQzODg1NTkyfQ.9x0fGkmdP_cxX3c2xD730B01144EL34PQjG2MyxQkyw


		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (err, data) => {
			if(err){
				return res.send({auth: "failed"})
			} else {
				next();
			}
		})
	} else {
		return res.send({auth: "failed"})
	}
}


// Token Decryption

module.exports.decode = (token) => {

	if(typeof token !== "undefined"){

		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (err, data) => {

			if(err){

				return null

			} else {

				return jwt.decode(token, {complete: true}).payload
			} 
		})
	} else {
		return null
	}
}
