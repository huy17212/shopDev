'use strict'

const AccessService = require("../services/access.service")

class AccessController {

    signUp = async(request, response, next) => {
        try{
            console.log("odsjijdsf");
            console.log(`[P]::signUp::`, request.body)
            return response.status(201).json( await AccessService.signUp(request.body))
        }catch(error){
            next(error)
        }
    }

}

module.exports = new AccessController()