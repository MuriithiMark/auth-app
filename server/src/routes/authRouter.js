import { Router } from "express";
import { checkSchema, validationResult, matchedData, query } from "express-validator";
import loginSchema from "../utils/validations-schemas/loginSchema.js";
import registerSchema from "../utils/validations-schemas/registerSchema.js";
import { loginUser, registerUser } from "../utils/auth-functions/user-actions.js";
import { verifyToken } from "../utils/auth-functions/token-actions.js";
import {protectedRoute} from "../middle-wares/protectedRoute.js"

const authRouter = Router()

authRouter.post("/login", checkSchema(loginSchema), async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.send(errors).end()
    }
    const data = matchedData(req)
    try {
        const [user, token] = await loginUser(data)
        req.session.auth_token = token
        res.cookie("auth_token", token, { httpOnly: true});
        return res.send({
            status: 'success',
            user
        }).end()
    } catch (error) {
        return res.send({
            status: 'fail',
            message: error.message
        }).end()
    }
})

authRouter.post("/register", checkSchema(registerSchema), async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send({ status: 'fail', ...errors }).end()
    }
    const data = matchedData(req)
    try {
        await registerUser(data)
        return res.status(201).send({
            status: 'success',
            message: 'user registered'
        })
    } catch (error) {
        return res.status(400).send({
            status: 'fail',
            message: error.message
        }).end()
    }
})

authRouter.get("/logout", protectedRoute, (req, res) => {
    res.clearCookie("auth_token")
    res.status(200).send({status: "success"}).end()
})


authRouter.get("/verify-token", async (req, res) => {
    // verify token from body
    const cookies = req.cookies;
    const authToken = cookies["auth_token"];
    if (!authToken) {
        return res.send({ status: "fail", message: "token not provided" }).end()
    }
    try {
        const data = await verifyToken(authToken);
        delete data.hashedPassword;
        req.session.user = data
        return res.send({ status: "success", user: data }).end()
    } catch (error) {
        return res.send({ status: "fail", message: error.message }).end()
    }
})


export default authRouter;