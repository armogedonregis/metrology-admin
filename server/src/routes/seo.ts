import { authenticate } from "@/middleware/authenticator";
import seoControllers from "@/resources/seo/seo.controllers";
import { Router } from "express";;


const router = Router();

router.get('/seo',  seoControllers.seoGet);

router.put('/seo/:id', authenticate,  seoControllers.updateSeo);

export default router;