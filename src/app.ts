import * as express from "express"
import { myDataSource } from "./app-data-source"
import { usersRouter } from "./routes/usersRouter"
import { commandesRouter } from "./routes/commandesRouter"
import { menusRouter } from "./routes/menusRouter"
import { restaurantsRouter } from "./routes/restaurantsRouter"

// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

// create and setup express app
const app = express()
app.use(express.json())

// register routes
app.use((req, res, next) => {
    res.setHeader('authorization', '');
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // Pass to next layer of middleware
    next();
});

app.use('/api/users', usersRouter);
app.use('/api/commandes', commandesRouter);
app.use('/api/menus', menusRouter);
app.use('/api/restaurants', restaurantsRouter);

app.use('/*', (req, res) => {
    res.status(404).json({
        status: 'FAIL',
        message: "Ce nom de domaine n'existe pas",
        data: null
    })
});

// start express server
app.listen(3000)