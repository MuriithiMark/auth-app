
const loginSchema =({
    username: {
        notEmpty: {
            errorMessage: "username cannot be empty"
        },
        isString: {
            errorMessage: "username must be a string"
        },
        isLength: {
            options: {
                min: 4,
                max: 20,
            },
            errorMessage: "username must be between 4 and 20 characters"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "password cannot be empty"
        },
        isString: {
            errorMessage: "password must e a string"
        },
        isLength: {
            options: {
                min: 4,
                max: 12
            },
            errorMessage: "password must be between 4 and 12 characters"
        }
    }

}
)

export default loginSchema