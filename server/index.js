import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import AuthRouter from "./src/routes/authRouter.js";
import UserRouter from './src/routes/userRouter.js'
import RecruiterRouter from './src/routes/recruiterRouter.js'
import PublicRouter from './src/routes/publicRouter.js'
import morgan from "morgan";
import cloudinary from "./src/config/cloudinary.js"


const app = express();


app.use(
  cors({
    origin: function (origin, callback) {
      const allowed = [
        process.env.CLIENT_URL,
        /\.vercel\.app$/,  // allows ALL vercel preview URLs
      ];

      if (!origin || allowed.some(o => 
        typeof o === "string" ? o === origin : o.test(origin)
      )) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));




app.use("/auth", AuthRouter);
app.use("/user", UserRouter )

app.use("/recruiter", RecruiterRouter);
app.use("/public", PublicRouter);






app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Job Portal API" });
});




app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message });
});






const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
  try {
    const res = await cloudinary.api.ping()
    console.log("Cloudinary API is working: ",res);
  } catch (error) {
    console.error("Error in connecting to Cloudinary API: ", error);
    
  }
});





