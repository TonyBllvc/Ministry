import express from "express";
import { getContentsForOrg, getContentsForPersonnel } from "../controller/houseAll.js";
import { protect } from "../middleware/authentication.js";

const router = express.Router()

router.use(protect)
router.route('/personnel').get( getContentsForPersonnel)
router.route('/organisation').get( getContentsForOrg)

export default router