import asyncHandler from "express-async-handler"
import mongoose from "mongoose"
import Personnel from "../model/personnelModel.js";
import moment from "moment";
import PersonnelExtra from "../model/personnelExtraModel.js";
import PersonnelTable from "../model/personnelTableModel.js";


// @desc    Fetch Contents
// route    GET /api
//@access   Public
const getContents = asyncHandler(async (req, res) => {

    try {
        let content = await Personnel.find()
        let contentTwo = await PersonnelExtra.find()
        let contentThree = await PersonnelTable.find()

        if (content.length === 0 && contentTwo.length === 0 && contentThree.length === 0) {
            return res.status(404).json({ error: "No content found" });
        }

        res.status(200).json({ data: content, dataTwo: contentTwo, dataThree: contentThree });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})


export {
    getContents
}