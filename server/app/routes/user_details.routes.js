const { authJwt } = require("../middleware");
const controller = require("../controllers/user_details.controller");

module.exports = app => {
    const userDetails = require("../controllers/user_details.controller.js");

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    
      app.get("/api/test/all", controller.allAccess);

    var router = require("express").Router();

    // Create and save a new User
    router.post("/", userDetails.create);

    // View all Users
    router.get("/", userDetails.findAll);

    // Find single user
    router.get("/:userID", userDetails.findOne);

    // Update single user details
    router.put("/:userID", userDetails.update);

    // Delete single user from system
    router.delete("/:userID", userDetails.delete);

    // Delete all users from system
    router.delete("/", userDetails.deleteAll);

    app.use('/api/users', router);
};