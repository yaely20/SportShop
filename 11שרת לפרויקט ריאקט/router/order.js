const express = require('express');
const router = express.Router();
const controllerOrder = require('../controller/order')


router.get("/", controllerOrder.get);
router.get("/:id", controllerOrder.getById);
router.post("/", controllerOrder.post);
router.delete("/:id",controllerOrder.delete);

module.exports = router;