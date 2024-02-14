import { Router } from 'express';

const router = Router();

import * as authControllers from '../controllers/auth';

router.get("/login",authControllers.login)

export default router;
