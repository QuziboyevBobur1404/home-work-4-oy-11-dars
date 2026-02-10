const updateRole = async (req, res) => {
  try {
    const { id } = req.params
    const { role } = req.body
    const user = read_file("register.json")

    const foundedUser = user.find((item) => item.id === id)

    if (!foundedUser) {
      return res.json({
        message: "Not found"
      })
    }
  
    user.forEach((item, idx) => {
      if (item.id === id) {
        item.role = role ? role : item.role
       
      }
    })

    write_file("register.json", user)

    res.status(200).json({
      message: "Updated role"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const product = read_file("register.json")

    const foundedUser = product.find((item) => item.id === id)

    if (!foundedUser) {
      return res.json({ 
        message: "Not found"
      })
    }
  if (foundedUser.added_by !== req.user.id) {
    return res.json({
        message: "forbidden"
      })
  }
    user.forEach((item, idx) => {
      if (item.id === id) {
        user.splice(idx, 1)
      }
    })

    write_file("register.json", user)

    res.status(200).json({
      message: "Deleted user"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  updateRole,
  deleteUser
}

