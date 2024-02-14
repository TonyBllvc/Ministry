import express from "express";
import { getContentsForOrg, getContentsForPersonnel } from "../controller/houseAll.js";

const router = express.Router()

router.route('/personnel').get( getContentsForPersonnel)
router.route('/organisation').get( getContentsForOrg)

export default router