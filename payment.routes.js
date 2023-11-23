const  { Router } = require("express");
const paymentControllers =  require ("./payment.controller.js")

const router = Router();

router.post("/create-order", paymentControllers.createOrder);

router.post("/webhook", paymentControllers.receiveWebhook);

router.get("/success", (req, res) => res.send("Success"));

router.post("/create-order2", paymentControllers.createOrder2);

module.exports = router;
