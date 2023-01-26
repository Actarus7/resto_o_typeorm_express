import * as express from "express"
import { Request, Response } from "express"
import { Users } from "./entity/User"
import { myDataSource } from "./app-data-source"
import { usersRouter } from "./routes/usersRouter"
import { commandesRouter } from "./routes/commandesRouter"
import { menusRouter } from "./routes/menusRouter"

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
// app.use('/api/restaurants', restaurantsRouter);

app.use('/*', (req, res) => {
    res.status(404).json({
        status: 'FAIL',
        message: "Ce nom de domaine n'existe pas",
        data: null
    })
});



/* app.get("/users", async function (req: Request, res: Response) {
    const users = await myDataSource.getRepository(Users).find()
    res.json(users)
})

app.get("/users/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Users).findOneBy({
        id: parseInt(req.params.id),
    })
    return res.send(results)
})

app.post("/users", async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(Users).create(req.body)
    const results = await myDataSource.getRepository(Users).save(user)
    return res.send(results)
})

app.put("/users/:id", async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(Users).findOneBy({
        id: parseInt(req.params.id),
    })
    myDataSource.getRepository(Users).merge(user, req.body)
    const results = await myDataSource.getRepository(Users).save(user)
    return res.send(results)
})

app.delete("/users/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(Users).delete(req.params.id)
    return res.send(results)
}) */

// start express server
app.listen(3000)