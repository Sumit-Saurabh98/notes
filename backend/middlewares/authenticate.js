
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Get the token from cookies

        console.log(token, "token")

        if (!token) {
            return res.status(401).send("Please login");
        }

        const decoded = jwt.verify(token, "mysecretkey");
        console.log(decoded, "decoded value")
        req.userID = decoded.userID; // Attach userID to the request
        next();
    } catch (error) {
        return res.status(500).send({ message: "Internal server error" });
    }
};

module.exports = { authenticate };