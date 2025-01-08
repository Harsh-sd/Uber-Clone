const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const Auth = async (req, res, next) => {
  try {
    //if we use token then there is no need to provide authorization in header
    const token = req.cookies.token || req.headers.authorization;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Token not found", success: false });
    }

    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // Attach the decoded data to the req object
    req.id = decodedToken.userId;

    next();
  } catch (error) {
    console.log("Internal server error:", error.message);
    res.status(500).json({
      message: "An error occurred while verifying the token",
      success: false,
    });
  }
};
module.exports = Auth;