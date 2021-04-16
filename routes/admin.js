const express = require("express");
const adminController = require("../controllers/AdminController");

const router = express.Router();

const AdminController = new adminController();

router.get(["/", "/posts"], AdminController.gPosts);

router.get("/posts/add", AdminController.gPostsAdd);
router.post("/posts/add", AdminController.pPostsAdd);

router.get("/posts/edit/:id", AdminController.gPostsEdit);
router.post("/posts/edit", AdminController.pPostsEdit);

router.post("/posts/drop", AdminController.pPostsDrop);

module.exports = router;
