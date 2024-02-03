import express from "express";
import { 
    authAdmin
 } from "../controller/userController.js";
const router = express.Router()

router.post('/auth', authAdmin)

export default router