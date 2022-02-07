const Joi = require('joi');


//validate user
module.exports.validateUser = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    mobileNo: Joi.string().required(),
    password: Joi.string().required()
  });

  return schema.validate(user);
}

//validate course
module.exports.validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required()
  });

  return schema.validate(course);
}


//validate user login
module.exports.validateLogin = (login) => {
  const schema = Joi.object({
    email: Joi.string().required().lowercase().email(),
    password: Joi.string().required()
  });

  return schema.validate(login);
}


//validate user login
module.exports.validateArchive = (archive) => {
  const schema = Joi.object({
    isActive: Joi.boolean().required()
  });

  return schema.validate(archive);
}





