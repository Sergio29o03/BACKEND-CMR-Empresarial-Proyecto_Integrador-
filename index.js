import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import SequelizeStore from "connect-session-sequelize"


dotenv.config();



const app = express();

const sessionStore = SequelizeStore(session.Store);

// donde almacenamos nuestra sesion
const store = new sessionStore({
    db: db
})

//llamamos nuestra base de datos 
//(async()=>{
//    await db.sync();
//})();


//sesion secreta de usuario
app.use(session({ 
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized : true,
    store: store,
    cookie: {
        secure: 'auto'
        //seguro que se configurara dependiendo del http
    }
}))

//middleware
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
    //aqui estamos usando el puerto de react para ser el origen de nuestra aplicacion
}));
// para recibir datos en formato json
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);



//store.sync();





// con este se escucha el puerto que escogimos
app.listen(process.env.APP_PORT, ()=> {
    console.log('servidor en linea... funcionando');
} )