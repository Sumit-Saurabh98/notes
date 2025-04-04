import jwt from "jsonwebtoken"
import User from "../models/User.js";

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;

    if (!token) {
      res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
      return; 
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(401).json({
        success: false,
        message: "Unauthorized - invalid token provided",
      });
      return; 
    }

    const user = await User.findById(decoded._id);

    if (!user) {
      res.status(401).json({ message: "Unauthorized - user not found" });
      return;
    }

    req.user = user;
    next();
    } catch (error) {
        return res.status(500).send({ message: "Internal server error" });
    }
};

export default authenticate;