import  jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) =>{

    try{
        console.log("Headers:", req.headers);
        console.log("Cookies:", req.cookies);
        
        let token = req.cookies?.token;
        
        // If no token in cookies, check Authorization header
        if(!token) {
            const authHeader = req.headers.authorization;
            if(authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }
        
        // Also check for token in Cookie header (for curl requests)
        if(!token && req.headers.cookie) {
            const cookieHeader = req.headers.cookie;
            const tokenMatch = cookieHeader.match(/token=([^;]+)/);
            if(tokenMatch) {
                token = tokenMatch[1];
            }
        }
        
        console.log("Extracted token:", token ? "Token found" : "No token found");
        
        if(!token) {
            return res.status(401).json({message:"No token provided"})
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);

        if(!decoded){
            return res.status(401)
            .json({
                message:"Invalid token",
                success:false
            })            
        }
        req.userId = decoded.userId
        next();

    }
    catch(error){
        console.log("Auth error:", error.message)
        return res.status(401).json({message:"Invalid token"})
    }

}

export default authenticateToken