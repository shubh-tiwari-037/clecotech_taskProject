  import jwt from "jsonwebtoken";
  import User from "../model/userModel.js";

  const verifyJWT = async (req, res, next) => {
    try {
    
    //  const token = req.headers.authorization?.split(" ")[1];
      const token = req.cookies?.accessToken;
       console.log("TOKEN:", token);
      // console.log("HEADERS:", req.headers);
  // console.log("COOKIES:", req.cookies);


      if (!token) {
        return res.status(401).json({
          message: "Unauthorized Request",
        });
      }

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log("DECODED:", decoded);

      const user = await User.findById(decoded.id).select("-password");

      console.log("USER:", user);

      if (!user) {
        return res.status(401).json({
          message: "Invalid Access Token",
        });
      }

      req.user = user;
      console.log("USER:", req.user);

      next();
    } catch (error) {
    console.log("VERIFY JWT ERROR:", error);

    return res.status(401).json({
      message: error.message,
    });
  }
  };

  export default verifyJWT;