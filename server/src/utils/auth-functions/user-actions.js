import * as Uuid from "uuid";
import { getDB, updateDB } from "../db/db-methods.js";
import { comparePassword, hashPassword } from "./password-utils.js";
import { generateToken } from "./token-actions.js";

const findUser = async ({ by, value }) => {
    const db = await getDB()
    return db.users.find((user) => user[by] === value)
}

const registerUser = async (userData) => {
    const db = await getDB()
    const existingUser = db.users.find(
        (user) => user.email === userData.email || user.username === userData.username
    )
    if (existingUser) {
        throw new Error(`user already exists`)
    }

    const newUser = {
        id: Uuid.v4(),
        email: userData.email,
        username: userData.username,
        hashedPassword: await hashPassword(userData.password)
    }
    db.users.push(newUser)
    await updateDB(db);
}

const loginUser = async (loginData) => {
    const db = await getDB()
    const user = db.users.find((user) => user.username === loginData.username)
    if (!user) {
        throw new Error(`no such user`)
    }
    // compare passwords
    if(!(await comparePassword(loginData.password, user.hashedPassword))) {
        throw new Error(`incorrect login details`)
    }
    // Generate token
    try {
        const token = await generateToken(user)
        return [user, token];
    } catch (error) {
        throw error;
    }
}

export {
    registerUser,
    loginUser
}