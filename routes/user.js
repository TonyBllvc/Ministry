import express from "express";
import {
    authUser,
    registerUser,
    logoutUser,
    profile,
    updateProfile,
    verifyUser,
    changePassword,
    updateRole,
    getAllUsers,
    deleteProfilePicture,
    updateAccess,
    searchUsers,
    validateOTP,
    generateOTP
} from "../controller/userController.js";
import { adminClearance, protect, verified } from "../middleware/authentication.js";
const router = express.Router()

router.post('/', registerUser)
router.post('/logout', logoutUser)
router.post('/generate', generateOTP) // generate aother otp
router.post('/validate', validateOTP) // verify using otp
// router.use()
router.route('/auth').post(verified, authUser)
router.post('/verify', verifyUser) // verify if logged in
router.route('/profile').get(protect, profile).put(protect, updateProfile)
router.route('/profiles').delete(protect, deleteProfilePicture)
router.use(protect)
router.put('/password', changePassword)
router.put('/access', updateAccess)
router.use(adminClearance)
router.get('/users', getAllUsers)
router.post('/search', searchUsers)
router.put('/roles', updateRole)


export default router