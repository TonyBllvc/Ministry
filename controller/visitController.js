import asyncHandler from 'express-async-handler'
import Visit from '../model/visitsModel.js'
import moment from "moment";

const newVisit = asyncHandler(async (req, res) => {

    // let emptyFields = []

    // if (!req.body.name) {
    //     emptyFields.push('No name allocated')
    // }
    // if (!req.body.date) {
    //     emptyFields.push('No date allocated')
    // }
    // if (!req.body.device) {
    //     emptyFields.push('No device allocated')
    // }
    // if (emptyFields.length > 0) {
    //     return res.status(204).json({ error: 'Please fill in all the fields', emptyFields })
    // }

    try {
        const content = new Visit({
            name: req.body.name,
            date: req.body.date,
            device: req.body.device
        })

        var visits = await content.save()

        res.status(201).json({ data: visits, message: "Content created Successfully" })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ error: error.message })
    }
})


const getVisit = asyncHandler(async (req, res) => {

    try {
        let content = await Visit.find()

        // if (content.length === 0 || !content) {
        //     return res.status(404).json({ error: "No content found" });
        // }
        
        // Find the latest update time by comparing createdAt and updatedAt
        let latestUpdateTime = content.reduce((latest, item) => {
            const itemUpdateTime = item.updatedAt > item.createdAt ? item.updatedAt : item.createdAt;
            return itemUpdateTime > latest ? itemUpdateTime : latest;
        }, content[0].createdAt); // Initialize with the first item's createdAt timestamp

        // Format the latest update time as desired (e.g., using Moment.js)    
        // Format the latest update time as how long ago it was edited using Moment.js
        latestUpdateTime = moment(latestUpdateTime).fromNow(); // Example format: "a few seconds ago", "2 days ago", etc.

        res.status(200).json({ data: content, latestUpdateTime });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }


})

export {
    newVisit,
    getVisit
}