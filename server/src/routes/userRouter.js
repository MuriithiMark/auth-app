import { Router } from "express";
import { getDB } from "../utils/db/db-methods.js";

const userRouter = Router()

// corresponds to /users
userRouter.get("/", async (req, res) => {
    const db = await getDB()
    res.status(200).send(db.users).end()
})

export default userRouter;