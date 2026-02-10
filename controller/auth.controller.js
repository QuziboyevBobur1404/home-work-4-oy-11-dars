const { v4 } = require("uuid");
const { read_file, write_file } = require("../api/file-system");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// registor

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const users = read_file("register.json");
    const foundedUser = users.find((item) =>  item.email === email);

    if (foundedUser) {
      return res.status(400).json({
        message: "User already exsist",
      });
    }
      const hash = await bcrypt.hash(password, 12);

    const newUser = {
      id: v4(),
      username,
      email,
      password: hash,
      role: "user",
    };
    users.push(newUser);

    write_file("register.json", users);

    res.status(200).json({
      message: "Registered",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  const users = read_file("register.json");
    const foundedUser = users.find((item) => item.email === email);

    if (!foundedUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const decode = await bcrypt.compare(password, foundedUser.password);

    if (decode) {
      const token = jwt.sign(
        { role: foundedUser.role, email: foundedUser.email , id: foundedUser.id},
        process.env.SECRET,
        {
          expiresIn: "1h",
        },
      );
      return res.status(200).json({
        message: "Registered",
        token,
      });
    } else {
      return res.status(200).json({
        message: "Success",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login
};
