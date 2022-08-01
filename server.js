const express = require('express');
const app = express();
const cors = require('cors')

/* 
let corsOptions = {
    origin: "https://62e7bd8a15b1303e6d8932d4--snazzy-croquembouche-73071b.netlify.app*"
}

app.use(cors(corsOptions))
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.set('port', process.env.PORT || 3200)  

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const db = require("./app/models")
const dbConfig = require("./app/config/db.config");
const Role = db.role;

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
      console.log("Connected To Database 'MongoDB'")
      initial()
  })
  .catch(err => {
      console.log("Cannot connect to the database", err);
      process.exit()
  })

  function initial(){
    Role.estimatedDocumentCount((err, count) => {
      if(!err && count === 0){
  
        new Role({
          name: "user"
        })
        .save(err => {
  
            if(err) {
  
              console.log("error", err);
            }
  
            console.log("added 'user' to roles collection");
  
  
        });
  
        new Role({
  
          name: "moderator"
        })
        .save(err => {
          if(err){
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role ({
          name: "admin"
        })
        .save(err => {
  
          if(err){
            console.log("error", err)
  
          }
  
          console.log("added 'admin' to roles collection");
        })
  
  
        
      }
    })
   }

  require("./app/routes/programs.routes")(app)
  require('./app/routes/auth.routes')(app);
  require('./app/routes/user.routes')(app);

  app.get('/', (req, res) => {
    res.status(200).send("Moderator Content.");
  })

app.listen(app.get('port'), () => {
    console.info(`Server listen on port ${app.get('port')}`);
})