const Course = require('../models/Course');
const auth = require('../auth');
const validate = require('../models/validator');

//Add a course
//ACTIVITY Solution

exports.addCourse = (req,res) => {
	
	const data = auth.decode(req.headers.authorization);

	if (!data.isAdmin) return res.send('Unauthorized user');

	const { error } = validate.validateCourse(req.body); 
	if (error) return res.status(400).send(error.details[0].message);

		let newCourse = new Course({
			name : req.body.name,
			description : req.body.description,
			price : req.body.price
		});

		return newCourse.save().then((course, error) => {

			if (error) return res.send('Error', error);

			 return res.send(`Course added ${course}`);

		})
}


// retrieving all courses
exports.getAllCourses = async(req,res) => {

	const data = auth.decode(req.headers.authorization);

	if(!data.isAdmin) return res.send(`${data.email} is not authorized`);

	Course.find({}).then(result => {
		
	return res.send(result);

	})
}


//retrieval of active courses
exports.getAllActive = (req,res) => {
	Course.find({isActive: true}).then(result => {
		return res.send(result);
	})
}

//retrieval of a specific course

exports.getCourse = (req,res) => {
	Course.findById(req.params.courseId)
		.then(result => {
			if(!result) return res.send('Invalid CourseId');
			return res.send(result);
		})
		.catch(err => res.status(500).send(`Error: ${err.message}`))
}


//updating a course

exports.updateCourse = (req,res) => {
	
	const data = auth.decode(req.headers.authorization);
	if(!data.isAdmin) return res.send('Unauthorized user!');

	Course.findById(req.params.courseId)
		.then((result,err) => {
			if(!result) return res.send('Invalid CourseId')
				result.name = req.body.name
				result.description = req.body.description
				result.price = req.body.price

			return result.save()
				.then((updatedCourse,err) => {
				if(err) return res.send(`Error: ${err}`)
					return res.send(updatedCourse)
				
			})
	})	
		.catch(err => res.status(500).send(`Error: ${err.message}`));
}



//ACTIVITY 3 SOLUTION
//archiving a course

exports.archiveCourse = (req,res) => {
	
	const data = auth.decode(req.headers.authorization);
	

	if(!data.isAdmin) return res.send('Unauthorized user')

	const { error } = validate.validateArchive(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	Course.findById(req.params.courseId)
		.then(result => {

			result.isActive = req.body.isActive

			if(result.isActive) return res.send(false)

			return result.save().then((archivedCourse, err) => {

			if(err) return res.send('Error',err);

			return res.send('Course successfuly archived!');
	
		})
	} )
		.catch(err => res.send(err.message));

}

//add enrollee

exports.enrollCourse = (req,res) => {

const data = auth.decode(req.headers.authorization);
	Course.findById(req.params.courseId)
		.then(result => {

			if(!result) return res.send('Invalid Course')
			if(!result.isActive) return res.send('Course is not offered for the mean time')

			let newEnrollee = {userId: data.id}
			newEnrollee = result.enrollees.push(newEnrollee);

			result.save()
			.then(result => res.send('Congratulations you are now enrolled'))
			.catch(err => res.status(500).send(`Error, ${err}`));
		})
		.catch(err => {
		return res.status(400).send(`Error, ${err}`)});
}




