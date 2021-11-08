const router = require('express').Router();
const { User } = require('../models');
const { Op } = require('sequelize');

router.post('/register', async (req, res) => {
    
    var {email, password, firstName, lastName} = req.body;

    try {

        const user = await User.create({email: email, password: password, firstName: firstName, lastName: lastName, 
        userType: 'user'});
        console.log(user);
        res.status(200).json({
            message: 'success',
            data: user
        });
        
    } catch(error) {
        console.log(error)
        res.status(400).json({
            message: 'error',
            error
        })
    }
});

router.get('/signOut', function(req, res){
    req.session.destroy(function(){
       console.log("user logged out.")
    });
    res.status(200).json({
        message: 'User is Sign Out.'
    });
 });

router.post('/signIn', async (req, res) => {
    var {email, password} = req.body;

    try {

        var user = await User.findOne( {
            where: {
                email
            }
        });

        console.log("user data", user);

        if(password != user.password) {
            res.status(401).json({
                message: 'Username Password Doesnt Match.'
            });
        } else {
            req.session.isAuth = true;
            console.log(req.session);
            console.log(req.session.id);
            res.status(200).json({
                message: 'Found the user name and password',
                token: req.session.id
            });
            // res.redirect("http://localhost:3000/");
        }
    } catch(error) {
        res.status(401).json({
            message: 'Server Error.',
            error: error
        })
    }
});


module.exports = router;