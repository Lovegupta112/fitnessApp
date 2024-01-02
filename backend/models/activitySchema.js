const Joi=require('joi');


const activitySchema=Joi.object({
    activityName:Joi.string().required(),
    distance:Joi.number().required(),
    time:Joi.number().required(),
    unit:Joi.string().required(),
    userid:Joi.number().required(),
    createdAt:Joi.number().required()
})

const dashboardActivitySchema=Joi.object({
    dashboardStatus:Joi.boolean().required(),
    activityid:Joi.number().required(),
})

module.exports={activitySchema,dashboardActivitySchema};