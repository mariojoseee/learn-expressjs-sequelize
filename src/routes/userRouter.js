const express = require("express");
const userController = require("../controllers/userController");
const customerController = require("../controllers/customerController");
const postController = require("../controllers/postController");
const middleware = require("../middleware/authorization");

const router = express.Router();

router.get("/users", userController.user);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/getuser/:id", userController.getUser);
// Route menggunakan sequelize
router.post("/register-cst", customerController.register);
router.post("/login-cst", customerController.login);
router.get("/get-me", middleware.verifyToken, customerController.getMe);
router.get("/get-all-users", middleware.verifyToken, middleware.verifyAdmin, customerController.user);
// CRUD post
router.post("/create-post", middleware.verifyToken, postController.createPost);
router.get("/read-post-user", middleware.verifyToken, postController.readPostUser);
router.patch("/update-post/:id", middleware.verifyToken, postController.updatePost);
router.delete("/delete-post/:id", middleware.verifyToken, postController.deletePost);

module.exports = router;
