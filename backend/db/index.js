
import express from 'express';
import mongoose from 'mongoose';
import cors from "cors"
import 'dotenv/config';



 const connectToDb=async()=>{
    const connectionString=process.env.MONGO_URL
    await mongoose.connect(connectionString)
    console.log(`database conected to !!! ${connectionString}`)
 }

 connectToDb()
 .then(()=>console.log("db working"))
 .catch((error)=> console.log("error while connecting", error))

 export default connectToDb