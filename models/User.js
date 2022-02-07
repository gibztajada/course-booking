const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

	firstName : {
		type:String,
		required: [true, "firstname name is required"]
	},
	lastName: {
		type: String,
		required: [true, "lastname is required"]
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true
	},
	password: {
		type: String,
		required: [true, "Password is required"]
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	mobileNo: {
		type: String,
		required: [true, "Mobile no is required"]
	},
	enrollments: [
		{
			courseId: {
				type: String,
				required: [true, "CourseId is required"]
			},
			enrolledOn: {
				type: Date,
				default: new Date()
			},
			status: {
				type:String,
				default: "Enrolled"
			}
		}

	]
})

module.exports = mongoose.model('User', userSchema);


