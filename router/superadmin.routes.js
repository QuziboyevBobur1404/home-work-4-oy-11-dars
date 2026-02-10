const { Router } = require("express");
const { updateRole, deleteUser } = require("../controller/superadmin.controller");
const superadminMiddleware = require("../middlware/superadmin.middleware");

const superadminRouter = Router();
superadminRouter.put("/update_role/:id", superadminMiddleware, updateRole);
superadminRouter.delete("/delete/:id", superadminMiddleware, deleteUser);

module.exports = superadminRouter;
