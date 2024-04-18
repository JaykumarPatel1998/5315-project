import express from 'express';
import dotenv from 'dotenv';
import createHttpError, {isHttpError} from 'http-errors';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import restaurantRouter from './routes/restaurant.routes.js';
import authRouter from './routes/auth.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

dotenv.config()
const app = express();
import { engine } from 'express-handlebars';

app.engine('.hbs', engine({
    extname: '.hbs',
    helpers : {
        formatAddress: function(address) {
          return address.building + ' ' + address.street
        },
    }
    })
)

app.set('view engine', '.hbs');

// add static support
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser())

app.get("/", (req, res) => {
    res.render('index', {
        title : "Welcome page"
    })
})

app.use("/api/auth", authRouter)

app.use("/api/restaurants", restaurantRouter)

//api route to handle endpoint not found
app.use((req, res, next) => {
    next(createHttpError(404, "Enpoint not found! 😥"))
})

app.use((error, req, res, next) => {
    console.error(error)
    let errorMessage = "an error occurred"
    let statusCode = 500
    if (isHttpError(error)) {
        errorMessage = error.message
        statusCode = error.status
    }
    res.status(statusCode).json({
        error : errorMessage,
        status : statusCode
    })
})

export default app;