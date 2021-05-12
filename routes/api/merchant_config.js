import express from "express";

import { MerchantRepo } from "../../repo/index.js";

const router = express.Router();

/* GET Merchant Configuration */
router.get("/", (req, res, next) => {
  res.send("Init Merchant Config");
});

export default router;