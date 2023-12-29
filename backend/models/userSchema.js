const Joi=require('joi');

const signupSchema=Joi.object({
    name:Joi.string().required(),
    // email:Joi.string().regex( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required(),
    email:Joi.string().email().required(),

    // phone:Joi.string().regex( /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/).required(),
    phone:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    password:Joi.string().required()
})

const loginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
})

const userUpdationSchema=Joi.object({
    userid:Joi.number().required(),
    username:Joi.string().required(),
    email:Joi.string().email().required(),
    phone:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    gender:Joi.string().valid('male','female','other').required(),
    bloodgroup:Joi.string().min(1).max(3).required(),
    adharcard:Joi.string().length(12).required(),
    age:Joi.number().min(5).required(),
    weight:Joi.number().min(10).required()
})

module.exports={signupSchema,loginSchema,userUpdationSchema};