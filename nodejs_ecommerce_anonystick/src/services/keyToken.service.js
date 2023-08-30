'use strict'

const keytokenModel = require("../models/keyToken.model")

class KeyTokenService {

    static createKeyToken = async({ userId, PublicKey}) => {
        try{

            const publicKeyString = PublicKey.toString()
            const tokens = await keytokenModel.create({
                user:userId,
                publicKey: publicKeyString
            })
            return token ? publicKeyString : null
        }catch(error){
            return error
        }
    }

}

module.exports = KeyTokenService