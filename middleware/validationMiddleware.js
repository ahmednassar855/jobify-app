import { body, param,  validationResult } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customError.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';


const withValidationErrors = ( validationValue ) => {
    return [
        validationValue,
        (req , res , next )=> {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                const errorMessage = errors.array().map( (error) => error.msg );
                if( errorMessage[0].startsWith('no job') ){
                    throw new NotFoundError(errorMessage);
                }
                if( errorMessage[0].startsWith('not authorized') ){
                  throw new UnauthorizedError('not authorized to access this route');
              }
                throw new BadRequestError(errorMessage);
            }
            next();
        }
    ];
}

export const validateJobInput = withValidationErrors([
    body('company').notEmpty().withMessage('company is required'),
    body('position').notEmpty().withMessage('position is required'),
    body('jobLocation').notEmpty().withMessage('job location is required'),
    body('jobStatus')
      .isIn(Object.values(JOB_STATUS))
      .withMessage('invalid status value'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid job type'),
]);

export const validateIdParam = withValidationErrors([
    param('id').custom( async (value , {req}) =>{ 
        const isValidId =   mongoose.Types.ObjectId.isValid(value);
        if( !isValidId ) throw new BadRequestError('invalid MongoDB id');

        const job = await Job.findById(value);
        if (!job) throw new NotFoundError(`no job with id : ${value}`);
    
        const isAdmin =  req.user.role === 'admin'
        const isOwner = req.user.userId === job.createdBy.toString()

        console.log(isAdmin);
        if ( !isAdmin && !isOwner ) {
          throw new UnauthorizedError(`not authorized to access this route`);
        }

      }),
]);

export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required')
      .isEmail().withMessage('invalid email format')
      .custom(async (email) => {
        console.log(email);
        const user = await User.findOne({ email })
        console.log(user);
        if (user) {
          throw new BadRequestError('email already exists');
        }
      }),
    body('password').notEmpty().withMessage('password is required')
      .isLength({ min: 8 }).withMessage('password must be at least 8 characters long'),
    body('location').notEmpty().withMessage('location is required'),
    body('lastName').notEmpty().withMessage('last name is required'),
  ]);


export const validateLoginInput = withValidationErrors([
    body('email').notEmpty().withMessage('email is required')
      .isEmail().withMessage('invalid email format'),
    body('password').notEmpty().withMessage('password is required')
]);

export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('email already exists');
      }
    }),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('location').notEmpty().withMessage('location is required'),
]);