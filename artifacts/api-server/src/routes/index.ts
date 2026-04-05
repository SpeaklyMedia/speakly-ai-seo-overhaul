import { Router, type IRouter } from "express";
import healthRouter from "./health";
import stripeRouter from "./stripe";
import assessRouter from "./assess";

const router: IRouter = Router();

router.use(healthRouter);
router.use(stripeRouter);
router.use(assessRouter);

export default router;
