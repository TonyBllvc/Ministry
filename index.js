import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import jpic from './routes/jpic.js'
import user from './routes/user.js'
import apostolate from './routes/apostolate.js'
import houseAll from './routes/houseAll.js'
import personnel from './routes/personnel.js'
import information from './routes/information.js'
import personnelExtra from './routes/personnelExtra.js'
import personnelTable from './routes/personnelTable.js'
import structureOrg from './routes/structureOrg.js'
import spiritualM from './routes/spiritualM.js'
import structureOrgProvince from './routes/structureOrgProvince.js'
import support from './routes/support.js'
import formation from './routes/formation.js'
import visit from './routes/visit.js'
import image from './routes/imageOne.js'
import structureContent from './routes/structureContent.js'
import { notFound, errorHandler } from "./middleware/errorMiddelware.js";
import connectDB from "./config/db.js";
import cors from 'cors'
import methodOverride from 'method-override';
import path from "path";
import { fileURLToPath } from 'url'; // Import fileURLToPath function
import { protect } from "./middleware/authentication.js";

// dotenv.config()

const port = process.env.PORT || 4242

const app = express()

// app.use('/api/webhook', express.raw({
//     type: 'application/json'
// }), webhook)
// const stripe = new Stripe(STRIPE_SK);

// const corsOptions = {
//     origin: [
// 'https://spiritan-tonybllvc.vercel.app/',
// 'https://spiritan.vercel.app/',
// ],
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: [
//         'Content-Type', 'Authorization'
//     ]
// }

app.use(cors())
// app.use(bodyParser.json());
// app.use('/spiritual', express.static(path.join(__dirname + '/jpic')));

app.use(express.json())
app.use(express.urlencoded({
    extended: true, //convert to true later
    limit: '10mb'
}))
// app.use('/backend/assets/', express.static('backend/assets/'))
app.use(methodOverride('_method'));

app.use(cookieParser())

app.use('/api/image', image)
app.use('/api/visit', visit)
app.use('/api/jpic', jpic)
app.use('/api/users', user)
app.use('/api/apostolate', apostolate)
app.use('/api/information', information)
app.use('/api/personnel', personnel)
app.use('/api/personnel_extra', personnelExtra)
app.use('/api/personnel_table', personnelTable)
app.use('/api/formation', formation)
app.use('/api/structure_organisation', structureOrg)
app.use('/api/structure_organisation_province', structureOrgProvince)
app.use('/api/spiritual_ms', spiritualM)
app.use('/api/support', support)
app.use('/api/structure_content', structureContent)

// A special call api for client pages with more than in dataset
app.use('/api/house_all', houseAll)

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
app.use('/spiritual', (req, res, next) => {
    // Check if the requested file needs authentication
    const protectedFiles = ['index.html', 'apostolate-index.html', 'apostolate-content.html', 'formation-index.html', 'formation-content.html', 'information-index.html', 'information-content.html', 'JPIC-index.html', 'JPIC-content.html', 'personal-content-index.html','personal-content-content.html', 'personal-extra-index.html', 'personal-extra-extra.html', 'spiritual-mission-and-spirituality-index.html', 'spiritual-mission-and-spirituality-content.html', 'structure-org-province-index.html', 'structure-org-province.html', 'structure-organisation-index.html', 'structure-organisation-council.html', 'support-groups-index.html', 'support-groups-content.html'];

    if (protectedFiles.includes(path.basename(req.url))) {
        // File needs authentication, call the requireAuth middleware
        protect(req, res, next);
    } else {
        // File does not need authentication, proceed to next middleware
        next();
    }
}, express.static(path.join(__dirname, '/admin')));
// app.use('/spiritual/pages/apostolate', express.static(path.join(__dirname, '/jpic/pages/structure-organisation/table')));


connectDB()
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
    // console.log('You can code now')
})
