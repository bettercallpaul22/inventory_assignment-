
import Joi from "joi";

export const registerSchema = Joi.object({
    firstName:Joi.string().min(3).trim().required(),
    lastName:Joi.string().min(3).trim().required(),
    email:Joi.string().min(3).trim().email().required(),
    password:Joi.string().min(6).trim().required(),
    
  });
export const loginSchema = Joi.object({
    email:Joi.string().min(3).trim().email().required(),
    password:Joi.string().min(6).trim().required(),
    
  });