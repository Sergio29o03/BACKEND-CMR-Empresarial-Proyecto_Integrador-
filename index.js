import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import ClientsRoute from "./routes/ClientsRoute.js";
import QuotationsRoute from "./routes/QuotationsRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import SequelizeStore from "connect-session-sequelize"



dotenv.config();


(async () => {
    await db.sync({ alter: true });
    console.log("Base de datos sincronizada correctamente");
})();  

  // Comenta la línea anterior después de la primera sincronización para evitar que se realicen cambios no deseados en la base de datos.  

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
app.use(ClientsRoute);
app.use(QuotationsRoute);



//store.sync();


// con este se escucha el puerto que escogimos
app.listen(process.env.APP_PORT, ()=> {
    console.log('servidor en linea... funcionando');
} )


