import { checkSchema } from "express-validator";
import loginSchema from "./loginSchema.js";

const registerSchema = ({
    ...loginSchema,
    email: {
        notEmpty: {
            errorMessage: "email cannot be empty"
        },
        isString: {
            errorMessage: "email must be a string"
        },
        isEmail: {
            errorMessage: "email is not valid"
        }
    },
    confirmPassword: {
        notEmpty: {
            errorMessage: "confirm password cannot be empty"
        },
    }
})


export default registerSchema