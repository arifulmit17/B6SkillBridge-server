import express from 'express';
import cors from 'cors';
import routes from './routes';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';

const app=express();

app.use(cors());
app.use(express.json());

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use("/api",routes)

app.get("/", (req, res) => {
    res.send("Welcome to the SkillBridge Server!");
});

export default app;