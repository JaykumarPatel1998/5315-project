import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const {token, refreshToken} = req.cookies

    if (!token || !refreshToken) {
        res.redirect('/signup.html')
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.message.includes("jwt expired")) {
                res.redirect('/api/auth/refreshToken')
                return;
            } else {
                res.redirect('/signup.html')
            }
        }
        if (decoded) {
            const decodedPayload = decoded
            req.id = decodedPayload.sub
            next();
        }
        
    });
};
