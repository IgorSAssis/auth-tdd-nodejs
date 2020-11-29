const jwt = require("jsonwebtoken");
const { promisify } = require("util")

module.exports = async (request, response, next) => {

    const authorizationHeader = request.headers.authorization;

    if(!authorizationHeader) {

        return response.status(401).send({ errorMessage: "Token not provided" });

    }

    const [, token] = authorizationHeader.split(" ");

    try {

        const tokenDecoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);

        request.userId = tokenDecoded.id;
        return next();

    } catch(error) {

        return response.status(401).send({ errorMessage: "Token invalid" });

    }

}