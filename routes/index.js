const express = require("express");
const indexController = require("../controllers/IndexController");

const router = express.Router();

const IndexController = new indexController();

router.get(["/", "/home"], IndexController.gHome);
router.get("/servicos", IndexController.gServ);
router.get("/quem", IndexController.gQuem);
router.get("/blog", IndexController.gBlog);
router.get("/contatos", IndexController.gCont);
router.get("/post/:id", IndexController.gPostId);

module.exports = router;
