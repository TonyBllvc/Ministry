import mongoose from "mongoose"
// import multer from 'multer';
// import { GridFsStorage } from "multer-gridfs-storage"

// const mongouri = 'mongodb://127.0.0.1:27017/images';

// // Create a GridFSStorage instance
// const storage = new GridFsStorage({
//     url: mongouri,
//     file: (req, file) => {
//         return {
//             bucketName: 'images', // Set the bucket name
//         };
//     },
// });

// const upload = multer({ storage });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB Connected ${conn.connection.host}`)
        // await process.on('unhandledRejection', error => {
        //     console.log('unhandledRejection', error.message);
        // });

        // //creating bucket
        // let bucket;
        // mongoose.connection.on("connected", () => {
        //     var db = mongoose.connections[0].db;
        //     bucket = new mongoose.mongo.GridFSBucket(db, {
        //         bucketName: "newBucket"
        //     });
        //     console.log(bucket);
        // });

    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit()
    }
}
export default connectDB



// import mongoose from 'mongoose';
// import gridfs from 'gridfs-stream';

// // Create a GridFS bucket with custom options
// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect('mongodb://localhost/mydb', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });

//         console.log(`MongoDB Connected ${conn.connection.host}`);

//         // Initialize GridFS with the connected mongoose instance
//         gridfs.mongo = mongoose.mongo;
//         const gfs = gridfs(conn.db, mongoose.mongo, {
//             chunkSize: 1024 * 1024, // Set a custom chunk size (1MB in this example)
//             bucketName: 'my_files', // Set a custom bucket name
//         });


//         console.log('success')
//         console.log(gfs)
//         // You can now use the "gfs" object to interact with GridFS

//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//         process.exit();
//     }
// };

// export default connectDB;









// import mongoose from "mongoose"
// import dotenv from 'dotenv'

// dotenv.config()

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect('mongodb://127.0.0.1:27017/',
//             {
//               useNewUrlParser: true,
//               useUnifiedTopology: true
//             })
//         console.log(`MongoDB Connected ${conn.connection.host}`)
//     } catch (error) {
//         console.error(`Error: ${error.message} try and rconnect`)
//         process.exit()
//     }
// }
// export default connectDB