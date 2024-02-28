import express from "express";
import { verifyToken } from "../utils/auth-functions/token-actions.js";
const app = express()

const protectedRoute = async (req, res, next) => {

    const cookies = req.cookies;
    const authToken = cookies["auth_token"];
    if (!authToken) {
        return res.send({
            status: 'fail',
            message: 'invalid cookies provided'
        })
    }
    try {
        const user = await verifyToken(cookies["auth_token"])
        req.user = user
    } catch (error) {
        res.send({
            status: 'fail',
            message: error.message
        }).end()
    }
    next()
}

export {
    protectedRoute
}