const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseControllers')
const auth = require('../auth');


//Add a course
router.post('/', auth.verify, courseController.addCourse);

//retrive all courses
router.get('/all', auth.verify, courseController.getAllCourses);


//retrieval of active courses
router.get('/', courseController.getAllActive);


//retrieval of specific course
router.get('/:courseId', courseController.getCourse);


//update course
router.put('/:courseId', auth.verify, courseController.updateCourse);



//ACTIVITY SOLUTION
//archiving a course

router.put('/:courseId/archive', auth.verify, courseController.archiveCourse);


//add course enrollee

router.post('/:courseId/enroll', auth.verify, courseController.enrollCourse)

module.exports = router;



