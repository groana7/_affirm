import express from "express";

import { MerchantRepo } from "../../repo/index.js";

const router = express.Router();

/* GET Merchant Configuration */
router.get("/", (req, res, next) => {
  res.send("Init Merchant Config");
});

/* POST Set Merchant Configuration */
router.post("/", async (req, res, next) => {
  const { data } = req.body;
  const minimum_loan_amount = data.minimum_loan_amount_cents;
  const maximum_loan_amount = data.maximum_loan_amount_cents;
  const prequal_enabled = data.prequal_enabled;

  const merchant_conf = await MerchantRepo.get_merchant_configuration(data.merchant_id);
  if (!merchant_conf) {
    res.status(400).send({
      field: "merchant_id",
      message: "Could not find that merchant.",
    });
  }

  if (minimum_loan_amount >= maximum_loan_amount) {
    res.status(400).send({
      field: "minimum_loan_amount",
      message: "Minimum loan amount should be less than the maximum amount.",
    });
  }

  const updatedMerchant = await MerchantRepo.handle_merchant_update(
    data.merchant_id,
    minimum_loan_amount,
    maximum_loan_amount,
    prequal_enabled
  );

  res.status(200).send({
    name: updatedMerchant.name,
    minimum_loan_amount: updatedMerchant.minimum_loan_amount,
    maximum_loan_amount: updatedMerchant.maximum_loan_amount,
    prequalify: prequal_enabled,
  });
});

export default router;