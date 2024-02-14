


import { Router } from 'express';

const router = Router();

import * as userController from '../controllers/user';
//import * as userControllers from '../controllers/user';


router.post("/signUp",userController.signUp);
router.post("/login",userController.login);
export default router;
