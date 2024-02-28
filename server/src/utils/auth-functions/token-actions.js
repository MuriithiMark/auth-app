import { JWT } from "node-jsonwebtoken";

const SECRET_KEY = "88je88wgq7282hdu828h2ei2";
const jwt = new JWT(SECRET_KEY);

const verifyToken = async (token) => {
    try {
        const data = jwt.verify(token)
        return data
    } catch (error) {
        console.error(error);
        throw error
    }
}

const generateToken = async (data) => {
    const token = jwt.sign(data)
    return token;
}


export {
    verifyToken,
    generateToken
}