const { User } = require("../models");

class SessionController {

    async store(request, response) {

        const { email, password } = request.body;

        const user = await User.findOne( { where: { email } } );

        if(!user) {
            return response.status(401).send({ errorMessage: "User not found" });
        }

        if(!(await user.checkPassword(password))) {
            return response.status(401).send({ errorMessage: "Incorrect password" });
        }

        return response.status(200).json({ 
            user, 
            token: user.generateToken() 
        });

    }

};

module.exports = new SessionController();