const model = require('./scheme-model');
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
  const id = req.params.scheme_id;
  model.findById(id)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(404).json({
        message: `scheme with scheme_id ${id} not found`
      });
    });  
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const schemeName = req.body.scheme_name;
  if(typeof(schemeName) !== 'string' ||
     !schemeName || schemeName === '') {
       res.status(400).json({
         message: 'Invalid scheme_name'
       });
  }
  next();
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const instructions = req.body.instructions;
  const stepNumber   = req.body.step_number;

  if(typeof(instructions) !== 'string'||
     !instructions                    ||
     instructions === ''              ||
     typeof(stepNumber) !== 'number'  ||
     !stepNumber                      ||
     stepNumber < 1) {
      res.status(400).json({
        message: 'invalid step'
      });  
  } else {
    next();
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
