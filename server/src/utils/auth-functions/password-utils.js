import bcrypt from "bcrypt";

// The more the better
const SALT_ROUNDS = 8;
const SALT = await bcrypt.genSalt(SALT_ROUNDS)

const hashPassword = async (password) => {
    return (
        await bcrypt.hash(password, SALT)
    )
}

const comparePassword = async (password, hashedPassword) => {
    return (
        await bcrypt.compare(password, hashedPassword)
    )
}

export {
    hashPassword,
    comparePassword
}