import cors from "cors"
import 'dotenv/config';
 import connectToDb from "./db/index.js"
import express from 'express';

import cookieParser from "cookie-parser";

const PORT = process.env.PORT ||3000
 const app=express()

 app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// importing stetment
import userRouter from "./routes/userRoute.js";
import bodyParser from "body-parser";

import postRouter from "./routes/postRoute.js";




// api
app.use("/api/v1/users",userRouter)
app.use("/api/v1/posts", postRouter);



// require('dotenv').config();
connectToDb()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`app is listening on ${PORT}`)
    })
})
.catch((error)=>{
console.log(`error is comming while connecting to server`,error)
})

// app.get("/",(req,res)=>{
//     res.send("hello")
// })

export default app