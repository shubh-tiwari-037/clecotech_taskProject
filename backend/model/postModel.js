import express from "express";
import mongoose from "mongoose";

const postSchema= new mongoose.Schema({
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
like:{
    type:Number,
    default:2
},
viwes:{
    type:Number,
    default:22
},

 user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

}, {timestamps:true})


const Post = mongoose.model("Post", postSchema);

export default Post;
