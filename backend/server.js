const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3005;

const vehiculeRouter = require('./routes/vehicule');
const utilisateurRouter =  require('./routes/utilisateur');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth'); 

// Créer le serveur Node.js
app.use(bodyParser.json());
app.use(cors());

//app.use(bodyParser.urlencoded({ extended: true }));

/*const vehicule = require("./vehicule/vehicule");
app.use(vehicule);*/

app.use('/vehicules', vehiculeRouter)
app.use('/utilisateur', utilisateurRouter);
app.use('/admins', adminRouter);
app.use('/login', authRouter); // This should be '/login' for POST requests
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is now listening at port: ${port}`);
});
