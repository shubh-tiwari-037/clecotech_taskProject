import jwt from 'jsonwebtoken';
import 'dotenv/config';

const generateaccessAndRefreshToken=(user)=>{
    const accessToken=jwt.sign(
        {
        id:user._id,
        email:user.email,
        role:user.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:"1h"
    });


     const refreshToken=jwt.sign(
        {
        id:user._id,
        email:user.email,
         role:user.role
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:"15d"
    });


    return {accessToken, refreshToken}

}

export default generateaccessAndRefreshToken