import Jwt from "jsonwebtoken";
const Authorization = async (token, secreatekey) => {
    if (!token) {
        // return "Token Not Matched"
        return false
    }

    const AuthorizationResult = await Jwt.verify(token, secreatekey, async (err, decoded) => {
        if (err) {
            return false
        }
        return true
    })

    return AuthorizationResult
}
export default Authorization;
