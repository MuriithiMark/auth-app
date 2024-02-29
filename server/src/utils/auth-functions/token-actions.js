import { JWT } from "node-jsonwebtoken";
import { getUser } from "./user-actions.js";

const SECRET_KEY = "88je88wgq7282hdu828h2effi2";
const jwt = new JWT(SECRET_KEY);

const verifyToken = async (token) => {
    try {
        const data = await jwt.verify(token)
        const user = await getUser(data.id);
        if(!user) throw new Error('no such user')
        return data
    } catch (error) {
        console.error(error);
        throw error
    }
}

const generateToken = async (data) => {
    const token = jwt.sign(data, { expiresIn: 60 * 60 })
    return token;
}


export {
    verifyToken,
    generateToken
}