const { v4 } = require("uuid");
const ejs = require("ejs");
const { read_file, write_file } = require("../api/file-system");

const getAllProducts = async (req, res) => {
  try {
    const product = read_file("todo.json");

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = read_file("todo.json");

    const foundedtodo = product.find((item) => item.id === id);

    if (!foundedtodo) {
      return res.json({
        message: "Not found",
      });
    }

    res.status(200).json(foundedtodo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { title, time, isDone } = req.body;

    const product = read_file("todo.json");
    console.log(req.user);

    product.push({
      id: v4(),
      title,
      time,
      isDone: false,
      added_by: req.user.id,
    });

    write_file("todo.json", product);
    res.status(200).json({
      message: "Added new todo",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, time } = req.body;
    const product = read_file("todo.json");

    const foundedtodo = product.find((item) => item.id === id);

    if (!foundedtodo) {
      return res.json({
        message: "Not found",
      });
    }
    if (foundedtodo.added_by !== req.user.id) {
      return res.json({
        message: "forbidden",
      });
    }
    product.forEach((item, idx) => {
      if (item.id === id) {
        item.title = title ? title : item.title;
        item.time = time ? time : item.time;
      }
    });

    write_file("todo.json", product);

    res.status(200).json({
      message: "Updated todo",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = read_file("todo.json");

    const foundedtodo = product.find((item) => item.id === id);

    if (!foundedtodo) {
      return res.json({
        message: "Not found",
      });
    }
    if (foundedtodo.added_by !== req.user.id) {
      return res.json({
        message: "forbidden",
      });
    }
    product.forEach((item, idx) => {
      if (item.id === id) {
        product.splice(idx, 1);
      }
    });

    write_file("todo.json", product);

    res.status(200).json({
      message: "Deleted todo",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const toggletodo = (req, res) => {
  try {
    const { id } = req.params;
    const { isDone } = req.body;

    const fileData = read_file("todo.json");

    const foundedProduct = fileData.find((item) => item.id === id);

    if (!foundedProduct) {
      return res.status(404).json({
        message: "todo not found ",
      });
    }

    fileData.forEach((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
    });
    write_file("todo.json", fileData);
    res.status(201).json({
      messsage: "toggled todo status",
      isDone: !foundedProduct.isDone,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removecheckedtodos = (req, res) => {
  try {
    const { isDone } = req.body;
    const todos = read_file("todo.json");

    const userTodos = todos.filter((todo) => todo.added_by === req.user.id);
    const completedCount = userTodos.filter((todo) => todo.isDone).length;
    if (completedCount === 0) {
      return res.status(400).json({
        message: "no completed todos",
      });
    }
    const filteredTodos = todos.filter(
      (todo) => !(todo.added_by === req.user.id && todo.isDone)
    );
    write_file("todo.json", filteredTodos);

    res.status(200).json({
      message: `${completedCount} ta todo removed`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const TodoStatistic = (req, res) => {
  try {
    const todos = read_file("todo.json");
    const userTodos = todos.filter((todo) => todo.added_by === req.user.id);

    const alltodos = userTodos.length;
    const bajarilgan = userTodos.filter((todo) => todo.isDone).length;
    const pending = alltodos - bajarilgan;

    res.status(200).json({
      alltodos,
      bajarilgan,
      pending,
      message: `jami ${alltodos} shart ${bajarilgan} bajarilgan`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getAllProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  toggletodo,
  removecheckedtodos,
  TodoStatistic,
};
