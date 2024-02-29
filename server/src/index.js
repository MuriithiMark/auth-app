import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session"

import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import initDb from "./utils/db/init-db.js";
import { protectedRoute } from "./middle-wares/protectedRoute.js";

const app = express()
const port = 3000;

const corsOptions = {
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"]
}

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Credentials", true);
    next()
})

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: "su8s8w8wwjjw",
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        domain: "http://localhost:5173"
    }
}))
app.use("/auth", authRouter)
app.use("/users", protectedRoute, userRouter)

initDb()
    .then(() =>
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`)
        })
    )