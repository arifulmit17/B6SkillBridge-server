import express from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import { tutorRouter } from './modules/tutor/tutor.router';
import { categoryRouter } from './modules/category/category.router';
import { reviewRouter } from './modules/review/review.router';
import { teachingSessionRouter } from './modules/teachingsession/teachingsession.router';
import { userRouter } from './modules/User/user.router';
import { availabilitySlot } from './modules/availability/availability.route';

const app=express();

const allowedOrigins = [
  process.env.APP_URL ,
  process.env.PROD_APP_URL, // Production frontend URL
].filter(Boolean); // Remove undefined values

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches Vercel preview pattern
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);

app.use(express.json());

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use("/api/tutors",tutorRouter)
app.use("/api/categories",categoryRouter)
app.use("/api/reviews",reviewRouter)
app.use("/api/teachingsessions",teachingSessionRouter)
app.use("/api/users",userRouter)
app.use("/api/slots",availabilitySlot)

app.get("/", (req, res) => {
    res.send("Welcome to the SkillBridge Server!");
});

export default app;