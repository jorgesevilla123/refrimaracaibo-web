const User = require('../models/user-model')



const { createClient } = require('redis')

let redisClient = createClient()



redisClient.connect().then(() => {
    console.log('Client for handling sessions operations connected')
}).catch(err => { console.log(err) })


let session;



function getSession(req, res) {
    redisClient.get('profile').then(
        profile => {
            let parsedProfile = JSON.parse(profile)
            res.json({parsedProfile})
        }

    ).catch(
        err => {
            console.log('Error getting user', err)
        }
    )
}







function createUser(req, res) {
    let { name, email, password, repeatPassword, contact_phone } = req.body
    console.log(name, email, password, repeatPassword, contact_phone)
    let newUser = {
        name: name,
        email: email,
        contact_phone: contact_phone,
        cart: [],
        shipping_addresses: []
    }

    let passwordsMatch = password === repeatPassword

    if (passwordsMatch) {

        let userData = new User({name: name, email: email, password: password, contact_phone: contact_phone, cart: [], shipping_addresses: []})

        userData.save( (err, result) => {
            if(err){
                console.log('Error saving in database', err)
            }
            else {

                
        let profile_data = JSON.stringify(newUser)

        //saving id to redis

        redisClient.set('userid', req.session.id).then(
            val => {
                console.log('Id saved')
            }
        ).catch(
            err => {
                console.log('Error saving id ', err)
            }
        )

        //Saving profile to redis


        redisClient.set('profile', profile_data).then(
            val => {
                console.log('Profile saved and user saved to db')
            }
        ).catch(
            err => {
                console.log('Error saving id ', err)
            }
        )

        session = req.session

        req.session.profile = newUser

        res.json({ profile: req.session.profile, message: 'Usuario creado', created: true })

                
            }
        })

    }
    else {
        res.json({ message: 'Las contraseñas no coinciden', created: false })
    }
}





 function login(req, res){
    let {email, password} = req.body

 

    User.findOne({ email: email}, (err, result) => {
        if(err){
            console.log(err)
        }
        else {
            if(result?.password === password){
                console.log('logged')
                let user = {
                    name: result.name,
                    email: result.email,
                    contact_phone: result.contact_phone,
                    cart: result.cart,
                    shipping_addresses: result.shipping_addresses
                }

                redisClient.set('userid', req.session.id).then(
                    val => {
                        console.log('Id saved')
                    }
                ).catch(
                    err => {
                        console.log('Error saving id ', err)
                    }
                )

                redisClient.set('profile', JSON.stringify(user)).then(
                    val => {
                        if(val === 'OK'){
                            res.json({message: 'Passwords match! user saved to redis cache', login: true, user: user})

                        }
                    }
                ).catch(
                    err => {
                        if(err){
                            console.log('Error saving user to redis cache in login function')
                        }
                    }
                )
            }
            else {
                res.json({message: 'Wrong password, try again', login: false})
            }
        }
    })
 }




 function logout(req, res){

    redisClient


    redisClient.del('userid').then(
        val => {
            console.log('User id was deleted')
        }
    ).catch(
        err => {
            console.log('Error login out')
        }
    )



    redisClient.del('profile').then(
        val => {
            console.log(val)
            res.json({message: 'session deleted', logout: true})
        }
    ).catch(
        err => {
            console.log('Error login out')
        }
    )
 }








function addToCart(req, res){
    
    console.log('login profile')
    let {user, product} = req.body
    console.log(product)



    redisClient.get('profile').then(
        profile => {
            if (profile) {
                console.log('profile ')
                let profile_data = JSON.parse(profile)
                profile_data.cart.push(product)
                console.log(profile_data)
                let parsedProfileData = JSON.stringify(profile_data)
                redisClient.set('profile', parsedProfileData).then(
                    () => {
                        res.json({ message: 'Product added to cart' })
                    }
                ).catch(
                    err => {
                        res.json({ mesage: 'Error adding product to cart' })
                    }
                )
            }
            else {
                res.json({ message: 'There is no user logged' })
            }
        }
    ).catch(
        err => {
            console.log('Redis error in cart function ', err)
        }
    )

    saveCartToDb(user).then(
        result => {
            console.log('Cart saved in db')
        }
    ).catch(

        err => {
            console.log('Error saving products to cart in db', err)
        }
    )


}







function removeFromCart(req, res) {
    let profile = req.body
    console.log(profile)
    let parsedProfile = JSON.stringify(profile)

    redisClient.set('profile', parsedProfile).then(
        status => {
            if(status === 'OK'){
                res.json({message: 'Products set'})
            }
            else {
                res.json({message: 'Error setting removed products'})
            }
            
    

        }
    ).catch( err => {console.log('Error removing products in redis: ', err)})
        saveCartToDb(profile).then(
            result => {
                console.log('Product removed from cart and saved to db')
            }
        ).catch(
            err => {
                console.log('err saving to db')
            }
        )



}





function updateQuantities(req, res) {

    let updatedProfile = req.body
    let updatedParsedProfile = JSON.stringify(updatedProfile)

    
        redisClient.set('profile', updatedParsedProfile).then(
            status => {
                res.json({message: 'cart updated', updated: true})
                
            }
        ).catch(
            err => {
                console.log('Error getting user', err)
            }
        )

       
            saveCartToDb(updatedProfile).then(
                result => {
                    console.log('updated quantities in db')
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )   
}






function sessionChecker(req, res, next) {
    redisClient.get('userid').then(
        products => {
            if (products) {
                console.log('user found')
                res.json({ message: 'User found', logged: true })

            }
            else {
                console.log('user not found')
                res.json({ message: 'No user found', logged: false })
            }
        }

    ).catch(
        err => {
            res.json({ message: 'Error in redis ', err })
            console.log('not found')
        }
    )
    // console.log(`Session Checker: ${req.session.id}`.green);
    // console.log(req.session);
    // if (req.session.profile) {
    //     console.log(`Found User Session`.green);
    //     next();
    // } else {
    //     console.log(`No User Session Found`.red);
    //     res.json({message: 'There is no user motherfucker'});
    // }


}





function productSelection(req, res){
    let updatedCartProducts = req.body


    let updatedCartString = JSON.stringify(updatedCartProducts)

    
        redisClient.set('profile', updatedCartString).then(
            status => {
                res.json({message: 'cart updated', updated: true})
                
            }
        ).catch(
            err => {
                console.log('Error getting user', err)
            }
        )


        saveCartToDb(updatedCartProducts).then(
            result => {
                console.log('Product selected saved to db')

            }
        ).catch(
            err => {
                console.log(err)
            }
        )
}



/* this functions only updates user profile in the redis cache 
it does not handle shipping addresses, it can be used for updating user profile cache



*/

function handleShippingAddresses(req, res){   
    let userProfile = req.body
    console.log(userProfile)
    let profileString = JSON.stringify(userProfile)
    redisClient.set('profile', profileString).then(
        result => {
            if('OK'){
                console.log('order processed')
                res.json('Profile updated succesfully')
            }
            else {
                console.log('error in redis')

            }
        }
    ).catch(
        err => {
            console.log('Error adding shipping address')
        }
    )
}


function sendOrderToProcess(req, res){
    let userProfile = req.body

}

















/// cart helper functions

function saveCartToDb(user){
   return User.updateOne({ name: user.name}, {$set: {cart: user.cart}})
}


module.exports = { getSession, sessionChecker, createUser,
 addToCart, removeFromCart, updateQuantities, 
 productSelection, login, logout, handleShippingAddresses, redisClient }
