import { Router, type IRouter } from "express";
import healthRouter from "./health";
import vitatrackRouter from "./vitatrack";

const router: IRouter = Router();

router.use(healthRouter);
router.use(vitatrackRouter);

export default router;
