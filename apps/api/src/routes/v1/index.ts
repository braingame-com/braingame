import { Router } from "express";
import healthRoutes from "./health";
import subscribeRoutes from "./subscribe";

const router = Router();

router.use("/health", healthRoutes);
router.use("/subscribe", subscribeRoutes);

export default router;
