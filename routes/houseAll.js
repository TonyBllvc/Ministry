import express from "express";
import { getContentsForOrg, getContentsForPersonnel, getContentsForVists } from "../controller/houseAllController.js";
import { protect } from "../middleware/authentication.js";

const router = express.Router()

router.route('/personnel').get(getContentsForPersonnel)
router.route('/organisation').get(getContentsForOrg)
router.route('/visits').get( getContentsForVists)

export default router