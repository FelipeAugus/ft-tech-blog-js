const express = require("express");
const userController = require("../controllers/UserController");

const router = express.Router();

const UserController = new userController();

router.get("/cadastro", UserController.gCad);
router.post("/cadastro", UserController.pCad);

router.get("/login", UserController.gLogin);
router.post("/login", UserController.pLogin);

router.get("/logout", UserController.gLogout);

module.exports = router;
