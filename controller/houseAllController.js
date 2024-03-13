import asyncHandler from "express-async-handler"
import mongoose from "mongoose"
import Personnel from "../model/personnelModel.js";
import moment from "moment";
import PersonnelExtra from "../model/personnelExtraModel.js";
import PersonnelTable from "../model/personnelTableModel.js";
import Structure from "../model/structureModel.js";
import StructureProvince from "../model/structureProvinceModel.js";
import UserSession from "../model/userSession.js";


// @desc    Fetch Contents
// route    GET /api
//@access   Public
const getContentsForPersonnel = asyncHandler(async (req, res) => {

    try {
        let content = await Personnel.find()
        let contentTwo = await PersonnelTable.find()
        let contentThree = await PersonnelExtra.find()

        if (content.length === 0 && contentTwo.length === 0 && contentThree.length === 0) {
            return res.status(404).json({ error: "No content found" });
        }

        res.status(200).json({ data: content, dataTwo: contentTwo, dataThree: contentThree });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})


const getContentsForOrg = asyncHandler(async (req, res) => {

    try {
        let content = await Structure.find()
        let contentTwo = await StructureProvince.find()

        if (content.length === 0 && contentTwo.length === 0) {
            return res.status(404).json({ error: "No content found" });
        }

        res.status(200).json({ data: content, dataTwo: contentTwo });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})

const getContentsForVists = asyncHandler(async (req, res) => {

    try {

        let content = await UserSession.find()
        let contentTwo = await Visit.find()

        if (content.length === 0 && contentTwo.length === 0) {
            return res.status(404).json({ error: "No content found" });
        }

        res.status(200).json({ data: content, dataTwo: contentTwo });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})

export {
    getContentsForPersonnel,
    getContentsForOrg,
    getContentsForVists
}