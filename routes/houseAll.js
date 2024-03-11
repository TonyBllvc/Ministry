import express from "express";
import { getContentsForOrg, getContentsForPersonnel, getContentsForVists } from "../controller/houseAllController.js";
import { protect } from "../middleware/authentication.js";

const router = express.Router()

router.route('/personnel').get(getContentsForVists)
router.route('/personnel').get( getContentsForPersonnel)
router.route('/organisation').get( getContentsForOrg)

export default router