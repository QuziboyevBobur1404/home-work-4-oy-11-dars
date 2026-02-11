const {Router}=require("express")
const { getAllProducts, getOneProduct, updateProduct, deleteProduct, addProduct } = require("../controller/todo.controller")
const autorization = require("../middlware/autorization")

const productRouter=Router()

productRouter.get("/get_all_products",getAllProducts)
productRouter.get("/get_one_product/:id",getOneProduct)
productRouter.post("/add_product",autorization, addProduct)
productRouter.put("/update_product/:id",autorization, updateProduct)
productRouter.delete("/delete_product/:id",autorization, deleteProduct)
productRouter.patch("/toggle_todo/:id",autorization, toggletodo)
productRouter.delete("/remove_checked",autorization, removecheckedtodos)
productRouter.get("/todo_ststistic",autorization, TodoStatistic)


module.exports= productRouter
