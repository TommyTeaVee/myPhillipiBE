const programs = require("../controllers/programs.controller.js")
const { authJwt } = require("../middlewares");


module.exports = app => {
    

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
      });
  
    let router = require("express").Router()
    
 router.get('/', (req, res) => {
     res.json({messege: "Welcome to my backend app"});
 })
 
    router.post("/", [authJwt.verifyToken], programs.create)
 
    router.get("/all", [authJwt.verifyToken], programs.findAll)
 
    router.get("/published", programs.findAllPublished)
 
    router.get("/:id", programs.findOne)
 
    router.put("/:id", programs.update)
 
    router.delete("/:id", programs.delete)
 
    router.delete("/", programs.deleteAll)
 
    app.use("/api/programs", router)
 }