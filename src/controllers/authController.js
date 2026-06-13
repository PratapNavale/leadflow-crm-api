const bcrypt = require("bcrypt");
const prisma = require("../prisma/prismaClient");

const register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

   res.status(201).json({
    message: "User registered successfully",
    user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
});

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

module.exports = {
  register
};