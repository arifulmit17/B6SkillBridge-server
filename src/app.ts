import express from 'express';
import cors from 'cors';
import routes from './routes';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import { tutorRouter } from './modules/tutor/tutor.router';

const app=express();

app.use(cors({
    origin: process.env.APP_URL || 'http://localhost:4000',
    credentials: true,
}));
app.use(express.json());

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use("/api/tutor",tutorRouter)

app.get("/", (req, res) => {
    res.send("Welcome to the SkillBridge Server!");
});

export default app;