import * as Joi from "joi";

export const validationSchema = Joi.object({
    PORT: Joi.number().required(),
    JWT_TEMP_SECRET: Joi.string().required(),
    JWT_ADMIN_SECRET: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
})