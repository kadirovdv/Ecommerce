import jwt from "jsonwebtoken"

const generateToken = (id) => {
    return jwt.sign({ id }, "my-secret", {
        expiresIn: "120d"
    })
}

export default generateToken;
