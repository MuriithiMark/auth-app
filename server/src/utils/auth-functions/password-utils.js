import bcrypt from "bcrypt";

// The more the better
const SALT_ROUNDS = 8;

const hashPassword = async (password) => {
    return (
        await bcrypt.hash(password, SALT_ROUNDS)
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