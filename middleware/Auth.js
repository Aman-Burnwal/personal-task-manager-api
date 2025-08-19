import jwt from "jsonwebtoken";

export const isUserAuthorized = async (req, res, next) => {
  next()
}

export const isValidUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'User is not login',
    });
  }

  try {
    
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
     next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User is not authentic."
    })
  }
 
}