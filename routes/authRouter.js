import { Router } from "express";
const router = Router();

import { login , register , logout} from "../controllers/authController.js";
import { validateRegisterInput , validateLoginInput } from "../middleware/validationMiddleware.js";


router.post('/register', validateRegisterInput, register)
router.post('/login',validateLoginInput, login)
router.get('/logout', logout)
    

export default router;

