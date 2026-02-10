const { v4 } = require("uuid")
const ejs = require("ejs")
const { read_file, write_file } = require("../api/file-system")

const getAllProducts = async (req, res) => {
  try {
    const product = read_file("todo.json")

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = read_file("todo.json")

    const foundedtodo = product.find((item) => item.id === id)

    if (!foundedtodo) {
      return res.json({
        message: "Not found"
      })
    }

    res.status(200).json(foundedtodo)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const addProduct = async (req, res) => {
  try {
    const { title, time } = req.body

    const product = read_file("todo.json")
  console.log(req.user);
  
    product.push({
      id: v4(),
      image: "image/one.jpg",
     title,
     time,
     added_by: req.user.id
    })

    write_file("todo.json", product)
    res.status(200).json({
      message: "Added new product"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { ilm, kunlikish, sport } = req.body
    const product = read_file("todo.json")

    const foundedtodo = product.find((item) => item.id === id)

    if (!foundedtodo) {
      return res.json({
        message: "Not found"
      })
    }
  if (foundedtodo.added_by !== req.user.id) {
    return res.json({
        message: "forbidden"
      })
  }
    product.forEach((item, idx) => {
      if (item.id === id) {
        item.ilm = ilm ? ilm : item.ilm
        item.kunlikish = kunlikish ? kunlikish : item.kunlikish
        item.sport = sport ? sport : item.sport
      }
    })

    write_file("todo.json", product)

    res.status(200).json({
      message: "Updated product"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = read_file("todo.json")

    const foundedtodo = product.find((item) => item.id === id)

    if (!foundedtodo) {
      return res.json({ 
        message: "Not found"
      })
    }
  if (foundedtodo.added_by !== req.user.id) {
    return res.json({
        message: "forbidden"
      })
  }
    product.forEach((item, idx) => {
      if (item.id === id) {
        product.splice(idx, 1)
      }
    })

    write_file("todo.json", product)

    res.status(200).json({
      message: "Deleted product"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  getAllProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct
}