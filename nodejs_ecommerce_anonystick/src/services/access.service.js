'use strict'

const bcrypt = require('bcrypt')
const shopModel = require('../models/shop.model')
const crypto = require('crypto')
const KeyTokenService = require("./keyToken.service")
const { createTokenPair } = require('../auth/authUtils')
const { getIntoData } = require('../utils')



const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService{

    static signUp = async ({name, email, password}) => {
        try{
            const holderShop = await shopModel.findOne({email}).lean()
            if(holderShop){
                return {
                    code: 'xxxx',
                    message: 'shop email adready registered!'
                }
            }

            const passwordHash = await bcrypt.hash(password, 10)

            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [RoleShop.SHOP]
            })

            if(newShop){
                //  created privateKey, publicKey
                const { privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                      type: 'pkcs1',
                      format: 'pem',
                    },
                    privateKeyEncoding: {
                      type: 'pkcs1',
                      format: 'pem',
                    }
                })

                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey
                })
                
                if(!publicKeyString){
                    return {
                        code: 'xxxx',
                        message: 'publicKeyString Error'
                    }
                }

                const tokens = await createTokenPair({userId: newShop._id, email}, publicKey, privateKey)

                console.log(`Create Token Successfully::`, tokens)

                return {
                    code: 201,
                    metadata: {
                        shop: getIntoData({fileds: ['_id', 'name', 'email'], object: newShop}),
                        tokens
                    }
                }   
            }
            return {
                code: 200,
                metadata: null
            }

        }catch(error){
            return {
                code: 'xxxyz',
                message: error.message,
                status: 'error'
            }
        }
    }

}

module.exports = AccessService