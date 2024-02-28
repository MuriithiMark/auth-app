import { Router } from "express";
import { checkSchema, validationResult, matchedData, query } from "express-validator";
import loginSchema from "../utils/validations-schemas/loginSchema.js";
import registerSchema from "../utils/validations-schemas/registerSchema.js";
import { loginUser, registerUser } from "../utils/auth-functions/user-actions.js";
import { verifyToken } from "../utils/auth-functions/token-actions.js";

const authRouter = Router()

authRouter.post("/login", checkSchema(loginSchema), async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.send(errors).end()
    }
    const data = matchedData(req)
    try {
        const [user, token] = await loginUser(data)
        res.cookie("auth_token", token);
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
    console.log(req)
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

authRouter.post("/logout/:userId", (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send(errors).end()
    }

    const data = matchedData(req)
    
    res.status(200).end()
})


authRouter.get("/verify-token", async (req, res) => {
    console.log(req.headers)
    const cookies = req.cookies;
    const authToken = cookies["auth_token"];
    if (!authToken) {
        return res.send({ status: "fail" }).end()
    }
    try {
        const data = await verifyToken(authToken);
        return res.send({ status: "success", user: data }).end()
    } catch (error) {
        return res.send({ status: "fail" }).end()
    }
})


export default authRouter;