const Joi=require('joi');


const connectionSchema=Joi.object({
    senderid:Joi.number().required(),
    createdat:Joi.number().required(),
    connectionid:Joi.number().required(),
    acceptedrequest:Joi.boolean().required(),
})

const acceptRequestSchema=Joi.object({
    senderid:Joi.number().required(),
    connectionid:Joi.number().required(),
    acceptedRequest:Joi.boolean().required(),
})
module.exports={connectionSchema,acceptRequestSchema};