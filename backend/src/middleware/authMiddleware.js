import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid Token" });
        }
        res.status(500).json({ message: err.message });
    }
};

export default authMiddleware;
