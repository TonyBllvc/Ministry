import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import jpic from './routes/jpic.js'
import user from './routes/user.js'
import product from './routes/product.js'
import category from './routes/category.js'
import brand from './routes/brand.js'
import cart from './routes/cart.js'
import order from './routes/order.js'
import featured from './routes/featureProduct.js'
import webhook from './routes/webhook.route.js'
import wishlist from './routes/wishlist.js'
import { notFound, errorHandler } from "./middleware/errorMiddelware.js";
import connectDB from "./config/db.js";
import cors from 'cors'
import methodOverride from 'method-override';
import path from "path";
import { fileURLToPath } from 'url'; // Import fileURLToPath function

dotenv.config()

const port = process.env.PORT || 4242

const app = express()

app.use('/api/webhook', express.raw({
    type: 'application/json'
}), webhook)
// const stripe = new Stripe(STRIPE_SK);

// const corsOptions = {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: [
//         'Content-Type', 'Authorization'
//     ]
// }

// app.use(cors(corsOptions))
// app.use(bodyParser.json());
// app.use('/spiritual', express.static(path.join(__dirname + '/jpic')));

app.use(express.json({
    extended: true, //convert to true later
    limit: '10mb'
}))
app.use(express.urlencoded({
    extended: true, //convert to true later
    limit: '10mb'
}))
// app.use('/backend/assets/', express.static('backend/assets/'))
// app.use(methodOverride('_method'));

app.use(cookieParser())

app.use('/api/jpic', jpic)
// app.use('/api/users', user)
// app.use('/api/products', product)
// app.use('/api/brand', brand)
// app.use('/api/category', category)
// app.use('/api/cart', cart)
// app.use('/api/checkout', order)
// app.use('/api/featured', featured)
// app.use('/api/wishlist', wishlist)
app.get('/', (req, res) => {
    res.status(200)
    res.send('Server started')
})

// app.use(notFound)
// app.use(errorHandler)

const __filename = fileURLToPath(import.meta.url); // Convert import.meta.url to file path
const __dirname = path.dirname(__filename); // Extract directory name

// Serve static files from 'client' directory
app.use('/ministry', express.static(path.join(__dirname, '/client')));

// Serve static files from 'jpic' directory
app.use('/spiritual', express.static(path.join(__dirname, '/jpic')));
// app.use('/spiritual/pages/apostolate', express.static(path.join(__dirname, '/jpic/pages/structure-organisation/table')));


connectDB()
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
    // console.log('You can code now')
})
