import  express from "express";
import {
    registerController,
    loginController,
    testController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController,
} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


const router =  express.Router();

//register
router.post("/register", registerController);

//login
router.post('/login', loginController);

//test the routes
router.get('/test',requireSignIn, isAdmin, testController); 

//protected user-route auth
router.get("/user-auth", requireSignIn,(req, res) => {
    res.status(200).send({ok: true});
});

//protected admin-route auth
router.get("/admin-auth", requireSignIn, isAdmin,(req, res)=>{
    res.status(200).send({ok: true});
});

//update profile
router.put('/profile', requireSignIn, updateProfileController);

//orders
router.get('/orders', requireSignIn, getOrdersController);

// all orders
router.get('/all-orders', requireSignIn,isAdmin, getAllOrdersController);


//orders status update
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController);
export default router;