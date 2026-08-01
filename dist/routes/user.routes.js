"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Protect all user management routes with authenticateJWT middleware
router.use(auth_middleware_1.authenticateJWT);
router.get('/profile', user_controller_1.UserController.getProfile);
router.put('/profile', user_controller_1.UserController.updateProfile);
router.delete('/profile', user_controller_1.UserController.deleteProfile);
exports.default = router;
//# sourceMappingURL=user.routes.js.map