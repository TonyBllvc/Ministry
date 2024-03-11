import express from "express";
import { getVisit, newVisit } from "../controller/visitController.js";

const router = express.Router()

router.route('/').get(getVisit).post(newVisit)

export default router